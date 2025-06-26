# Transaction API Spec

## Create Transaction --only user

Endpoint : POST /api/users/transactions

Headers: {
	Authorization: bearer token
}

Request body: 
```json
{
  "items": [
    {
      "product_id": "uuid",
      "amount": 2
    },
    {
      "product_id": "uuid",
      "amount": 1
    }
  ]
}
```

Response body Success 201:
```json
{
	data: {
			"id": "uuid-stamp",
			"transaction_label": "order-1212232",
			"total": 50000,
			"transaction_item" : [
								{
									"product_name": "sunlight",
									"price": 20000,
									"amount": 2,
									"total": 40000
								},
								{
									"product_name": "lifebuoy",
									"price": 10000,
									"amount": 1,
									"total": 10000
								}
							],
			"created_by": "test",
			"created_at": "timestamp"
	}
}
```

Response body error:
```json
{
	"errors": "Unauthorized"
}
```

## GET Transaction  --only user

Endpoint : GET /api/users/transactions

Headers: {
	Authorization: bearer token
}

Response body Success 200:
```json
{
	data: [
		{
			"id": "uuid-stamp",
			"transaction_label": "order-1212232",
			"total": "50000",
			"created_by": "test",
			"created_at": "timestamp"
		},
		{
			"id": "uuid-stamp",
			"transaction_label": "order-121322232",
			"total": "50000",
			"created_by": "test",
			"created_at": "timestamp"
		},
		{
			"id": "uuid-stamp",
			"transaction_label": "order-122123232",
			"total": "50000",
			"created_by": "test",
			"created_at": "timestamp"
		},	
	],
	total: 150000
}
```

Response body error:
```json
{
	"errors": "Unauthorized"
}
```

## GET Transaction Detail

Endpoint : GET /api/users/transactions/:transaction

Headers: {
	Authorization: bearer token
}

Response body Success 200:

```json
{
	data: {
			"id": "uuid-stamp",
			"transaction_label": "order-1212232",
			"total": "50000",
			"transaction_item" : [
								{
									"product_name": "sunlight",
									"price": 20000,
									"amount": 2,
									"total": 40000
								},
								{
									"product_name": "lifebuoy",
									"price": 10000,
									"amount": 1,
									"total": 10000
								}
							],
			"created_by": "test",
	        "created_at": "timestamp"
	}	
	
}
```

Response body error:
```json
{
	"errors": "Unauthorized"
}
```

## PUT Transaction Soft delete

Endpoint : PUT /api/users/transactions/:transaction

Response body Success 200:

```json
{
	data: [
			{
				"id": "uuid-stamp",
				"transaction_label": "order-1212232",
				"total": "50000",
				"created_by": "test",
				"created_at": "timestamp",
				"deleted_at": "timestamp",
				"deleted_by": "user"
			},
			{
				"id": "uuid-stamp",
				"transaction_label": "order-1212232",
				"total": "50000",
				"created_by": "test",
				"created_at": "timestamp"
			},
			{
				"id": "uuid-stamp",
				"transaction_label": "order-1212232",
				"total": "50000",
				"created_by": "test",
				"created_at": "timestamp"
			},	
		],
	total: 100000
}
```