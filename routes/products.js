const jwt = require ('jsonwebtoken')
const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.js');
const utilSec = require('../utils/utilSec');

const knex = require('knex')({
    client: 'pg',
    debug: true,
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }
});

router.get('/', utilSec.checkToken, controller.getProduct);
router.get('/:id', utilSec.checkToken, controller.getProductById);
router.post('/', utilSec.checkToken, utilSec.isAdmin, controller.createProduct);
router.delete('/:id', utilSec.checkToken, utilSec.isAdmin, controller.deleteProduct);
router.patch('/:id', utilSec.checkToken, utilSec.isAdmin, controller.updateProduct);

module.exports = router;