'use strict';

var request = require('request');

var JULIET_VER = '1.70'; // API version

exports = module.exports = Couple;

function Couple(options) {
  this.options = options || {};
}

exports.version = JULIET_VER;

Couple.prototype.identify = function() {
  if (typeof this.authObject === 'undefined' || typeof this.authObject.user === 'undefined' || typeof this.authObject.user.other === 'undefined') {
    throw new Error('Must authenticated with Couple.');
  }
  return {
    userID: this.authObject.user.userID,
    authToken: this.authObject.authenticationToken,
    otherID: this.authObject.user.other.userID,
    apiHost: this.authObject.base,
    userHash: this.authObject.user.uuid,
    pairHash: this.authObject.user.pairID
  };
};

Couple.prototype.authenticate = function(email, password, callback) {
  var instance = this;

  request({
    uri: 'https://api-ssl.tenthbit.com/authenticate',
    method: 'POST',
    form: {
      userID: email,
      secretKey: password
    },
    headers: {
      'x-juliet-ver': JULIET_VER
    },
    gzip: true
  }, function(err, res, body) {
    if (err) {
      return callback(err);
    }
    var responseObject;
    try {
      responseObject = JSON.parse(String(body));
    } catch (err) {
      return callback(new Error('The Couple API returned invalid JSON'), {
        invalidJSON: body
      });
    }

    if (typeof responseObject.error !== 'undefined') {
      return callback(new Error(responseObject.error), responseObject);
    }

    instance.authObject = responseObject;
    return callback(null, responseObject);

  });
};
