var mongo = require('mongodb');
var mongoClient = require('mongodb').MongoClient;

exports.getConnection = function(uri, callback) {
    mongoClient.connect(uri, function(err, db) {
        if (err) {
            return callback(err);
        } else {
            callback(null, db);
        }
    });
};