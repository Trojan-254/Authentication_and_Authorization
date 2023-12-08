const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local-mongoose').Strategy
const dotenv = require('dotenv')
dotenv.config();
const authRouter = require('./routes/auth')

port = 3000

// connect to a database
mongoose
 .connect(process.env.MONGO_URL)
 .then(() => console.log("DB Connection was succesfull.."))
 .catch((err) => {
    console.log(err); 
});

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy (authUser))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log("Backend server is running!.....");
    console.log(`Listening on port ${port}...`);
})