const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    
},
{ timestamps: true }
);

//Aplly plugin
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema); // Exportation of the user model