import sys
import json

def analyze_trend(data: dict) -> dict:
    results = data.get('results', {})
    yes = results.get('Evet', 0)
    no = results.get('Hayır', 0)
    total = yes + no

    ratio = yes / total if total > 0 else 0.0
    trend = "Pozitif Eğilim" if ratio > 0.6 else "Kararsız / Negatif"
    
    return {
        "success": True,
        "total_votes": total,
        "yes_votes": yes,
        "no_votes": no,
        "ratio": round(ratio, 4),
        "trend": trend
    }

if __name__ == "__main__":
    try:
        if len(sys.argv) < 2:
            print(json.dumps({"success": False, "error": "Argüman eksik: JSON veri bekleniyor."}))
            sys.exit(1)

        data = json.loads(sys.argv[1])
        result = analyze_trend(data)
        
        # Türkçe karakter desteği ile güvenli JSON çıktısı
        print(json.dumps(result, ensure_ascii=False))
        
    except json.JSONDecodeError:
        print(json.dumps({"success": False, "error": "Geçersiz JSON formatı."}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)
