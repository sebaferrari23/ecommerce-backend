const validators = {
	requiredData: (data = {}, keys = []) => {
		const validProduct = keys.every((key) => Object.keys(data).includes(key));
		return validProduct;
	}, 
	checkFields: (data = {}, keys = []) => {
    const checkKeys = Object.keys(data).filter((el) => keys.includes(el));
		const productToUpdate = {};
		checkKeys.forEach((key) => (productToUpdate[key] = data[key]));
    return productToUpdate;
	}
}

module.exports = validators;
