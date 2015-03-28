var request = require('request');

var JULIET_VER = '1.70' // API version

function Couple(options){
  var options = options || {};

  this.authObject;

  this.authenticate(options.email, options.password, function(err, authObject){
    if(err){
      return console.error(err);
    }

    console.log('Authenticated as: ', authObject.user.userID);
    console.log('Paired with: ', authObject.user.other.userID);

    console.log('base: ', authObject.base);

    console.log('user hash: ', authObject.user.uuid);
    console.log('pair hash: ', authObject.user.pairID);
  });
}

Couple.prototype.authObject = null;

Couple.prototype.authenticate = function(email, password, callback){
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

      return callback(null, responseObject);


    }
  );
}

module.exports = Couple;
