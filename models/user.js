const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

 
//create schema
const userSchema = new Schema({
    name :{
        type: String,
        required: true,
        required: 'Name is required'
    },
    profilePicture:{
        type: String,
    },    
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
    password : {
        type: String, 
        select: false,
        required: true
    },
    role : {
        type: String,
        required: true, 
    },
    projects:[{type: Schema.Types.ObjectId, ref:"Project" }],
    researchPapers:[{type: Schema.Types.ObjectId, ref:"Research" }],
    socialLinks : [{
        githubLink: String,
        googleScholarProfileLink: String,
        linkedIn :String
    }],
    resumeId:{
        type: String,
        unique: true
    },     
    userBio: {
        type: String,
    },
    skillSet:[{
        type: Schema.Types.ObjectId,
        ref: "Skills",
    }],  
    accomplishments: [{
        title: String,
        description: String,
        date: {
            type: Date,
            default: Date.now
        },
    }], 
    workExperience: [{
        type: Schema.Types.ObjectId,
        ref:"WorkExperience"
    }],
    bookmarksResearch: [{
        type: Schema.Types.ObjectId,
        ref: "Research"
    }],
    bookmarksProject: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }],
    followers:[{type: Schema.Types.ObjectId, ref:"User" }],
    following:[{type: Schema.Types.ObjectId, ref:"User" }],
    organisation: [{
        type: Schema.Types.ObjectId,
        ref:"Organisation"
    }],
    date:{
        type: Date,
        default: Date.now
    }, 
},{
    timestamps: true,
},{collection: 'students'});
 

const User = mongoose.model('User',userSchema); 

module.exports = {User}; 