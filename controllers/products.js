var uuid = require('uuid');

const knex = require('knex')({
    client: 'pg',
    debug: true,
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }
});

exports.getProduct = (req, res) => {
    knex.select('*')
        .from('produto')
        .then(produtos => {
            res.status(200).send(produtos);
        })
};

exports.getProductById = (req, res) => {
    knex.select('*')
        .from('produto')
        .where({
            id: req.params.id
        })
        .then(produtos => {
            if(produtos.length) {
                res.status(200).send(produtos[0]);
            }
            else{
                res.status(404).send({ message: 'Produto não encontrado.' });
            }
        })
};

exports.createProduct = (req, res) => {
    knex('produto')
        .insert({ descricao: req.body.descricao, valor: req.body.valor, marca: req.body.marca }, ['id', 'descricao', 'valor', 'marca'])
        .then(result => {
            let novo_produto = result[0];
            res.status(201).send({ message: 'Produto inserido com sucesso.', id: novo_produto.id })
        })
};

exports.deleteProduct = (req, res) => {
    knex('produto')
        .where({
            id: req.params.id
        })
        .del()
        .then(d => {
            if(d) {
                res.status(200).send({ message: 'Produto excluído com sucesso.' });
            }
            else{
                res.status(404).send({ message: 'Produto não encontrado para exclusão.' });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Erro na exclusão.\nMensagem: ' + err.message });
        })
};

exports.updateProduct = (req, res) => {
    knex('produto')
        .where({
            id: req.params.id
        })
        .update({ descricao: req.body.descricao, valor: req.body.valor, marca: req.body.marca }, ['id', 'descricao', 'valor', 'marca'])
        .then(u => {
            let novo_produto = u[0];
            if(u && novo_produto != null) {
                res.status(201).send({ message: 'Produto alterado com sucesso.', id: novo_produto.id })                
            }            
            else{
                res.status(404).send({ message: 'Produto não encontrado para exclusão.' });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Erro na alteração.\nMensagem: ' + err.message });
        })
};