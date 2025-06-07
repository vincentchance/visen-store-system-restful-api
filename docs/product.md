## Products API spec

## Create Product --admin only

Endpoint : POST /api/admin/:id/products

Headers: 
	- Authorization: token
	
Request Body: 
```json
	{
		"product_name" : "test1",
		"price": "12000",
		"quantity": 100
	}
```

Response Success 201:

```json
	{
		"data": {
			"product_id": "uuid"
			"product_name": "12000"
			"quantity": 100
		}
	}
```

Response Error:
```json
	{
		"errors": "Unauthorized"
	}
```

## Update Product --admin only

Endpoint : PUT /api/admin/:id/products/:productId

Headers: 
	- Authorization: token
	
Request Body: 
```json
	{
		"product_name" : "test", //forbidden
		"price": 11000, //optional
		"quantity": 100 //optional
	}
```

Response Success 201:

```json
	{
		"data": {
			"product_id": "uuid"
			"product_name": "12000"
			"price": 11000
			"quantity": 100
		}
	}
```

Response Error:
```json
	{
		"errors": "Unauthorized"
	}
```

## soft delete Product --admin only

Endpoint : PUT /api/admin/:id/products/:productId

Headers: 
	- Authorization: token

Response Body Success 201

```json
{
	"message": "Product soft deleted successfully"
}
```

Response Error

```json
{
	"message": "Order soft deleted successfully"
}
```


## Search product API 

Endpoint : GET /api/admin/:id/products/:productId

Headers: 
	- Authorization: token

Response Body Success 201

```json
{
	data: {
		[
			{
			  "product_id": "uuid",
			  "product_name": "test1",
			  "price": 12000,
			  "quantity": 100
			}
		],
		"pagging": {
		"page": 1,
		"total_page": 1,
		"total_item": 0
	  }
	
	}
}
```

Response Error

```json
{
	"message": "Unauthorized"
}
```


## GET all product

Endpoint : GET /api/products

Headers: 
	- Authorization: token

Response Body Success 201

```json
{
	data: {
		[
			{
			  "product_id": "uuid",
			  "product_name": "test1",
			  "price": 12000,
			  "quantity": 100
			},
			{
			  "product_id": "uuid",
			  "product_name": "test3",
			  "price": 14000,
			  "quantity": 100
			},
		],
		"pagging": {
		"page": 1,
		"total_page": 1,
		"total_item": 0
	  }
	
	}
}
```

Response Error

```json
{
	"message": "Unauthorized"
}
```