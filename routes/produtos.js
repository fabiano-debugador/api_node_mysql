const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query(
            'SELECT * FROM produtos',
            (error, result, field) => {
                if(error) { return res.status(500).send({error : error}) }
                return res.status(200).send({ response : result})
            }
        )
    }) 
})

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release()
                if(error) { return res.status(500).send({error : error}) }
                res.status(201).send({
                    mensagem: "Produto Inserido com sucesso",
                    id_produto: result.insertId
                })
            }
        )
    })
})

router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?',
            [req.params.id_produto],
            (error, result, field) => {
                if(error) { return res.status(500).send({error : error}) }
                return res.status(200).send({ response : result})
            }
        )
    })
})

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query(
            `UPDATE produtos
                SET nome         = ?,
                    preco        = ?
                WHERE id_produto = ?
            `,
            [
                req.body.nome, 
                req.body.preco, 
                req.body.id_produto
            ],
            (error, result, field) => {
                conn.release()
                if(error) { return res.status(500).send({error : error}) }
                res.status(202).send({
                    mensagem: "Produto Alterado com sucesso",
                })
            }
        )
    })
})

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query(
            `DELETE FROM produtos WHERE id_produto = ?`, [req.body.id_produto],
            (error, result, field) => {
                conn.release()
                if(error) { return res.status(500).send({error : error}) }
                res.status(202).send({
                    mensagem: "Produto Deletado com sucesso",
                })
            }
        )
    })
})
module.exports = router