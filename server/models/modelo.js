const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let recordSchema = new Schema({
    record:{
        type: String, 
        required:[true,'necesario']
    }
});
module.exports = mongoose.model('Record', recordSchema);