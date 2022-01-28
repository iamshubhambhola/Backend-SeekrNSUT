const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};



//create schema
const userSchema = new Schema({
    email:{
        type: String,
        required: true, 
        lowercase: true,
        unique: true,
        minlength: 3,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    date:{
        type: Date,
        default: Date.now
    }, 
},{
    timestamps: true,
},{collection: 'students'});
 

const User = mongoose.model('User',userSchema); 

module.exports = {User}; 