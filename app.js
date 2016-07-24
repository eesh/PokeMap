var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
var app = express();

mongoose.connect('mongodb://localhost:27017/pokemap');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes(app);

app.listen(3000);