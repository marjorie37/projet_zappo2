const isAuthenticated = (req,res,next) => {
    if(!req.session.passport){
        req.flash("error", "vous n'êtes pas Authentifié");
        res.redirect("/admin");
    }
    next()
};


module.exports = isAuthenticated;
