
// Load all the things we need
let LocalStrategy = require('passport-local').Strategy

// load up the udser model
let User = require('../app/models/user')

// expose this function to our app using module.exports
module.exports = function(passport) {

    // ================================
    // === Passport session set up ====
    // ================================
    // required for presistent login sessions
    // passport needs ability to serialize and unserialize user out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    // usded to deserialize the user
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user)
        })
    })

    
    // ================================
    // ===== LOCAL SIGNUP =============
    // ================================
    

}