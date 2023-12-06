const express = require('express');
const router = express.Router()
const User = require('../models/User');
const passport = require('passport');
// const User = require('../models/User');

//REGISTER NEW USER

router.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email
    });

    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error registering user!");
        }
        passport.authenticate('local')(req, res, () => {
            res.status(200).send("User registration successful");
        });
    });
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