const generateOrder = () => {
	const timeStamp = Date.now().toString().slice(-6);
	return `order${timeStamp}`;
}

export { generateOrder }