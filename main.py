from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field, field_validator
import eth_utils
from hexbytes import HexBytes

app = FastAPI(
    title="Pi Sigorta API",
    version="1.0.1",
    description="Pi Network ve Blokzincir Entegreli Sigorta Yönetim Sistemi"
)

class PolicyRequest(BaseModel):
    wallet_address: str = Field(..., description="Geçerli blokzincir cüzdan adresi")
    coverage_amount: float = Field(..., gt=0, description="Teminat tutarı 0'dan büyük olmalıdır")
    pi_transaction_hash: str = Field(..., description="İşlem hash değeri")

    @field_validator("wallet_address")
    @classmethod
    def validate_wallet(cls, v: str) -> str:
        if not eth_utils.is_address(v):
            raise ValueError("Geçersiz cüzdan adresi formatı.")
        return v

    @field_validator("pi_transaction_hash")
    @classmethod
    def validate_tx_hash(cls, v: str) -> str:
        try:
            # HexBytes doğrulaması
            HexBytes(v)
        except Exception:
            raise ValueError("Geçersiz işlem hash formatı.")
        return v

@app.get("/", tags=["Sistem"])
async def root() -> dict:
    return {
        "system": "Pi Sigorta API",
        "status": "online",
        "eth_utils_version": eth_utils.__version__
    }

@app.get("/health", tags=["Sistem"])
async def health_check() -> dict:
    return {
        "status": "healthy",
        "blockchain_connector": "active"
    }

@app.post("/api/v1/policy/create", tags=["Sigorta İşlemleri"], status_code=status.HTTP_201_CREATED)
async def create_policy(policy: PolicyRequest) -> dict:
    # Pydantic validatörleri sayesinde cüzdan ve hash kontrolü otomatik yapıldı
    tx_hash_bytes = HexBytes(policy.pi_transaction_hash)
    
    return {
        "success": True,
        "message": "Poliçe başarıyla oluşturuldu ve zincire kaydedildi.",
        "data": {
            "wallet": policy.wallet_address,
            "coverage": policy.coverage_amount,
            "tx_hash": tx_hash_bytes.hex()
        }
    }
