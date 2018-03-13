
const express = require('express')
const router = express.Router()
const request = require('request');
const apiKeyAuth = require('./services/auth/apiKeyAuth')

router.get('/', (req, res) => res.render('pages/index'))

router.post('/login', (req, res) => {
    apiKeyAuth.authenticate(req.body.apiKey).then(result => {
        if(result.apiKeyHash){
            res.redirect(result.apiKeyHash + '/jobs');
        }
    }).catch(error=>{
        console.log(error);
        res.status(404).send("Sorry can't find that!")
    })
})

// parameter middleware that will run before the next routes
router.param('apiKeyHash', function(req, res, next, name) {
    // check if the apiKeyHash exists
    //apiKeyAuth.authenticate(req.apiKeyHash);
    next();
});

router.get('/:apiKeyHash/jobs', function(req, res) {
    // the apiKeyHash was found and is available in req.apiKeyHash
    res.render('pages/jobs')
});

module.exports = router