'use strict';

const Mongoose = require('mongoose');

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

Mongoose.connect(process.env.DB_CLOUD_URI, mongooseOptions)
    .then(() => console.log('MongoDB Connected'))
    .catch(error => console.log('MongoDB Error: '+error.message));

const db = Mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

exports.Mongoose = Mongoose;