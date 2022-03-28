require('dotenv').config();

const express = require('express');
const app = express();

const productsRoutes = require('./routes/products.js');
const routerSec = require('./routes/security.js');

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/products', productsRoutes);
app.use('/security', routerSec);

app.get('/', (req, res) => {
    res.send("Bem-vindo à pagina inicial!");
});

app.listen(port, () => {
    console.info(`Aplicação rodando em http://localhost:${port}`);
});