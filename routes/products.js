const express = require('express');
const router = express.Router();

router.post('/api/products', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock
    });
    product.save().then(() => {
        res.status(201).json({product: product});
    })
    .catch((err) => {
        res.status(400).json({err: err});
    });
});

router.get('/api/products/:id', (req, res, next) => {
    Product.findOne({
        _id: req.params.id
    }).then((product) => {
        res.status(200).json({product: product});
    }).catch((err) => {
        res.status(400).json({err: err});
    });
});

router.put('/api/products/:id', (req, res, next) => {
    const product = new Product({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock
    });
    Product.updateOne({_id: req.params.id}, product).then(() => {
        res.status(201).json({message: 'Successfull update'});
    }).catch((err) => {
        res.status(400).json({err: err});
    });
});

router.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({message: 'Deleted!'});
        }
    ).catch((err) => {
            res.status(400).json({err: err});
        }
    );
});

router.get('/api/products', (req, res, next) => {
    Product.find().then((products) => {
        res.status(200).json({products: products});
    }).catch((err) => {
        res.status(400).json({err: err});
    });
});

module.exports = router;