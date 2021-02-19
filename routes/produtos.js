const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem : "usando get dentro da rota de produtos"
    })
})

router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    }
    res.status(201).send({
        mensagem: "Usando post dentro da rota de produtos",
        produtoCriado: produto
    })
})

router.get('/:id_produto', (req, res, next) => {
    res.status(200).send({
        mensagem : "Usando get de um produto exclusivo",
    })
})

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem : "usando Patch dentro da rota de produtos"
    })
})

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem : "usando delete dentro da rota de produtos"
    })
})
module.exports = router