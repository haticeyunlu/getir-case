var expect = require('chai').expect;
var request = require('request');
var config = require('../config');
var db = require('../lib/db');
var record = require('../controllers/record');

describe('Database Connection', function() {

    var uri = config.database.uri;
    
    it('Connection string', () => {
        expect(uri).to.be.a('string');
    });

    it('Success db connection', () => {
        db.getConnection(uri, function(err, connection) {
            expect(connection).to.have.property('topology');
        });
    });
});


describe('Check Parameters', function() {

    it('Unsupported date format', () => {
        let startDate = "2016-37-01";
        let endDate = "2016-07-30";
        let minCount = 1000;
        let maxCount = 1500;

        record.checkParameters(startDate, endDate, minCount, maxCount, function(err, data) {
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

            record.getRecordsDB(connection, startDate, endDate, minCount, maxCount, function(err, data) {
                expect(data).to.be.an('array');
            });
        });
    });
});

/*
describe("Routes", function() {
    var getRecords = record.getRecords;

    it("should respond", function() {
        var req, res, spy;

        req = res = {};
        spy = res.send = sinon.spy();

        getRecords(req, res);
        expect(spy.calledOnce).to.equal(true);
    });

});

*/