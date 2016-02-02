const express = require('express'),
    work = express.Router(),
    mongoose = require('mongoose'),
    path = require('path'),
    formidable = require('formidable'),
    fs = require('fs'),
    User = mongoose.model('User'),
    passport = require('./../../config/passport');

module.exports = function(app) {
    app.use('/work', work)
}

work.route('/').get((req, res, next) => {
    res.render('work', {
        title: '作品',
        message:null
    })
})