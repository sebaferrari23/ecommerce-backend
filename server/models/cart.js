const products = require('./products');
const { readFile } = require('../utils/fs');

class Cart {
  constructor() {
    this.cart = [];
  }
  setCart(products) {
    this.cart = products;
  }
  getCart() {
    if(this.cart.length === 0) {
      throw new Error('No hay productos en el carrito');
    }
		return this.cart;
  }
	getProductCart(productCartId) {
    const productCart = this.cart.filter(productCart => productCart.id === productCartId)
    if(productCart.length === 0) {
      throw new Error('Producto no encontrado');
    }
		return productCart;
	}
  addProductCart(productId) {
		const product = products.getProduct(productId);
    if(!product) {
      throw new Error('Producto no encontrado');
    }
    const addProduct = {
      id: this.cart.length + 1,
      timestamp: Date.now(),
      product: product,
    }
		this.cart.push(addProduct);
		return addProduct;
  }
	deleteProductCart(cartId) {
    const product = this.cart.findIndex(({ id }) => id === cartId);
    if(product.length === 0) {
      throw new Error('Producto no encontrado');
    }
    this.cart.splice(product, 1);
		return product;
	}
}
const cart = new Cart();

readFile('./db/cart.txt')
	.then((data) => cart.setCart(JSON.parse(data)))
	.catch((err) => {
		if ((err.code = 'ENOENT')) return;
		console.log(err);
	});

module.exports = cart;