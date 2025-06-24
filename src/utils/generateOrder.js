const generateOrder = () => {
	const timeStamp = Date.now();
	return `order-${timeStamp}`;
}

export { generateOrder }