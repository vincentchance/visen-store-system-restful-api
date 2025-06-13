class ResponseError extends Error {
	
	constructor(status, message){
		super(message)
		this.status = status;
	}
}

export { ResponseError }

//throw ResponseError yang akan ditangkap di middleware lalu akan dikonversi jadi 