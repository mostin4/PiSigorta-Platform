import sys
import json

def calculate_risk(data: dict) -> float:
    # Örnek dinamik risk kuralı: Teminat tutarına göre basit skorlama
    amount = data.get("coverage_amount", 0.0)
    if amount > 10000:
        return 0.8
    elif amount > 1000:
        return 0.5
    return 0.2

if __name__ == "__main__":
    try:
        if len(sys.argv) < 2:
            print(json.dumps({"success": False, "error": "Argüman eksik: JSON veri bekleniyor."}))
            sys.exit(1)

        data = json.loads(sys.argv[1])
        score = calculate_risk(data)
        
        # Üst servisin kolayca parse edebilmesi için JSON formatında çıktı
        print(json.dumps({"success": True, "risk_score": score}))
        
    except json.JSONDecodeError:
        print(json.dumps({"success": False, "error": "Geçersiz JSON formatı."}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)
