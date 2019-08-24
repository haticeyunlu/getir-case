var expect = require('chai').expect;
var request = require('request');
var config = require('../config');
var db = require('../lib/db');
var user = require('../controllers/user');

describe('Database Connection', function() {
    var uri = config.database.uri;
    it('success db connection', () => {
        db.getConnection(uri, function(err, connection) {
            expect(connection).to.have.property('topology');
        });
    });
});


describe('Get Records', function() {
    var uri = config.database.uri;
    it('success data fetch', () => {
        db.getConnection(uri, function(err, connection) {
            let startDate = "2016-07-01";
            let endDate = "2016-07-30";
            let minCount = 1000;
            let maxCount = 1500;

            user.getRecordsDB(connection, startDate, endDate, minCount, maxCount, function(err, data) {
                //console.log("data", data);
                expect(data).to.be.be.an('array');
            });
        });
    });

    it('Date format', () => {
        let startDate = "2016-37-01";
        let endDate = "2016-07-30";
        let minCount = 1000;
        let maxCount = 1500;

        user.checkParameters(startDate, endDate, minCount, maxCount, function(err, data) {
            console.log("date format data", data);
            //expect(data).to.be.be.an('array');
        });
    });
});