var mongoose = require('mongoose');

module.exports = mongoose.model('Reminder', {
    mssg : {type : String, default: ''},
    phone : {type : String, default: ''},
    block : {type : String, default: ''}
});