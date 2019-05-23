const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    user:{
        type: String, 
        required:[true,'el nombre es necesario']
    },
    email:{
        type: String, 
        required:[true,'el email es necesario']
    },
    pass:{
        type: String, 
        required:[true,'la contraseña es necesaria']
    }
});
module.exports = mongoose.model('User', userSchema);