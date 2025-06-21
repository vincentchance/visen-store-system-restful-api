# Transaction API Spec


## Create Transaction --only user

Endpoint : POST /api/users/transactions

Headers: {
	Authorization: bearer token
}

Request body: 
```json
{
  "metode": "tunai",
  "items": [
    {
      "nama": "sunlight",
      "harga": 20000,
      "jumlah": 2
    },
    {
      "nama": "Setrika",
      "harga": 10000,
      "jumlah": 1
    }
  ],
  "catatan": "Customer langganan, bayar lunas"
}
```

Response body Success 201:
```json
{
	
}
```

Response body error:
```json
{
	"errors": "Unauthorized"
}
```
