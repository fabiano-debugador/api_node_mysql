const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem : "usando get dentro da rota de pedido"
    })
})

router.post('/', (req, res, next) => {
    const pedido = {
        id_produto : req.body.id_produto,
        quantidade : req.body.quantidade
    }
    res.status(201).send({
        mensagem: "Usando post dentro da rota de pedidos",
        pedidoCriado: pedido
    })
})

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido
    res.status(200).send({
        mensagem : "Usando get de um produto exclusivo",
        id: id
    })
})

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem : "usando Patch dentro da rota de pedidos"
    })
})

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem : "usando delete dentro da rota de pedidos"
    })
})
module.exports = router