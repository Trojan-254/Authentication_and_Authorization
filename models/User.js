const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    
},
{ timestamps: true }
);

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

//Aplly plugin
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema); // Exportation of the user model