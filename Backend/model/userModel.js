const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "username is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        minlength: [6, "password must be at least 6 characters"]
    },
    image:{
        type: String,
    },
    credit:{
        type: Number,
    },
    authMode:{
        type: String,
    },
    subscription: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
    });


const User = mongoose.model('User', UserSchema);
module.exports = User;