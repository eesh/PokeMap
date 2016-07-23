var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://localhost:27017/pokemap');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(3000);