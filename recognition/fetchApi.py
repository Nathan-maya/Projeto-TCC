import requests
import json

__all__ = ["stuff", "to", "export"]


def buscar_dados():
    missing = []
    request = requests.get(
        'http://192.168.68.115:8080/api/missing/find/recognition')
    data = json.loads(request.content)
    for x in data:
        missing.append(x)
    return missing
buscar_dados()