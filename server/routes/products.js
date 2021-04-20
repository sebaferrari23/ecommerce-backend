const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
//const productAccessMiddleware = require('../middlewares/loggedForAdmin');

router.get('/listar/:id?', productsController.getProducts);

router.post('/agregar', productsController.createProduct);

router.put('/actualizar/:id', productsController.updateProduct);

router.delete('/borrar/:id', productsController.deleteProduct);

module.exports = router;