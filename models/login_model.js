const mongoose = require('mongoose')

const Login_schema = new mongoose.Schema( {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlegth:8}
})


const Login = mongoose.model('Login', Login_schema);
module.exports = Login;

