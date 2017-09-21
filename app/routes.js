const isLoggedIn = require('./middeware').isLoggedIn;


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
        res.render('singup.ejs', {message: req.flash('singupMessage')})
    })

    // ==============================
    // ====== SIGN UP CREATE ========
    // ==============================
    // app.post('/signup',)

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