var db = require('../lib/db');
var conf = require('../config');
var errorList = require('../const/messages');
var dbUri = conf.database.uri;

var getJsonResponse = function() {

    var reply = {
        code: -1,
        msg: ''
    };

    return reply;
};


var initSession = function(req, res, next) {

    res.locals.result = getJsonResponse();

    db.getConnection(dbUri, function(err, connection) {
        if (err) {
            next(errorList['2']);
        } else {
            res.locals.connection = connection;
            next();
        }
    });
};



var endSession = function(req, res, next) {
    console.log("res.locals.result", res.locals.result);
    if (res.locals.connection) {
        res.locals.connection.close();
    }

    if (res.locals.result.code == 0) {
        res.locals.result.msg = 'Success';
    }

    res.json(res.locals.result);

};


module.exports.initSession = initSession;
module.exports.endSession = endSession;