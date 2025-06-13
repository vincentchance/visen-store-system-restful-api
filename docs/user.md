# User API Spec


## create user Internal --onlyadmin

Endpoint : POST /api/admin/current/user

Request body: 
```json
{	
	"name" : "user1",
	"username" : "user1",
	"password" : "rahasia1",
	"role": "user"
}
```

Response body Success 201:
```json
{
	"data" : {
		"id": "uuid"
		"name": "user1",
		"username": "user1",
		"role": "user"
	}	
}
```

Response body error:
```json
{
	"errors": "Unauthorized"
}
```

Error Cases

403 Forbidden for user

409 Duplicate user

400 Bad Request: Validation failed


## Login API Spec

Endpoint : POST /api/admin/login

Request Body : 
```json
{
	"username": "admin-visen",
	"password": "rahasia"
}
```
 or 
 
```
{
	"username": "user1",
	"password": "rahasia1"
}
```

Response Body Success 200:

```json
{
	"token": "jwt-token"
}
```

Response Body Errors 400:
```json
{
	"errors": "username or password is not found"
}
```

Error Cases

400 Bad request: Validation failed

## Update User API --onlyUser admin is forbidden update data

Endpoint: PATCH /api/users/current

Headers: {
	Authorization: token
}

Request Body :
 
```json
{
	"name" : "Vincent Chance", //optional
	"password" : "new password" //optional
}
```

Response Body Success 201:

```json
{
	"data" : {
		"name" :"Vincent Chance",
		"password": "new password"
	}
}
```

Response Body Error:

```json
{
	"errors": "Unauthorized"
}
```

## Get User API

Endpoint: GET /api/users/current

Headers: {
	Authorization: token
}

Response Body Success 200:

```json
{
	"data" : {
		"username" :"Vincent",
		"name" : "Vincent Chance"
	}
}
```

Response Body Error:

```json
{
	"errors": "Unauthorized"
}
```

## Logout User API

Endpoint: DELETE /api/users/Logout

Headers: {
	Authorization: token
}

Response Body Success:

```json
{
	"data" : "Ok"
}
```

Response body Error:

```json
{
	"errors": "Unauthorized"
}
```
