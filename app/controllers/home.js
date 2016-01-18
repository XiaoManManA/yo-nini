const express = require('express'),
    home = express.Router(),
    mongoose = require('mongoose'),
    path = require('path'),
    formidable = require('formidable'),
    fs = require('fs'),
    User = mongoose.model('User'),
    passport=require('./../../config/passport');

module.exports = function(app) {
    app.use('/', home)
}

home.route('/').get((req, res, next) => {
    res.render('login', {
        title: '登录',
        message:null
    })
})

home.route('/register').get((req, res, next) => {
        res.render('register', {
            title: '注册',
            message: null
        })
    })
    .post((req, res, next) => {
        var headImg = 'default.jpg'
        var form = new formidable.IncomingForm() //创建上传表单
        form.encoding = 'utf-8' //设置编辑
        form.uploadDir = path.normalize('./././public/upload/headimg') //设置上传目录
        form.keepExtensions = true //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024 //文件大小
        form.parse(req, function(err, fields, files) { //fields 表单的其它参数
            //res.send(JSON.stringify(files))
            User.findOne({
                username: fields.username
            }, function(err, doc) { // 同理 /login 路径的处理方式
                if (err) {
                    res.send(500)
                } else if (doc) {
                    res.render("register", {
                        message: fields.username + '已存在'
                    })
                    return
                } else {
                    //图片上传
                    if (files.img.size != 0) {
                        if (err) {
                            res.render('register', {
                                message: err
                            })
                            return
                        }
                        var extName = '' //后缀名
                        switch (files.img.type) {
                            case 'image/pjpeg':
                                extName = 'jpg'
                                break
                            case 'image/jpeg':
                                extName = 'jpg'
                                break
                            case 'image/png':
                                extName = 'png'
                                break
                            case 'image/x-png':
                                extName = 'png'
                                break
                        }

                        if (extName.length == 0) {
                            res.render('register', {
                                message: '头像只支持png和jpg格式图片'
                            })
                            return
                        }

                        headImg = Math.random() + '.' + extName
                        var newPath = form.uploadDir + headImg

                        fs.renameSync(files.img.path, newPath) //重命名

                    }

                    User.register(new User({ // 创建一组user对象置入model
                        username: fields.username,
                        password: fields.password,
                        isVip: 1,
                        headImg: 'upload\\headimg' + headImg, //考虑将路径配置成全局变量
                        phone: fields.phone,
                        registerTime: new Date(),
                        lastLoginTime: null,
                        ip: fields.ip,
                        city: fields.city,
                        region: fields.region,
                        country: fields.country,
                        loc: fields.loc,
                        org: fields.org
                    }), fields.password, (err, user) => {
                        if (err) {
                            res.render("register", {
                                message: "Sorry. That username already exists. Try again."
                            })
                            return
                        }
                        res.redirect('/login')
                    })
                }
            })

        })
    })

home.route('/login').get((req, res, next) => {
    res.render('login', {
        title: '登录',
        message: null
    })
}).post((req, res, next) => {
    passport.login(req, res, next)
})

home.route('/logout').get((req, res, next) => {
    passport.logout(req, res, next)
})

home.route('/index').get((req, res, next) => {
    res.render('index', {
        title: '首页',
        user: req.user
    })
})