/*global describe,it*/
'use strict';
var assert = require('assert'),
  antecedantProgressor = require('../lib/antecedant-progressor.js');

describe('antecedant-progressor node module.', function() {
  it('must be awesome', function() {
    assert( antecedantProgressor.awesome(), 'awesome');
  });
});
