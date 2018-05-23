
const should = require('should');
require('should-http');
const request = require('supertest');

const baseURL = 'http://localhost:3000/energy';

const codes = {
    success: 200,
    created: 201,
    wrongrequest: 400,
    notfound: 404,
    wrongmethod: 405,
    cannotfulfill: 406,
    wrongmedia: 415,
    nocontent: 204
};

const newEnergyGood =
    {
        "weight": 123,
        "co2": 12
    };

    const newEnergyBad =
    {
        "weight": 123,
    };

// start of tests ********************************************************************************
describe('Create New', function () {
    describe('/energy REST API POST', function () {
        // good POSTs
        it('should save a proper POST', function (done) {
            request(baseURL)
                .post('/')
                .set('Accept-Version', '1.0')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(newEnergyGood)
                .expect('Content-Type', /json/)
                .expect(codes.created)
                .end(function (err, res) {
                    should.not.exist(err);
                    res.should.be.json();
                    res.body.should.have.properties(Object.getOwnPropertyNames(energyClass));
                    done();
                })
        });

        // bad POSTs
        it('should detect a post to wrong URL with id and answer with code 405', function (done) {
            request(baseURL)
                .post('/123')
                .set('Accept-Version', '1.0')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(newEnergyBad)
                .expect(codes.wrongrequest)
                .end(function (err, res) {
                    should.not.exist(err);
                    if (res.body && res.body.id) {  // usually your body should be empty if correct implemented
                        videoIDsCleanup.push(res.body.id);
                    }
                    done();
                })
        });

    });
});