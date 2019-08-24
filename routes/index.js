var express = require('express');
var router = express.Router();
var sessionController = require('../controllers/session');
var userController = require('../controllers/user');
var errorList = require('../const/messages');

router.route('/api/user')
    .post(sessionController.initSession,
        userController.getRecords,
        sessionController.endSession);

router.notFoundHandler = function(req, res, next) {

    return res.status(404).send({
    	code:  errorList['404']['code'],
        msg: errorList['404']['en']
    });

};

router.customErrorHandler = function(err, req, res, next) {
    console.log("Error occured: ", err);
    res.locals.result.code = err.code || errorList['500']['code'];
    res.locals.result.msg = err.en || errorList['500']['en'];
    sessionController.endSession(req, res, next);

};

module.exports = router;