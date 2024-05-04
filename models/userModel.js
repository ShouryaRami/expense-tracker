let mongoose = require('mongoose');

let user = new mongoose.Schema({
    username : {type:"String"},
    password : {type:"String"}
})

let User = mongoose.model('User', user)

module.exports = User