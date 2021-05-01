const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/listar', productsController.getProducts);

router.get('/listar/:id?', productsController.getProduct);

router.post('/agregar', productsController.createProduct);

router.put('/actualizar/:id', productsController.updateProduct);

router.delete('/borrar/:id', productsController.deleteProduct);

module.exports = router;