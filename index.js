import express from 'express';
import bodyParser from 'body-parser';

import productsRoutes from './routes/products.js';

//const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/products', productsRoutes);

app.get('/', (req, res) => {
    res.send("Bem-vindo à pagina inicial!");
});

app.listen(port, () => {
    console.info(`Aplicação rodando em http://localhost:${port}`);
});