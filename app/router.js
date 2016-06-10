// load the todo model
var User = require('./models/user');

// expose the routes to our app with module.exports
module.exports = function(app) {

    // API ---------------------------------------------------------------------
    
    var router = express.Router();  
    // middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });   
    });

    app.use('/api', router);

    // APPLICATION -------------------------------------------------------------
    app.get('/', function(req, res) {
        res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.get('/abc', function(req, res) {
       res.send('aaaaa');
    });
};