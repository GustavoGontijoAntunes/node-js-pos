const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken')
const express = require('express');
const routerSec = express.Router();

const knex = require('knex')({
    client: 'pg',
    debug: true,
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }
});

routerSec.post('/register', (req, res) => {
    let senhaHash = bcrypt.hashSync(req.body.senha, 8)

    knex('usuario')
        .insert({
            nome: req.body.nome,
            login: req.body.login,
            senha: senhaHash,
            email: req.body.email
        }, ['id', 'nome', 'email', 'login', 'roles'])
        .then((result) => {
            let usuario = result[0]
            res.status(200).send({
                "id": usuario.id,
                "nome": usuario.nome,
                "email": usuario.email,
                "login": usuario.login,
                "roles": usuario.roles
            })
            return
        })
        .catch(err => {
            res.status(500).send({ message: 'Erro ao registrar usuario - ' + err.message })
        })
});

routerSec.post('/login', (req, res) => {
    knex
        .select('*')
        .from('usuario')
        .where({ login: req.body.login })
        .then( usuarios => {
            if(usuarios.length){
                let usuario = usuarios[0]

                let checkSenha = bcrypt.compareSync(req.body.senha, usuario.senha)
                if(checkSenha) {
                    var tokenJWT = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
                        expiresIn: 3600
                    })

                    res.status(200).send({
                        id: usuario.id,
                        login: usuario.login,
                        nome: usuario.nome,
                        roles: usuario.roles,
                        token: tokenJWT
                    })
                    return
                }
            }

            res.status(200).send({ message: 'Login ou senha incorretos' })
        })
        .catch(err => {
            res.status(500).send({ message: 'Erro ao verificar login de usuario - ' +  err.message })
        })
});

module.exports = routerSec;