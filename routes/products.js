import express from 'express';

import { getProduct, getProductById, createProduct, deleteProduct, updateProduct } from '../controllers/products.js';

const router = express.Router();

router.get('/', getProduct);

router.get('/:id', getProductById);

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

router.patch('/:id', updateProduct);

export default router;