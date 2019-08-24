var conf = require('../config');
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var dbUri = conf.database.uri;

exports.getConnection = function(callback) {
    MongoClient.connect(dbUri, function(err, db) {
        if (err) {
            console.log('Can not Connected to db ');
            return callback(err);
        } else {
            console.log('Connected to db');
            callback(null, db);
        }
    });
};