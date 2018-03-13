
var assert = require('assert');

describe('jobs test', () => {
    describe('getjobs', () => {
        it('should get jobs', (done) => {
            var jobs = require('../services/jobs/jobs')

            jobs.getJobs({}, 0, null).then(result => {
                console.log('result', result)
                done()
            }).catch((e) => {
                console.log("ERROR", e)
            })





        });
    });
});