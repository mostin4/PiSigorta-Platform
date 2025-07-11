import sys, json

data = json.loads(sys.argv[1])
yes = data['results'].get('Evet', 0)
no = data['results'].get('Hayır', 0)
total = yes + no

ratio = yes / total if total > 0 else 0
trend = "Pozitif Eğilim" if ratio > 0.6 else "Kararsız / Negatif"

print(trend)
