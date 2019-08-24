var expect = require('chai').expect;
var request = require('request');
var config = require('../config');
var db = require('../lib/db');
var user = require('../controllers/user');

describe('Database Connection', function() {
    var uri = config.database.uri;
    it('Connection string', () => {
        db.getConnection(uri, function(err, connection) {
            expect(connection).to.have.property('topology');
        });
    });
    it('Success db connection', () => {
        db.getConnection(uri, function(err, connection) {
            expect(connection).to.have.property('topology');
        });
    });
});


describe('Get Records', function() {

    it('Unsupported date format', () => {
        let startDate = "2016-37-01";
        let endDate = "2016-07-30";
        let minCount = 1000;
        let maxCount = 1500;

        user.checkParameters(startDate, endDate, minCount, maxCount, function(err, data) {
            expect(err.code).to.equal(4);
        });
    });

    it('Success data fetch', () => {
        var uri = config.database.uri;
        db.getConnection(uri, function(err, connection) {
            let startDate = "2016-07-01";
            let endDate = "2016-07-30";
            let minCount = 1000;
            let maxCount = 1500;

            user.getRecordsDB(connection, startDate, endDate, minCount, maxCount, function(err, data) {
                //console.log("data", data);
                expect(data).to.be.an('array');
            });
        });
    });
});