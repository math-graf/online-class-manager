const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res) {
    return res.redirect('/teachers')
})

routes.get('/teachers', function(req, res) {
    return res.render('teachers/index')
})

routes.get('/teachers/create', function(req, res) {
    const fs = require('fs')

    fs.writeFile('data.json', JSON.stringify(req.body, null, 2), function(err) {
        if (err) return res.send('Write file error!')

        return res.redirect('/teachers')
    })

    return res.render('teachers/create')
})

module.exports = routes