var express = require('express');
// load the user model

// expose the routes to our app with module.exports
module.exports = function(app) {

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('New Request arrived.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our api!' });   
});

// USERS
// =============================================================================
var User     = require('./models/user');
router.route('/users')
    // create a user (accessed at POST http://localhost:3000/api/users)
    .post(function(req, res) {
        var user = new User();      // create a new instance of the User model
        user.name = req.body.name;
        user.firstSurname = req.body.firstSurname;
        user.secondSurname = req.body.secondSurname;
        user.birthDate = req.body.birthDate;
        user.gender = req.body.gender;
        user.country = req.body.country;
        user.cpCode = req.body.cpCode;
        user.province = req.body.province;
        user.city = req.body.city;
        user.adress = req.body.adress;
        user.email = req.body.email;
        user.city = req.body.city;
        user.mobile = req.body.mobile;
        user.landline = req.body.landline;

        // save the user and check for errors
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

        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.name = req.body.name;  // update the users info

            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        })
    })

    // delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// COMPANY
// =============================================================================


// CANDIDATE
// =============================================================================


// VACANCY
// =============================================================================

app.use('/api', router);


// APPLICATION -------------------------------------------------------------
app.get('/', function(req, res) {
    res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

};