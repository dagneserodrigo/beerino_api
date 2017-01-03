var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var jwt = require('express-jwt');

module.exports = function() {
    var app = express();

    var jwtCheck = jwt({
        secret: new Buffer(process.env.AUTH0_SECRET || 'a3Ab8QrbP2Q-H2jOYKe37aBPFTHnLaqQy9tNbEZMzr91kcCZko5R6NyfI-BHnD8_', 'base64'),
        audience: process.env.AUTH0_CLIENT_ID || 'inpNmw6nzgKVfytyduZ3KckdjZpJFH3R'
    });

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(expressValidator());

    app.use("/beerino/registrar", jwtCheck);

    consign() 
    .include('controllers')
    .then('repository')
    .into(app);

    return app;
}
