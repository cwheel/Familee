var mongoose = require('mongoose');

module.exports = mongoose.model('Fitbit', {
    owner : {type : String, default: ''},
    access_token : {type : String, default: ''},
    refresh_token : {type : String, default: ''},
    username : {type : String, default: ''}
});