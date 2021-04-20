const { readFile } = require('../utils/fs');

class Products {
  constructor() {
    this.products = []
  }
	setProducts(products) {
		this.products = products;
	}
	getProducts() {
    if(this.products.length === 0) {
      throw new Error('No hay productos');
    }
		return this.products;
	}
	getProduct(productId) {
    const product = this.products.filter(product => product.id === productId)
    if(product.length === 0) {
      throw new Error('Producto no encontrado');
    }
		return product;
	}
  createProduct(product) {
    if(!product.nombre && !product.descripcion && !product.codigo, 
      !product.foto && !product.precio && !product.stock) {
      throw new Error('Todos los campos son obligatorios');
    }
    const newProduct = {
      id: this.products.length + 1,
      timestamp: Date.now(),
      ...product,
    }
    this.products.push(newProduct);
    return newProduct;
  }
  updateProduct(productId, product) {
    const productToUpdate = this.products.findIndex(({ id }) => id === productId);
    if(!product.nombre && !product.descripcion && !product.codigo, 
      !product.foto && !product.precio && !product.stock) {
      throw new Error('Todos los campos son obligatorios');
    }
		this.products[productToUpdate] = {
			...this.products[productToUpdate],
			...product
		};
		return this.products[productToUpdate];
  }
	deleteProduct(productId) {
    const product = this.products.findIndex(({ id }) => id === productId);
    if(product.length === 0) {
      throw new Error('Producto no encontrado');
    }
    this.products.splice(product, 1);
		return product;
	}
}

const products = new Products();

readFile('./db/products.txt')
	.then((data) => products.setProducts(JSON.parse(data)))
	.catch((err) => {
		if ((err.code = 'ENOENT')) return;
		console.log(err);
	});

module.exports = products;