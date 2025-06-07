# Order API Spec

## Search ORDER API

Endpoint: GET /api/users/:id/orders

Headers: 
	- Authorization: token
	
Query params:-id: search by order_id, using like created_at: DateTime, using like: optional: user.username
	
Response Body Success 200:

```json
{
  "data": [
		{
		  "id": "order_123",
		  "total": 88000,
		  "status": "success",
		  "user": {
				"username": "user"
		  },
		  "created_at": "timeStamp here"
		}
	  ],
	  "pagging": {
		"page": 1,
		"total_page": 10,
		"total_item": 0
	  }
}
```

Response Body Error:

```json
{
	"errors" : "unauthorized"
}
``` 

## GET ORDER API

Endpoint: GET /api/users/:id/orders

Headers: 
	- Authorization: token
	
Response Body Success 200:

```json
{
  "data": [
		{
		  "id": "order_123",
		  "total": 88000,
		  "status": "success",
		  "user" : {
				"username": "user"
		  },
		  "created_at": "timeStamp here"
		}
	  ],
	  "pagging": {
		"page": 1,
		"total_page": 1,
		"total_item": 0
	  }
}
```

Response Body Error:
```json
{
	"errors" : "unauthorized"
}
``` 

## GET ORDER DETAIL API

Endpoint: GET /api/users/:id/orders/:orderId/order_detail

Headers: 
	- Authorization: token
	
Response Body Success 200:
```json
{
	data: {
		"id": "order_123",
		"total": 88000,
		"status": "success",
		"user": {
			"username": "user"
		},
		"created_at": "2025-06-07T10:00:00Z",
		"items": [
		{
		   "product_id": "uuid",
		   "product_name": "test1",
		   "quantity": 2,
			"price": 20000
		},
		{
			"product_id": "uuid",
			"product_name": "test2",
			"quantity": 1,
			"price": 48000
		}
	}
  
  ]
}
```

Response Body Error:
```json
{
	"errors" : "unauthorized"
}
``` 

## Create Order Detail --useronly admin is forbidden

Endpoint : POST /api/user/:id/order

Headers: 
	- Authorization: token

Request Body:
```json
{	
	"pembayaran": "tunai"
	"items": [
		"product_name" : "test1",
		 "price" : 12000 ,
		 "quantity" : 4
	],
	[
		"product_name" : "test2",
		 "price" : 10000 ,
		 "quantity" : 4
	],
}
``` 

Response Body Success 200:
```json
{
	data: {
		"id": "order_123",
		"total": 88000,
		"pembayaran": "tunai",
		"user": {
			"username": "user"
		},
		"created_at": "2025-06-07T10:00:00Z",
		"items": [
			{
			   "product_id": "uuid",
			   "product_name": "test1",
			   "quantity": 2,
				"price": 20000
			},
			{
				"product_id": "uuid",
				"product_name": "test2",
				"quantity": 1,
				"price": 48000
			}
		]
	}
}
```

Response Body Error:
```json
{
	"errors" : "unauthorized"
}
``` 
Possible Error Responses

400 Bad Request (invalid data)

401 Unauthorized (invalid token or admin trying to access)

403 Forbidden (valid token but insufficient permissions)

404 Not Found (user not found)

## PATCH Order API --adminOnly

Headers: 
	- Authorization: token

Request Body:
```json
{	
	"pembayaran": "tunai"
	"items": [
		"product_name" : "test3",
		 "price" : 11000 ,
		 "quantity" : 4
	],
	[
		"product_name" : "test2",
		 "price" : 10000 ,
		 "quantity" : 4
	],
}
``` 

Response Body Success 200:
```json
{
	data: {
		"id": "order_123",
		"total": 84000,
		"pembayaran": "tunai",
		"user": {
			"username": "user"
		},
		"created_at": "2025-06-07T10:00:00Z",
		"updated_at": "updated time",
		"confirmed-by": "admin",
		"items": [
			{
			   "product_id": "uuid",
			   "product_name": "test3",
			   "quantity": 4,
				"price": 11000
			},
			{
				"product_id": "uuid",
				"product_name": "test2",
				"quantity": 4,
				"price": 10000
			}
		]
	}
}
```

## PATCH Order API --Soft delete --admin and --user

Endpoint : PATCH /api/orders/:id/delete

Response Body Success 201

```json
{
	"message": "Order soft deleted successfully"
}
```

Response Error

```json
{
	"message": "Order soft deleted successfully"
}
```
