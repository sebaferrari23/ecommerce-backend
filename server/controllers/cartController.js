const cart = require('../models/cart');
const { writeFile } = require('../utils/fs');

const controller = {
  // Get products from cart
  getProductsCart: (req, res) => {
    let response;
    const productCartId = parseFloat(req.params.id)
    if(productCartId) {
      response = cart.getProductCart(productCartId);
    } else {
      response = cart.getCart();
    }
    res.status(200).json(response);
  },

  // Add product to cart
  addProductCart: async (req, res) => {
    try {
      const productId = parseFloat(req.params.id)
      cart.addProductCart(productId);
      const saveProductsCart = JSON.stringify(cart.getCart())
      await writeFile('./db/cart.txt', saveProductsCart);
      res.status(201).json({ notification: 'Producto agregado al carrito' });
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  },
  

  // Delete product from cart
  deleteProductCart: async (req, res) => {
    try {
      const productId = parseFloat(req.params.id)
      cart.deleteProductCart(productId);
      const saveProductsCart = JSON.stringify(cart.getCart())
      await writeFile('./db/cart.txt', saveProductsCart);
      res.status(200).json({ notification: 'Producto eliminado del carrito' });
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  },
}

module.exports = controller;