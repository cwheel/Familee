var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    user : {type : String, default: ''},
    pass : {type : String, default: ''},
    name : {type : String, default: ''},
    relatives : {type : Array},
});