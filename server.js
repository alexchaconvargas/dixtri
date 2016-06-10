
// BASE SETUP
// =============================================================================

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

// DB SETUP
// =============================================================================
app.set('dbUrl', config.db[app.settings.env]);
mongoose.connect(app.get('dbUrl'));


// MIDDLEWARES SETUP
// =============================================================================
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

// ROUTES SETUP
// =============================================================================
var router = express.Router();
var User     = require('./app/models/user');
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('New Request arrived.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/users')

    // create a bear (accessed at POST http://localhost:3000/api/users)
    .post(function(req, res) {
        var user = new User();      // create a new instance of the User model
        user.name = req.body.name;  // set the users name (comes from the request)

        // save the bear and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
    })

    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

router.route('/users/:user_id')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
    // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.name = req.body.name;  // update the users info

            // save the bear
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        })
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/users/:bear_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

app.use('/api', router);

app.get('/hello-world', function (req, res) {
   res.sendFile( __dirname + "/" + "/public/hello-world.html" );
});

// INITIATING APP
// =============================================================================
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});