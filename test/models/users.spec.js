'use strict';

// import the moongoose helper utilities
var utils = require('../utils');
var should = require('should');
var User = require('../../app/models/user');
describe('Users: models', function () {
  describe('#create()', function () {
    it('should create a new User', function (done) {
      // Create a User object to pass to User.create()
      var u = {
          name: 'Obama'
      };
      User.create(u, function (err, createdUser) {
        // Confirm that an error does not exist
        should.not.exist(err);
        // verify that the returned user is what we expect
        createdUser.name.should.equal('Obama');
        // Call done to tell mocha that we are done with this test
        done();
      });
    });
  });
});