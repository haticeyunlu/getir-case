var sessionController = require('./session');
var errorList = require('../const/messages');

var getUsersDB = function(connection, startDate, endDate, minCount, maxCount, callback) {
    var db = connection;
    if (!db) {
        callback(errorList['2']);
        return;
    }
    var query = [{
            $match: {
                createdAt: {
                    $lte: new Date(endDate),
                    $gte: new Date(startDate)
                }
            }
        },
        {
            $unwind: '$counts'
        },
        {
            $group: {
                _id: '$_id',
                totalCount: {
                    $sum: '$counts'
                },
                key: {
                    $first: '$key'
                },
                createdAt: {
                    $first: '$createdAt'
                }
            }
        },
        {
            $match: {
                totalCount: {
                    $lte: maxCount,
                    $gte: minCount
                }
            }
        },
        {
            $project: {
                _id: false,
                key: true,
                createdAt: true,
                totalCount: true
            }
        }
    ];
    var dbo = db.db("getir-case-study");
    dbo.collection("records").aggregate(query).toArray(function(err, result) {
        console.log("err, result", err, result);
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
};


var getUsers = function(req, res, next) {

    var startDate = req.body.startDate || '';
    var endDate = req.body.endDate || '';
    var minCount = req.body.minCount || '';
    var maxCount = req.body.maxCount || '';

    var result = res.locals.result;

    if (startDate == '' || endDate == '' || minCount == '' || maxCount == '') {
        result.code = errorList['1']['code'];
        result.msg = errorList['1']['en'];
        sessionController.endSession(req, res, next);
        return;
    }

    getUsersDB(res.locals.connection, startDate, endDate, minCount, maxCount, function(err, data) {
        if (err) {
            result.code = err.code;
            result.msg = err.en;
            sessionController.endSession(req, res, next);
        } else {
            result.code = 0;
            next();
        }
    });
};

module.exports.getUsers = getUsers;