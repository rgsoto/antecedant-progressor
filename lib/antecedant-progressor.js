/*
 *
 * https://github.com/usufruct/antecedant-progressor
 *
 * Copyright (c) 2014 Michael A Anderson
 * Licensed under the MIT license.
 */

'use strict';
var pg = require('pg');
var conString = "postgres://usufruct@localhost:8888/usufruct";

exports.awesome = function() {
  return 'awesome';
};

exports.connect = function() {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
      done();
    }
    return client;
    done()
  });
};
