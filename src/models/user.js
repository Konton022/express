const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        usename: {
            type: String,
            required: true,
            index: {unique: true}
        },
        email: {
            type: String,
            required: true,
            index: {unique:true}
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        }
    },{
        timestamps: true
    }
)

const User = mongoose.model('User', UserSchema)

module.exports = User