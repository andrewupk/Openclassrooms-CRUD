const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Thing created'
    });
});

app.use('/api/stuff', (req, res, next) => {
    const stuff = [{
        _id: 'fdfsd',
        title: 'First thing',
        description: 'Thing desc',
        imageUrl: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
        price: 4900,
        userId: 'adfhksjf'
    },
    {
        _id: 'vfdcvbgf',
        title: 'Second thing',
        description: 'Second thing desc',
        imageUrl: 'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg',
        price: 2900,
        userId: 'mnbvftyjknb'
    }];
    res.status(200).json(stuff);
});

module.exports = app;