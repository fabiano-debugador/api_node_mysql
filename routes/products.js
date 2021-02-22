const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query(
            'SELECT * FROM products',
            (error, result, field) => {
                if(error) { return res.status(500).send({error : error}) }
                const response = {
                    quantity: result.length,
                    products: result.map(prod => {
                        return {
                            id_product: prod.id_product,
                            name: prod.name,
                            price: prod.price,
                            request: {
                                type: 'GET',
                                description: 'Return data of products',
                                url: `http://localhost:3000/products/${prod.id_product}`
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
        conn.query(
            'INSERT INTO products (name, price) VALUES (?,?)',
            [req.body.name, req.body.price],
            (error, result, field) => {
                conn.release()
                if(error) { return res.status(500).send({error : error}) }
                const response = {
                    message: `product successfully inserted`,
                    createdProduct: {
                        id_product: req.body.id_product,
                        name: req.body.name,
                        price: req.body.price,
                        request: {
                            type: 'POST',
                            description: 'Return all products',
                            url: `http://localhost:3000/products`
                        }
                    }
                }
                return res.status(201).send({ response })
            }
        )
    })
})

router.get('/:id_product', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query(
            'SELECT * FROM products WHERE id_product = ?',
            [req.params.id_product],
            (error, result, field) => {
                conn.release()
                if(error) { return res.status(500).send({error : error}) }
                if(result.length == 0) {
                    return res.status(404).send({
                        message: `Product not found`
                    })
                }
                const response = {
                    product: {
                        id_product: result[0].id_product,
                        name: result[0].name,
                        price: result[0].price,
                        request: {
                            type: 'GET',
                            description: 'Return a product',
                            url: `http://localhost:3000/products`
                        }
                    }
                }
                return res.status(200).send({ response })
            }
        )
    })
})

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query(
            `UPDATE products
                SET name         = ?,
                    price        = ?
                WHERE id_product = ?
            `,
            [
                req.body.name, 
                req.body.price, 
                req.body.id_product
            ],
            (error, result, field) => {
                conn.release()
                if(error) { return res.status(500).send({error : error}) }
                const response = {
                    message: `product successfully updated`,
                    updatedProduct: {
                        id_product: req.body.id_product,
                        name: req.body.name,
                        price: req.body.price,
                        request: {
                            type: 'PATCH',
                            description: 'Return a product',
                            url: `http://localhost:3000/products/${req.body.id_product}`
                        }
                    }
                }
                return res.status(202).send({ response })
            }
        )
    })
})

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error : error}) }
        conn.query(
            `DELETE FROM products WHERE id_product = ?`, [req.body.id_product],
            (error, result, field) => {
                conn.release()
                if(error) { return res.status(500).send({error : error}) }
                const response = {
                message: `product successfully deleteded`,
                    request: {
                        type: 'POST',
                        description: 'Delete a product',
                        url: `http://localhost:3000/products`,
                        body: {
                            name: "String",
                            price: "Number"
                        }
                    }
                }
                return res.status(202).send({ response })
            }
        )
    })
})
module.exports = router