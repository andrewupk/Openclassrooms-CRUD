const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRouter = require('./routes/user');

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
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRouter);

module.exports = app;