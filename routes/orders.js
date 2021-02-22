const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query(
            `SELECT o.id_order,
                o.quantity,
                p.id_product,
                p.name,
                p.price
            FROM orders AS o
            INNER JOIN products AS p
            ON p.id_product = o.id_product`,
            (error, result, field) => {
                if(error) { return res.status(500).send({error : error}) }
                const response = {
                    orders: result.map(order => {
                        return {
                            id_order: order.id_order,
                            quantity: order.quantity,
                            product: {
                                id_product: order.id_product,
                                name: order.name,
                                price: order.price
                            },
                            request: {
                                type: 'GET',
                                description: 'Return data of order',
                                url: `http://localhost:3000/orders/${order.id_order}`
                            }
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    }) 
})

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query('SELECT * FROM products WHERE id_product = ?',
        [req.body.id_product],
        (error, result, field) => {
            if(error) { return res.status(500).send({error:error}) }
            if(result.length == 0 ) {
                return res.status(404).send({ message: `Product not founded`})
            }

            conn.query(
                'INSERT INTO orders (id_product, quantity) VALUES (?,?)',
                [req.body.id_product, req.body.quantity],
                (error, result, field) => {
                    conn.release()
                    if(error) { return res.status(500).send({error : error}) }
                    const response = {
                        message: `Order successfully inserted`,
                        createdOrder: {
                            id_order: req.body.id_order,
                            id_product: req.body.id_product,
                            quantity: req.body.quantity,
                            request: {
                                type: 'POST',
                                description: 'Return all order',
                                url: `http://localhost:3000/orders`
                            }
                        }
                    }
                    return res.status(201).send({ response })
                }
            )
        })
    })
})

router.get('/:id_order', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query(
            'SELECT * FROM orders WHERE id_order = ?',
            [req.params.id_order],
            (error, result, field) => {
                conn.release()
                if(error) { return res.status(500).send({error : error}) }
                if(result.length == 0) {
                    return res.status(404).send({
                        message: `Product not found`
                    })
                }
                const response = {
                    order: {
                        id_order: result[0].id_order,
                        id_product: result[0].id_product,
                        quantity: result[0].quantity,
                        request: {
                            type: 'GET',
                            description: 'Return a order',
                            url: `http://localhost:3000/orders`
                        }
                    }
                }
                return res.status(200).send({ response })
            }
        )
    })
})

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query(
            `DELETE FROM orders WHERE id_order = ?`, [req.body.id_order],
            (error, result, field) => {
                conn.release()
                if(error) { return res.status(500).send({error : error}) }
                const response = {
                message: `Order successfully deleteded`,
                    request: {
                        type: 'POST',
                        description: 'Delete aa order',
                        url: `http://localhost:3000/orders`,
                        body: {
                            id_product: "Number",
                            quantity: "Number"
                        }
                    }
                }
                return res.status(202).send({ response })
            }
        )
    })
})
module.exports = router