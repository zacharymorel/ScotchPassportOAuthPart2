let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');


// SCHEMA
const userSchema =  mongoose.Schema({
    local : {
        email : String,
        password : String
    },
    google : {
        id : String,
        token : String,
        email : String,
        name : String
    }
});

// METHODS ================
//  generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// Checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password)
}

// Create the model for the users and expose it to our app
module.exports = mongoose.model('User', userSchema)