//Userschema for the user

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token: String,
    tokenExpirationDate: Date,
})

const User = mongoose.model("user", userSchema);

module.exports = User;