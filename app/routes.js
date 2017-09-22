const isLoggedIn = require('./middleware').isLoggedIn;


module.exports = function(app, passport) {

    // =============================
    // === HOME PAGE ===============
    // =============================
    app.get('/', (req, res) => {
        res.render('index.ejs')
    })

    // ==============================
    // ====  LOGIN PAGE =============
    // ==============================
    app.get('/login', (req, res) => {
        res.render('login.ejs', {message: req.flash ('loginMessage')})
    })

    // =============================
    // ===== LOGIN USER ============
    // =============================
    // app.post('/login')

    // ==============================
    // ======= SIGN UP ==============
    // ==============================
    app.get('/signup', (req, res) => {
        res.render('signup.ejs', {message: req.flash('singupMessage')})
    })

    // ==============================
    // ====== SIGN UP CREATE ========
    // ==============================
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        faulireFlash : true
    }))

    // ===============================
    // ===== PROFILE SECTION =========
    // ===============================
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile.ejs', {
            user: req.user
        })
    })

    // ==============================
    // ==== LOGGOUT =================
    // ==============================
    app.get('/logout', (reqm, res) => {
        req.logout()
        res.redirect('/')
    })
}