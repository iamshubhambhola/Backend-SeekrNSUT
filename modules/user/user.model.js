const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { roles } = require("../../config/roles");

const providerList = ["email", "phone_number", "google", "facebook"];
const transformFields = [
  "role",
  "createdAt",
  "blocked",
  "active",
  "confirmed",
  "phone_number",
];

const UserSchema = new mongoose.Schema(
  {
    name :{
        type: String
    },
    profilePicture:{
        type: String
    },    
    email:{
        type: String,
        lowercase: true,
        unique: true,
        minlength: 3,
        // validate: [validateEmail, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type: String, 
        select: false,
    },
    role : {
        type: String,
    },
    projects:[{type: Schema.Types.ObjectId,
        ref: "Project" }],
    researchPapers:[{type: Schema.Types.ObjectId, ref: "Research" }],
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
        ref: "WorkExperience"
    }],
    bookmarksResearch: [{
        type: Schema.Types.ObjectId,
        ref: "Research"
    }],
    bookmarksProject: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }],
    followers:[{type: Schema.Types.ObjectId, ref: "User" }],
    following:[{type: Schema.Types.ObjectId, ref: "User" }],
    organisation: [{
        type: Schema.Types.ObjectId,
        ref:"Organisation"
    }],
    date:{
        type: Date,
        default: Date.now
    }, 
    githubId: {
        type: String,
        unique: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc) {
        const transformed = {};

        transformFields.forEach((field) => {
          transformed[field] = doc[field];
        });

        return transformed;
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods = {
  transform() {
    const transformed = {};

    transformFields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

UserSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", UserSchema);
