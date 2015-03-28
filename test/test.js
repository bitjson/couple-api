'use strict';

var Couple = require('../');
var assert = require('assert');
var nock = require('nock');

describe('couple-api', function() {

  it('should have an authenticate method', function(){
    var couple = new Couple();
    assert.equal(typeof couple, 'object');
    assert.equal(typeof couple.authenticate, 'function');
  });

  it('should have an identify method', function(){
    var couple = new Couple();
    assert.equal(typeof couple, 'object');
    assert.equal(typeof couple.identify, 'function');
  });

});
