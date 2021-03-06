var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

var User = new mongoose.Schema(
{
    admin: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
)

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)