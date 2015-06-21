[![npm version](https://img.shields.io/npm/v/couple-api.svg)](https://www.npmjs.com/package/couple-api) [![Build Status](https://img.shields.io/travis/bitjson/couple-api.svg)](https://travis-ci.org/bitjson/couple-api) [![Coverage Status](https://img.shields.io/coveralls/bitjson/couple-api.svg)](https://coveralls.io/r/bitjson/couple-api) [![Dependency Status](https://img.shields.io/david/bitjson/couple-api.svg)](https://david-dm.org/bitjson/couple-api)

Couple API
==========

An unofficial Node client and command-line interface for the Couple App API.

Node Client
-----------

Before interacting with the Couple API, you'll need to authenticate your client instance.

### Authenticate

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

### Timeline

### Sending

Client API
----------

### authenticate(email, password, callback)

### identify()

### WIP: timeline(options, callback)

Returns a segment of the authenticated user's Couple timeline.

#### Options

##### limit

default: `1600`

##### order

default: ascending

##### after

default: `''`

#### Callback(err, timeline)

##### timeline

The `timeline` object contains the `events` returned by the Couple API and additional properties.

```js
// timeline:
{
  'firstItemID': '',
  'lastItemID': '',
  'events': [
    {},
    {},
    ...
  ]
}
```

##### events

The Couple `timeline` contains several types of `events`.

###### text

The text event is a simple message.

```js
{
  "cver": "i1.9.9", // couple version
  "enc": "b64", // text encoding (the iOS app base64 encodes text)
  "eventType": "text", // event type
  "from": "jason@example.com", // email of sender
  "itemID": "timeStampxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", // unique identifier – timestamp with concatinated Uuid
  "lID": "#########", // localID – number, seems to be used internally by the mobile apps
  "pairingID": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", // the user's pairID
  "text": "dGVzdAo=", // the text, encoded as defined in `enc`
  "timeStamp": 1430522000000, // timestamp in milliseconds
  "decodedText": "test" // `text` decoded by `couple-api`
}
```

CLI (WIP)
===
