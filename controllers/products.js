import { v4 as uuidv4 } from 'uuid';

let products =  [];

export const getProduct = (req, res) => {
    res.send(products);
};

export const getProductById = (req, res) => {
    const id = req.params.id;
    const foundUser = products.find((product) => product.id === id);

    res.send(foundUser);
};

export const createProduct = (req, res) => {
    const product = req.body;
    const productWithId = { ... product, id: uuidv4() };

    products.push(productWithId);

    res.send(`Postagem de dados realizada. O produto "${product.descricao}" foi adicionado no banco de dados.`);
};

export const deleteProduct = (req, res) => {
    const id = req.params.id;

    products = products.filter((product) => product.id != id);

    res.send(`O produto de id ${id} foi deletado do banco de dados.`);
};

export const updateProduct = (req, res) => {
    const id = req.params.id;
    const { descricao, valor, marca } = req.body;
    const product = products.find((product) => product.id === id);

    if(descricao){
        product.descricao = descricao;
    }

    if(valor){
        product.valor = valor;
    }

    if(marca){
        product.marca = marca;
    }

    res.send(`O produto de id ${id} foi alterado no banco de dados.`);
};