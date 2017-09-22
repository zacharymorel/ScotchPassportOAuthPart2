
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
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local' 
    passport.use('local-signup', new LocalStrategy({
        // by default local strategy uses username and password, we will override with email
        usernameField : 'email', 
        passwordField : 'password',
        passReqToCallback : true 
        // ^^ allows us to passs back the entire request to the callback 
    },

    function(req, email, password, done){
        
        // asynchronous 
        // User.findOne wont fire unless data is sent back
        process.nextTick(function () {
        
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' : email},  function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err)
            
            // check to see if there already a user with that email.
            if(user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
                } else {
                    // if there is no user with that email.
                    // create the user
                    let newUser = new User()

                    // set the user's local credentials
                    newUser.local.email = email
                    newUser.local.password = newUser.generateHash(password) 

                    // save the user
                    newUser.save(function(err){
                        if(err)
                            throw err
                        return done(null, newUser)
                    })
                }
            })
        })
    }))

}