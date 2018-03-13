
const express = require('express')
const router = express.Router()
const request = require('request');
const apiKeyAuth = require('./services/auth/apiKeyAuth')
const apiKeyAuthHash = require('./services/auth/apiKeyHashAuth')

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

module.exports = router