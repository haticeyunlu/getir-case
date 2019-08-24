var moment = require('moment');
var sessionController = require('./session');
var errorList = require('../const/messages');

var getRecordsDB = function(connection, startDate, endDate, minCount, maxCount, callback) {
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
                key: {
                    $first: '$key'
                },
                createdAt: {
                    $first: '$createdAt'
                },
                totalCount: {
                    $sum: '$counts'
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

        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }

    });
};


var getRecords = function(req, res, next) {

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

    var validStart = moment(startDate, "YYYY-MM-DD").isValid();
    var validEnd = moment(endDate, "YYYY-MM-DD").isValid();

    if (!validStart || !validEnd) {
        result.code = errorList['4']['code'];
        result.msg = errorList['4']['en'];
        sessionController.endSession(req, res, next);
        return;
    }

    getRecordsDB(res.locals.connection, startDate, endDate, minCount, maxCount, function(err, data) {
        if (err) {
            result.code = err.code;
            result.msg = err.en;
            sessionController.endSession(req, res, next);
        } else {
            result.code = 0;
            result.records = data;
            next();
        }
    });
};

module.exports.getRecords = getRecords;