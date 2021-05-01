const products = require('../models/products');

const controller = {

  // Get products
  getProducts: async (req, res) => {
    try {
      const allProducts = await products.getAllProducts();
      res.status(200).json(allProducts);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  // Get product by ID
  getProduct: async (req, res) => {
    const productId = parseFloat(req.params.id)
    try {
      const product = await products.getProduct(productId);
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Create product
  createProduct: async (req, res) => {
    try {
      const newProduct = await products.addProduct({
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        thumbnail: req.body.thumbnail,
        price: req.body.price,
        stock: req.body.stock,
      });
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update product by ID
  updateProduct: async (req, res) => {
    const productId = parseFloat(req.params.id)
    const product = req.body;
    try {
      const updatedProduct = await products.updateProduct(productId, product);
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete product by ID
  deleteProduct: async (req, res) => {
    const productId = parseFloat(req.params.id)
    try {
      const product = await products.getProduct(productId);
      await products.deleteProduct(productId);
      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = controller;