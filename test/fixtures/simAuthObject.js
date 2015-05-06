'use strict';

var name1 = 'Jason';
var simuser1 = 'jason@example.com';
var name2 = 'Angela';
var simuser2 = 'angela@example.com';
var simUuid = genUuid4();
var simPairid = genUuid4();
var simOterUuid = genUuid4();
var simLastAckUuid1 = coupleTs() + genUuid4();
var simLastAckUuid2 = coupleTs() - (1000 * 1000) + genUuid4();
var simLocation = {
  country: 'US',
  state: 'VA',
  lat: 36.7000001,
  city: 'Abingdon',
  long: -82.0000001
};
var simAssetExpiration = (Date.now() + 1000 * 60 * 60 * 24 * 60);
var simHostNumber = 29;
var simSslBase = 'https://api-ssl-' + simHostNumber + '.tenthbit.com:443';
var simAuth = new Buffer('{"s":"sig+na/ture=","p":"1234567|1|' + simuser1 + '"}').toString('base64');

// from http://stackoverflow.com/revisions/2117523/2
function genUuid4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // jshint bitwise: false
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    // jshint bitwise: true
    return v.toString(16);
  });
}

function coupleTs() {
  return Date.now() * 1000;
}

function simFile(extension) {
  return 'https://assets-tenthbit-com.s3.amazonaws.com/files/some-uuid.' + extension + '?Expires=' + simAssetExpiration + '&AWSAccessKeyId=AKIAIOSFODNN7EXAMPLE&Signature=signa%2ture%3D';
}

function simApplePushNotificationId() {
  var id = '';
  var chars = '0123456789abcdef';
  for (var i = 0; i < 64; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function simGoogleCloudMessagingId(length) {
  var id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  for (var i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

module.exports = function() {
  return {
    authenticationToken: simAuth,
    user: {
      userID: simuser1,
      uuid: simUuid,
      pairID: simPairid,
      userName: name1,
      emailConfirmed: false,
      appSettings: {
        forceVideo: false,
        videoLimit: 45,
        reviewThreshold: 300,
        stickersVersion: 3.5,
        whatsNewVersion: 1.3,
        tut: 'selfie'
      },
      location: simLocation,
      lastAck: simLastAckUuid1,
      other: {
        userID: simuser2,
        uuid: simOterUuid,
        pairID: simPairid,
        userName: name2,
        emailConfirmed: false,
        appSettings: {
          forceVideo: false,
          videoLimit: 45,
          reviewThreshold: 600,
          stickersVersion: 3.5,
          whatsNewVersion: 1.3,
          tut: 'selfie'
        },
        location: simLocation,
        lastAck: simLastAckUuid2,
        settings: {
          'hide_expired_events': true,
          'show-preview': '1',
          'tut': {
            's': 's',
            't': 'selfie'
          },
          'tz': '-240'
        },
        photo: simFile('jpg'),
        phoneNumber: '(123) 456-7890',
        gender: 'F',
        email: simuser2,
        apnsData: [{
          'e': 'tb-prod',
          't': simApplePushNotificationId()
        }],
        gcmData: [{
          't': simGoogleCloudMessagingId(140)
        }, {
          't': simGoogleCloudMessagingId(140)
        }, {
          't': simGoogleCloudMessagingId(140)
        }, {
          't': simGoogleCloudMessagingId(140)
        }, {
          't': simGoogleCloudMessagingId(162)
        }, {
          't': simGoogleCloudMessagingId(162)
        }, {
          't': simGoogleCloudMessagingId(162)
        }],
        ts: coupleTs()
      },
      lastInviteVideo: simFile('mov'),
      settings: {
        tz: '-240',
        'alert-tone': 'c',
        'fb:id': '123456789'
      },
      photo: simFile('jpg'),
      walletPhoto: simFile('jpg'),
      phoneNumber: '(123) 456-7890',
      gender: 'M',
      email: simuser1,
      apnsData: [{
        'e': 'tb-prod',
        't': simApplePushNotificationId()
      }, {
        'e': 'tb-prod',
        't': simApplePushNotificationId()
      }, {
        'e': 'tb-prod',
        't': simApplePushNotificationId()
      }],
      ts: coupleTs()
    },
    poll: {
      host: 'api-wss-' + simHostNumber + '.tenthbit.com',
      port: 443,
      ssl: true,
      params: {
        p: new Buffer('{"u":"' + simuser1 + '","p":"' + simPairid + '","o":"' + simuser2 + '"}').toString('base64'),
        sig: new Buffer('aSignature').toString('hex')
      }
    },
    base: simSslBase,
    db: {
      shared: simSslBase + '/juliet-db/' + simPairid,
      user: simSslBase + '/juliet-db/' + simUuid,
      auth: simAuth
    }
  };
};
