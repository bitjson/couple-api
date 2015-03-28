var request = require('request');

var JULIET_VER = '1.70' // API version

function Couple(options, callback){
  var options = options || {};
  this.authObject;
  this.authenticate(options.email, options.password, function(err, responseObject){
    if(err){
      return callback(err, responseObject);
    }
    callback(null, responseObject);
  });
}

Couple.prototype.identify = function(){
  if(typeof this.authObject === "undefined"){
    return new Error('Must authenticate with Couple.');
  }
  if(typeof this.authObject.user === "undefined" || this.authObject.user.other === "undefined"){
    return new Error('Not properly authenticated with Couple.');
  }

  return {
    userID: authObject.user.userID,
    authToken: authObject.authenticationToken,
    otherID: authObject.user.other.userID,
    apiHost: authObject.base,
    userHash: authObject.user.uuid,
    pairHash: authObject.user.pairID
  }
}

Couple.prototype.authenticate = function(email, password, callback){
  var instance = this;

  if(typeof email === "undefined"){
    return callback(new Error('Email required to authenticate with Couple.'));
  }
  if(typeof password === "undefined"){
    return callback(new Error('Password required to authenticate with Couple.'));
  }

  request(
    {
      uri: 'https://api-ssl.tenthbit.com/authenticate',
      method: 'POST',
      formData: {
        userID: email,
        secretKey: password
      },
      headers: {
        'x-juliet-ver': JULIET_VER
      },
      gzip: true
    }, function (err, httpResponse, body) {
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
        return callback(responseObject.error);
      }

      instance.authObject = responseObject;
      return callback(null, responseObject);

    }
  );
}

module.exports = Couple;
