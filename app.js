const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/thing');
const Product = require('./models/product');

//mongo pw: wIPHTkVFdxaz1YB9
//mongo conn: mongodb+srv://andrewupk:<password>@cluster0.pnlls.mongodb.net/<dbname>?retryWrites=true&w=majority
const app = express();

mongoose.connect('mongodb+srv://andrewupk:wIPHTkVFdxaz1YB9@cluster0.pnlls.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to mongodb');
    })
    .catch((err) => {
        console.log('Connection error');
        console.error(err);
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    thing.save().then(() => {
        res.status(201).json({message: 'Thing saved successfully'});
    })
    .catch((err) => {
        res.status(400).json({err: err});
    });
});

app.post('/api/products', (req, res, next) => {
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

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then((thing) => {
        res.status(200).json(thing);
    }).catch((err) => {
        res.status(400).json({err: err});
    });
});

app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({
        _id: req.params.id
    }).then((product) => {
        res.status(200).json({product: product});
    }).catch((err) => {
        res.status(400).json({err: err});
    });
});

app.put('/api/stuff/:id', (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing).then(() => {
        res.status(201).json({message: 'Successfull update'});
    }).catch((err) => {
        res.status(400).json({err: err});
    });
});

app.put('/api/products/:id', (req, res, next) => {
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

app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({message: 'Deleted!'});
        }
    ).catch((err) => {
            res.status(400).json({err: err});
        }
    );
});

app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({message: 'Deleted!'});
        }
    ).catch((err) => {
            res.status(400).json({err: err});
        }
    );
});

app.use('/api/stuff', (req, res, next) => {
    Thing.find().then((things) => {
        res.status(200).json(things);
    }).catch((err) => {
        res.status(400).json({err: err});
    });
});

app.use('/api/products', (req, res, next) => {
    Product.find().then((products) => {
        res.status(200).json({products: products});
    }).catch((err) => {
        res.status(400).json({err: err});
    });
});

module.exports = app;