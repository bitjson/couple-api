'use strict';

var Couple = require('../');
var assert = require('assert');
var nock = require('nock');

describe('couple-api', function() {

  describe('client', function() {

    it('should have an authenticate method', function() {
      var couple = new Couple();
      assert.equal(typeof couple, 'object');
      assert.equal(typeof couple.authenticate, 'function');
    });

    it('should return the error and response object on authentication failure', function(done) {

      var res = {
        'error': 'Login failed: Invalid Email',
        'details': {
          'error': 'Login failed: Invalid Email',
          'email': true
        }
      };

      var coupleAPI = nock('https://api-ssl.tenthbit.com', {
          reqheaders: {
            'x-juliet-ver': '1.70'
          }
        })
        .post('/authenticate', 'userID=jason%40example.com&secretKey=hunter2')
        .reply(401, res);

      var couple = new Couple();
      couple.authenticate('jason@example.com', 'hunter2', function(err, resObj) {
        assert.deepEqual(err, new Error('Login Failed: Invalid Email'));
        assert.deepEqual(resObj, res);
        coupleAPI.done();
        done();
      });
    });

    // it('should authenticate and return a response object', function(){
    //   //todo
    // });

    it('should have an identify method', function() {
      var couple = new Couple();
      assert.equal(typeof couple, 'object');
      assert.equal(typeof couple.identify, 'function');
    });

  });

});
