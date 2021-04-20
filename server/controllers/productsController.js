const products = require('../models/products');
const { writeFile } = require('../utils/fs');

const controller = {

  // Get products
  getProducts: (req, res) => {
    let response;
    const productId = parseFloat(req.params.id)
    if(productId) {
      response = products.getProduct(productId);
    } else {
      response = products.getProducts();
    }
    res.status(200).json(response);
  },

  // Create product
  createProduct: async (req, res) => {
    try {
      const product = req.body;
      products.createProduct(product);
      const saveProducts = JSON.stringify(products.getProducts())
      await writeFile('./db/products.txt', saveProducts);
      res.status(201).json({ notification: 'Producto creado' });
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  },

  // Update product
  updateProduct: async (req, res) => {
    try {
      const productId = parseFloat(req.params.id)
      const product = req.body;
      products.updateProduct(productId, product);
      const saveProducts = JSON.stringify(products.getProducts())
      await writeFile('./db/products.txt', saveProducts);
      res.status(200).json({ notification: 'Producto actualizado' });
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  },

  // Delete product
  deleteProduct: async (req, res) => {
    try {
      const productId = parseFloat(req.params.id)
      products.deleteProduct(productId);
      const saveProducts = JSON.stringify(products.getProducts())
      await writeFile('./db/products.txt', saveProducts);
      res.status(200).json({ notification: 'Producto eliminado' });
    } catch(error) {
      res.status(400).json({error: error.message})
    }
  }
}

module.exports = controller;