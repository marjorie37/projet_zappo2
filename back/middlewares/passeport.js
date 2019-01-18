const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require(`../models/index.js`);
const { comparePassword } = require("./bcryptPassword");

//New strategy local for connection with passport
passport.use(
  "user",
  new LocalStrategy(
    {
      usernameField: "email", // nom des champs de mon formulaire
      passwordField: "password",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, email, password, next) => {
      db.users.findOne({ where: { email: email } }).then(user => {
        if (!user) {
          return next(null, false, { error: "Cet email n'existe pas"});
        } else if (!user.state) {
          return next(null, false, { error: "Votre compte est désactivé"});
        }
        const checkPass = comparePassword(password, user.password);
        checkPass.then(
          check =>{
            check
              ? next(null, user)
              : next(null, false, { error: "Mot de passe invalide" })
          });
      });
    }
  )
);

passport.use(
  "staff",
  new LocalStrategy(
    {
      usernameField: "name", // nom des champs de mon formulaire
      passwordField: "password",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, name, password, next) => {
      db.staff.findOne({ where: { name: name } }).then(user => {
        if (!user) {
          req.flash("error", )
          return next(null, false, { error: "Cet utilisateur n'existe pas"});
        } else if (!user.state) {
          return next(null, false, { error: "Votre compte est désactivé" });
        }
        const checkPass = comparePassword(password, user.password);
        checkPass.then(check => {
          req.flash("success", `Bienvenue ${user.name}`)
          check
            ? next(null, user)
            : next(null, false, { error: "Mot de passe invalide" });
        });
      });
    }
  )
);

passport.use(
  "admin",
  new LocalStrategy(
    {
      usernameField: "name", // nom des champs de mon formulaire
      passwordField: "password",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, name, password, next) => {
      db.staff.findOne({ where: { name: name } }).then(user => {
        if (!user) {
          req.flash("error", "Cet utilisateur n'existe pas")
          return next(null, false);
        } else if (!user.state) {
          req.flash("error", "Votre compte est désactivé")
          return next(null, false);
        }
        if (!user.position) {
          req.flash("error", "Utilisateur non autorisé")
          return next(null, false);
        }
        const checkPass = comparePassword(password, user.password);
        checkPass.then(check => {
          req.flash("success", `Bienvenue ${user.name}`)
          check
            ? next(null, user)
            : next(null, false);
        });
      });
    }
  )
);

// Serialize and Unserialize an User
passport.serializeUser((user, done) => {
  const bool = user instanceof db.users;
  const User  = {
    id:user.id,
    Model: bool ? "users" : "staff",
    role: bool ? "" : user.position,
    state:user.state
  };
  done(null, User)
});

// saved to session req.session.passport.user = {id:'..'}
passport.deserializeUser((user, done) => {
  const {Model, id} = user;
  db[Model]
    .findOne({
      // Using sequelize model function
      where: {
        id:id
      }
    })
    .then(user => {
      if (user === null) {
        done(new Error("Wrong user id."));
      }
      done(null, user); // Standard deserialize callback
    });
});
