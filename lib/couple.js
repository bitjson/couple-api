'use strict';

var request = require('request');

var JULIET_VER = '1.70'; // API version

exports = module.exports = Couple;

function Couple(options){
  options = options || {};
  this.authObject = {};
}

exports.version = JULIET_VER;

Couple.prototype.identify = function(){
  if(this.authObject === {}){
    return new Error('Must authenticate with Couple.');
  }
  if(typeof this.authObject.user === 'undefined' || this.authObject.user.other === 'undefined'){
    return new Error('Not properly authenticated with Couple.');
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

Couple.prototype.authenticate = function(email, password, callback){
  var instance = this;

  if(typeof email === 'undefined'){
    return callback(new Error('Email required to authenticate with Couple.'));
  }
  if(typeof password === 'undefined'){
    return callback(new Error('Password required to authenticate with Couple.'));
  }

  request(
    {
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
    }, function (err, res, body) {
      if (err) {
        return callback(err);
      }
      var responseObject;
      try {
        responseObject = JSON.parse(String(body));
      }
      catch (err) {
        return callback(new Error('There is a problem with the Couple API: ' + err));
      }

      if(typeof responseObject.error !== 'undefined'){
        return callback(new Error(responseObject.error), responseObject);
      }

      instance.authObject = responseObject;
      return callback(null, responseObject);

    }
  );
};
