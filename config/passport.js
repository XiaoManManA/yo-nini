const passport = require('passport');

//用户登录验证
exports.login = function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            next(err)
            return
        }
        if (!user) {
            res.render('login', {
                title: '登录失败',
                message: info.message
            })
            return
        }
        if (user.isVip == 0) {
            res.render('login', {
                title: '登录失败',
                message: '抱歉,你的帐号还未激活.'
            })
            return
        }
        req.logIn(user, function(err) {
            if (err) {
                next(err)
                return
            }
            res.redirect('/index') //跳转首页
            return
        })
    })(req, res, next);

}

exports.logout = function(req, res, next) {
    if (req.isAuthenticated()) {
        req.logOut()
    }
    res.render('login', {
        title: '登录',
        message: null
    })
}

//将req.isAuthenticated()封装成中间件
exports.isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login', {
        title: '登录',
        message: null
    });
}
