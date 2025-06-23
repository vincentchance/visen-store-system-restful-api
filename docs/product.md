# Product API Spec


## Create Product

Endpoint : POST /api/admin/product

Headers: {
	Authorization: bearer token
}

Request body:
```json 
{
	"product_name": "Sabun Mandi",
	"product_category": "Kebutuhan Rumah",
	"prices": [
		{
			"price": 12000,
			"is_active": true
		}
	]
}
```
Response body Success 201:
```json
{
	"data" : {
		"id": "uuid"
		"product_name": "Sabun mandi",
		"product_category": "Kebutuhan Rumah"
		"prices": [
			{
				"id": "price_uuid"
				"price": 12000,
				"start_date": "2025-06-16", //hari ini
				"is_active": true
			}
		]
	}	
}
```

Response body error:
```json
{
	"errors": "Unauthorized"
}
```
## Create price

Endpoint : POST /api/product/:productId/price

Headers: {
	Authorization: bearer token
}

Business Rules:
- Hanya satu harga yang boleh aktif per produk
- Jika membuat harga baru dengan is_active=true:
  1. Sistem otomatis menonaktifkan harga aktif sebelumnya
  2. Validasi start_date harus >= start_date harga aktif sebelumnya

Request body:
```json 
{
	"price": 10000,
	"is_active" : true
}
```

Response body Success 201:
```json
{
	"data" : {
		"id": "uuid"
		"product_name": "test1",
		"product_category": "user1"
		"prices": [
			{
				"id": "price_uuid"
				"price": 12000,
				"start_date": "2025-06-16",
				"is_active": false //dinonaktifkan otomatis
			},
			{
				"id": "price_uuid"
				"price": 10000,
				"start_date": "2025-06-17",
				"is_active" : true //harga saat ini
			}
		]
	}	
}
```

Response body error:
```json
{
	"errors": "Unauthorized"
}
```

## Soft delete Product

Endpoint : PATCH /api/product/:productId/softdelete

Response Body Success:
```json
{
	"data" : {
		"id": "uuid"
		"product_name": "test1",
		"product_category": "user1"
		"prices": [
			{
				"id": "price_uuid"
				"price": 12000,
				"start_date": "2025-06-16",
				"is_active": false, //dinonaktifkan otomatis
				"deleted_at": "2025-06-18",
				"deleted_by": "admin"
			},
			{
				"id": "price_uuid"
				"price": 10000,
				"start_date": "2025-06-17",
				"is_active" : true, //harga saat ini
				"deleted_at": "2025-06-18",
				"deleted_by": "admin"
			}
		]
		deleted_at: "2025-06-18",
		deleted_by: "admin"
	}	
}
```

Response body error:
```json
{
	"errors": "Unauthorized"
}
```

## GET all Products

Endpoint : GET /api/products

Response Body Success:

```json
{
	"data" : [
		{
			 "id" : "uuid",
			 "product_name" : "test",
			 "product_category" : "test_category",
			 "price" : 12000 (active price)
		},
		{
			 "id" : "uuid",
			 "product_name" : "test1",
			 "product_category" : "test_category",
			 "price" : 12000 (active price)
		}
	],
	"paging" : {
		"page" : 1,	
		"total_item" : 10
		"total_page" : 1,

	}
}
``` 

Response body error:
```json
{
	"errors": "Unauthorized"
}
```