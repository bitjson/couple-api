[![npm version](https://img.shields.io/npm/v/couple-api.svg)](https://www.npmjs.com/package/couple-api) [![Build Status](https://img.shields.io/travis/bitjson/couple-api.svg)](https://travis-ci.org/bitjson/couple-api) [![Coverage Status](https://img.shields.io/coveralls/bitjson/couple-api.svg)](https://coveralls.io/r/bitjson/couple-api) [![Dependency Status](https://img.shields.io/david/bitjson/couple-api.svg)](https://david-dm.org/bitjson/couple-api)

Couple API
==========

An unofficial Node client and command-line interface for the Couple App API.

Node API
--------

Before interacting with the Couple API, you'll need to authenticate your client instance.

### Authenticate()

The `authenticate` method retrieves your Couple App `authObject` using your username and password.

The `authObject` contains both your user profile and the profile of your `other`. It also contains your `authToken`, which is needed to authenticate other API calls. The `authToken` seems to expire at least monthly, as well as when the user's password is changed.

```js
var couple = new Couple();
var email = 'email@example.com';
var password = 'hunter2';
couple.authenticate(email, password, function(err, resObj) {
  if(err) return console.error(err);
  console.log('Client `couple` is authenticated:');
  console.log(couple.identify());
});
```

### Identify()

CLI
===
