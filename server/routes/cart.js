const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/listar/:id?', cartController.getProductsCart);

router.post('/agregar/:id', cartController.addProductCart);

router.delete('/borrar/:id', cartController.deleteProductCart);

module.exports = router;