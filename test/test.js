'use strict';

var Couple = require('../');
var assert = require('assert');
var nock = require('nock');
var expect = require('chai').expect;
var fixtures = require('require-dir')('fixtures');

function apiVersion(versionString) {
  return {
    reqheaders: {
      'x-juliet-ver': versionString
    }
  };
}

describe('couple-api', function() {

  describe('authenticate()', function() {

    it('should be a method', function() {
      var couple = new Couple();
      assert.equal(typeof couple, 'object');
      assert.equal(typeof couple.authenticate, 'function');
    });

    it('should return connection errors', function(done) {
      var couple = new Couple();
      couple.authenticate('jason@example.com', 'hunter2', function(err, resObj) {
        expect(err.name).to.equal('NetConnectNotAllowedError');
        done();
      });
    });

    it('should return the error and response object on authentication failure', function(done) {
      var res = fixtures.loginFailedInvalidEmail;
      var coupleAPI = nock('https://api-ssl.tenthbit.com', apiVersion('1.70'))
        .post('/authenticate', 'userID=jason%40example.com&secretKey=hunter2')
        .reply(401, res);

      var couple = new Couple();
      couple.authenticate('jason@example.com', 'hunter2', function(err, resObj) {
        expect(err).to.deep.equal(new Error('Login Failed: Invalid Email'));
        expect(resObj).to.deep.equal(res);
        coupleAPI.done();
        done();
      });
    });

    it('should not break if Couple returns invalid JSON', function(done) {
      var res = 'All your base are belong to us';
      var coupleAPI = nock('https://api-ssl.tenthbit.com', apiVersion('1.70'))
        .post('/authenticate', 'userID=jason%40example.com&secretKey=hunter2')
        .reply(401, res);

      var couple = new Couple();
      couple.authenticate('jason@example.com', 'hunter2', function(err, resObj) {
        expect(err).to.deep.equal(new Error('The Couple API returned invalid JSON'));
        expect(resObj).to.deep.equal({
          invalidJSON: res
        });
        coupleAPI.done();
        done();
      });
    });

    it('should authenticate and return a response object', function(done) {
      var res = fixtures.simAuthObject();
      var coupleAPI = nock('https://api-ssl.tenthbit.com', apiVersion('1.70'))
        .post('/authenticate', 'userID=jason%40example.com&secretKey=hunter2')
        .reply(401, res);

      var couple = new Couple();
      couple.authenticate('jason@example.com', 'hunter2', function(err, resObj) {
        assert.ifError(err);
        expect(resObj).to.deep.equal(res);
        coupleAPI.done();
        done();
      });

    });

  });

  describe('identify()', function() {

    it('should have an identify method', function() {
      var couple = new Couple();
      assert.equal(typeof couple, 'object');
      assert.equal(typeof couple.identify, 'function');
    });

    it('should error when not authenticated', function() {
      var couple = new Couple();
      assert.throws(function() {
          couple.identify();
        },
        /authenticate/
      );
    });

    it('should error when `authObject` has no `user`', function() {
      var couple = new Couple();
      couple.authObject = {};
      assert.throws(function() {
          couple.identify();
        },
        /authenticate/
      );
    });

    it('should error when `authObject` user has no `other`', function() {
      var couple = new Couple();
      couple.authObject = {
        user: {}
      };
      assert.throws(function() {
          couple.identify();
        },
        /authenticate/
      );
    });

    it('should identify the client', function() {
      var couple = new Couple();
      couple.authObject = fixtures.simAuthObject();
      var identifyObject = couple.identify();
      expect(identifyObject).to.deep.equal({
        userID: couple.authObject.user.userID,
        authToken: couple.authObject.authenticationToken,
        otherID: couple.authObject.user.other.userID,
        apiHost: couple.authObject.base,
        userHash: couple.authObject.user.uuid,
        pairHash: couple.authObject.user.pairID
      });
    });

  });

});
