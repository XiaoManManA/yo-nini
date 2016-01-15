const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,
    password: String,
    isVip: Number,
    headImg: String,
    phone: String,
    registerTime: Date,
    lastLoginTime: Date,
    ip: String,
    city: String,
    region:String,
    country:String,
    loc:String,
    org:String
})

UserSchema.plugin(passportLocalMongoose)

mongoose.model('User', UserSchema)
