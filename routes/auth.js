const express = require('express');
const router = express.Router()
const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/User');


passport.use(new LocalStrategy(authUser));

authUser = (user, password, done) => {
  let authenticated_user = {}
  return done (null, authenticated_user)
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        // Use user's password validation logic here...
        if (!user.validatePassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(err => {
        return done(err);
      });
  }
));


passport.serializeUser((userObj, done) => {
  done(null, userObj)
});
passport.deserializeUser((userObj, done) => {
  done(null, userObj)
});

//REGISTER NEW USER

router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email
    });

    await User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error registering user!");
        }
        passport.authenticate('local')(req, res, () => {
            res.status(200).send("User registration successful");
            console.log(newUser);
        });
    });
});

// LOGIN USER

router.post('/login', passport.authenticate('local'), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    successRedirect: "/dashboard"
    failureRedirect: "/login"
    res.status(200).send("Login successful");
    console.log("A user logged in succesfully")
});





 

// router.post('/register', (req, res) => {
//     const newUser = {
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//     }
//     try{
//         User.register(newUser({ username, email }), password, (err, user) => {
//             if(err){
//                 console.log(err);
//                 return res.status(500).send("Error registering user!")
//             }
//             passport.authenticate('local')(req, res, () => {
//                 res.status(200).send("User Registration successfull");
//             });
//         });
//     } catch(err){
//         console.log(err)
//     }
// })

module.exports = router