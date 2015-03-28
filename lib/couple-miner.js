var request = require('request');


function CoupleMiner(options){
  var options = options || {};

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

CoupleMiner.prototype.authObject = null;

CoupleMiner.prototype.authenticate = function(email, password, callback){
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
        'x-juliet-ver': '1.70'
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

module.exports = CoupleMiner;
