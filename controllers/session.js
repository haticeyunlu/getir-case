var moment = require('moment');
var db = require('../lib/db');
var errorList = require('../const/messages');


// moment().format('YYYYMMDDHHmmss')

var getJsonResponse = function() {
    var reply = {
        code: -1,
        msg: ''
    };
    return reply;
};


var initSession = function(req, res, next) {
    console.log('initSession');

    res.locals.result = getJsonResponse();
    db.getConnection(function(err, connection) {
        if (err) {
            next(errorList['2']);
        } else {
            res.locals.connection = connection;
            next();
        }
    });
};



var endSession = function(req, res, next) {
    console.log('endSession');
    console.log('res.locals', res.locals);

    if (res.locals.connection) {
        console.log("close the sessin");
        res.locals.connection.close();
    }

    if (res.locals.result.code == 0) {
        res.locals.result.msg = 'Success';
        res.json(res.locals.reply);
    } else {
        res.json(res.locals.result);
    }

};


module.exports.initSession = initSession;
module.exports.endSession = endSession;