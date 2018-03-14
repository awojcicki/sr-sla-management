
const express = require('express')
const router = express.Router()
const request = require('request');
const apiKeyAuth = require('./services/auth/apiKeyAuth')
const apiKeyAuthHash = require('./services/auth/apiKeyHashAuth')
const jobs = require('./services/jobs/jobs')

router.get('/', (req, res) => res.render('pages/index'))

router.post('/login', (req, res) => {
    apiKeyAuth.authenticate(req.body.apiKey).then(result => {
        if(result.apiKeyHash){
            res.redirect(result.apiKeyHash + '/jobs');
        }
    }).catch(error=>{
        res.status(404).send("Sorry can't find that!")
    })
})

// parameter middleware that will run before the next routes
router.param('apiKeyHash', function(req, res, next, apiKeyHash) {
    // check if the apiKeyHash exists
    apiKeyAuthHash.authenticate(apiKeyHash)
        .then(result => {
            next();
        }).catch(error =>{
            res.redirect('/');
        })
})

router.get('/:apiKeyHash/jobs', function(req, res) {
    if(req.params.apiKeyHash){
        res.render('pages/jobs');
    } else {
        res.redirect('/');
    }
});

router.get('/:apiKeyHash/api/jobs', function(req, res) {
    var apiKeyHash = req.params.apiKeyHash
    if(apiKeyHash){
        //TODO: you probably don't want to resolve this twice, it should be request scope, but I don't know express well ;)
        apiKeyAuthHash.authenticate(apiKeyHash)
            .then(result => {
                jobs.getJobs(result, 0, null).then(jobs => {
                    res.status(200).send(jobs)

                })
            }).catch(error =>{
                res.redirect('/');
            })
    } else {
        res.redirect('/');
    }

});

router.post('/:apiKeyHash/api/job/scheduleUnposting', function(req, res) {
    var apiKeyHash = req.params.apiKeyHash
    var job = req.body.job

    if(apiKeyHash){
        //TODO: you probably don't want to resolve this twice, it should be request scope, but I don't know express well ;)
        apiKeyAuthHash.authenticate(apiKeyHash)
            .then(result => {
                jobs.scheduleUnposting(result, job.id, job.unpostingDate).then(job => {
                    res.status(200).send(job)
                }).catch(error =>{
                    console.log(error);
                })
            }).catch(error =>{
                    res.redirect('/');
            })
    } else {
        res.redirect('/');
    }

});


module.exports = router