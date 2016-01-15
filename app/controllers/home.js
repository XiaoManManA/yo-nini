var express = require('express'),
    home = express.Router(),
    mongoose = require('mongoose'),
    path = require('path'),
    formidable = require('formidable'),
    fs = require('fs'),
    passport = require('passport'),
    User = mongoose.model('User');

module.exports = function(app) {
    app.use('/', home)
}

home.route('/').get(function(req, res, next) {
    res.render('index', {
        title: 'Generator-Express MVC'
    })
})


home.route('/register').get(function(req, res, next) {
        res.render('register', {
            title: '注册'
        })
    })
    .post(function(req, res, next) {
        var headImg = null;
        var form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.uploadDir = path.normalize('./././public/upload/'); //设置上传目录
        form.keepExtensions = true; //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
        form.parse(req, function(err, fields, files) { //fields 表单的其它参数
            console.log('fields.username =' + fields.username)
            console.log('============================== into formidable method ================================')
            if (err) {
                res.locals.error = err;
                res.render('index', {
                    msg: err
                });
                return;
            }
            var extName = ''; //后缀名
            switch (files.img.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            }

            if (extName.length == 0) {
                res.locals.error = '只支持png和jpg格式图片';
                res.render('/', {
                    msg: '只支持png和jpg格式图片'
                });
                return;
            }

            var avatarName = Math.random() + '.' + extName;
            var newPath = form.uploadDir + avatarName;

            console.log("newPath:" + newPath);
            fs.renameSync(files.img.path, newPath); //重命名
            console.log("=========================== 上传图片成功 =================================")

            User.findOne({
                username: fields.username
            }, function(err, doc) { // 同理 /login 路径的处理方式
                if (err) {
                    res.send(500)
                    console.log(err)
                } else if (doc) {
                    res.send(fields.username + '已存在');
                } else {

                    User.register(new User({ // 创建一组user对象置入model
                            username: fields.username,
                            password: fields.password,
                            isVip: 1,
                            headImg: newPath,
                            phone: fields.phone,
                            registerTime: new Date(),
                            lastLoginTime: null,
                            ip: fields.ip,
                            city: fields.city,
                            region: fields.region,
                            country: fields.country,
                            loc: fields.loc,
                            org: fields.org
                        }), fields.password, function(err, user) {
                            if (err) {
                                return res.render("register", {
                                    info: "Sorry. That username already exists. Try again."
                                });
                            }
                            res.redirect('/login')
                                /*passport.authenticate('local')(req, res, function() {
                                    req.session.save(function(err) {
                                        if (err) {
                                            return next(err);
                                        }
                                        res.redirect('/index');
                                    });
                                });*/
                        })
                        /*User.create({ // 创建一组user对象置入model
                            username: fields.username,
                            password: fields.password,
                            isVip: 1,
                            headImg: newPath,
                            phone: fields.phone,
                            registerTime: new Date(),
                            lastLoginTime: null,
                            ip: fields.ip,
                            city: fields.city,
                            region: fields.region,
                            country: fields.country,
                            loc: fields.loc,
                            org: fields.org
                        }, function(err, doc) {
                            if (err) {
                                res.send(500);
                                console.log(err);
                            } else {
                                res.redirect('/login')
                            }
                        })*/
                }
            })

        })
    })

home.route('/login').get(function(req, res, next) {
    res.render('login', {
        title: '登录'
    })
}).post(passport.authenticate('local'), function(req, res) {
    req.session.save(function(err) {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})
