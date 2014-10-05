/*global describe,it*/
'use strict';
var assert = require('assert');
var antecedantProgressor = require('../lib/antecedant-progressor.js');

var client = antecedantProgressor.connect();
console.log(client); // async,, does not print anything


describe('antecedant-progressor node module.', function() {
  it('must be awesome', function() {
    assert( antecedantProgressor.awesome(), 'awesome');
  });
});
