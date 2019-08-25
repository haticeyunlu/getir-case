var mongo = require('mongodb');
var mongoClient = require('mongodb').MongoClient;

exports.getConnection = function(uri, callback) {
    // useNewUrlParser and useUnifiedTopology is added for DeprecationWarning
    mongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
        if (err) {
            return callback(err);
        } else {
            callback(null, db);
        }
    });
};