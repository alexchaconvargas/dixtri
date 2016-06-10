var express = require('express');
var app = express();  							// Create our app with express
var mongoose = require('mongoose');            	// mongoose for mongodb
var port     = process.env.PORT || 3000; 		// set the port
var morgan = require('morgan');             	// log requests to the console (express4)
var bodyParser = require('body-parser');    	// pull information from HTML POST (express4)
var config = require('./config/config');
var fs = require('fs');
var path = require('path');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});