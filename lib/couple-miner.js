var request = require('request');


function CoupleMiner(options){
  var options = options || {};
  var email, password;

  if(typeof options.email !== "undefined"){
    email = options.email;
  }
  if(typeof options.password !== "undefined"){
    password = options.password;
  }

  if(!email || !password){
    return new Error("CoupleMiner requires the email and password of the target account.")
  }

  this.authenticate(email, password, function(err, authObject){
    if(err){
      return err;
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
      try {
        return callback(null, JSON.parse(String(body)));
      }
      catch (err) {
        return callback(err);
      }
    }
  );
}

module.exports = CoupleMiner;
