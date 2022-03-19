const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.js')

router.get('/', controller.getProduct);
router.get('/:id', controller.getProductById);
router.post('/', controller.createProduct);
router.delete('/:id', controller.deleteProduct);
router.patch('/:id', controller.updateProduct);

module.exports = router;