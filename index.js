const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const routes = require('./routes')
const bodyParser = require('body-parser')

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json()) // support json encoded bodies
    .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
    .use('/', routes)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'pug')
    .use((req, res, next) => {
        res.status(404).send("Sorry can't find that!")
    })

.listen(PORT, () => console.log(`Listening on ${ PORT }`))