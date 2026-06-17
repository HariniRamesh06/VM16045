import requests
from datetime import datetime
import heapq
TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJoYXJpbmlyLmNzZTIzQHZlbHRlY2htdWx0aXRlY2gub3JnIiwiZXhwIjoxNzgxNjc3MzgyLCJpYXQiOjE3ODE2NzY0ODIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2N2U1M2ZkNS0yY2RjLTQ1MWEtOGRiMS1jZWMxYzgxYjk1OTMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJoYXJpbmkgciIsInN1YiI6IjZlZjViZDcxLTZiNGMtNGRkMS1iMWM1LTkyZjM3ZWZhZGRiZiJ9LCJlbWFpbCI6ImhhcmluaXIuY3NlMjNAdmVsdGVjaG11bHRpdGVjaC5vcmciLCJuYW1lIjoiaGFyaW5pIHIiLCJyb2xsTm8iOiJ2bTE2MDQ1IiwiYWNjZXNzQ29kZSI6Imp1RnBodiIsImNsaWVudElEIjoiNmVmNWJkNzEtNmI0Yy00ZGQxLWIxYzUtOTJmMzdlZmFkZGJmIiwiY2xpZW50U2VjcmV0IjoiQXpaRW15U2h1UmtSakhFYyJ9.wTN3zhbNlnvHYuPxvB4CeqvBXBoXuud7tsD2g1QfJbM"

URL = "http://4.224.186.213/evaluation-service/notifications"

TYPE_WEIGHT = {
    "Placement": 3,
    "Result": 2,
    "Event": 1
}

TOP_N = 10
def fetch_notifications():

    headers = {
        "Authorization": f"Bearer {TOKEN}"
    }

    response = requests.get(URL, headers=headers)

    response.raise_for_status()

    return response.json()["notifications"]
def build_priority(notification):

    weight = TYPE_WEIGHT.get(
        notification["Type"],
        0
    )

    timestamp = datetime.strptime(
        notification["Timestamp"],
        "%Y-%m-%d %H:%M:%S"
    )

    return (
        weight,
        timestamp
    )
def get_top_notifications(notifications):

    sorted_notifications = sorted(
        notifications,
        key=lambda n: build_priority(n),
        reverse=True
    )

    return sorted_notifications[:TOP_N]

def main():

    notifications = fetch_notifications()

    top_notifications = get_top_notifications(
        notifications
    )

    print("\nTOP 10 PRIORITY NOTIFICATIONS\n")

    for idx, n in enumerate(top_notifications, 1):

        print(f"{idx}.")
        print("ID:", n["ID"])
        print("Type:", n["Type"])
        print("Message:", n["Message"])
        print("Timestamp:", n["Timestamp"])
        print("-" * 50)


if __name__ == "__main__":
    main()