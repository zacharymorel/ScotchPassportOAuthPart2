module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.Authenticated()) {
      return next();
    } else {
      return res.redirect("/");
    }
  }
};
