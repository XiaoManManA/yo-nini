const express = require('express'),
    contribute = express.Router(),
    mongoose = require('mongoose'),
    path = require('path'),
    formidable = require('formidable'),
    fs = require('fs'),
    User = mongoose.model('User'),
    passport=require('./../../config/passport');

module.exports = function(app) {
    app.use('/contribute', contribute)
}

contribute.route('/').get(passport.isAuthenticated,(req, res, next) => {
	res.render('contribute', {
            title: '任务配置',
            message: null
    })
}).post((req, res, next) =>{
	console.log('hey')

})