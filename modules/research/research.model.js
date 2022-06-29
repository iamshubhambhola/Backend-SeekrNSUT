const mongoose = require('mongoose');
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

const ResearchSchema = new mongoose.Schema(
  {
    title : {
        type: String,
        required: true,
        trim:true
    },
    research_paper_link : String,
    research_paper_image: String,
    likes:[{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    views: Number,
    comment :[{
        _id: String,
        comment_message: {
            type: String,
            required:true
        },
        created_by:{ 
            type :Schema.Types.ObjectId,
            ref : "User",
            required:true
        },
        replies :[{
            reply_id: String,
            reply_message: String,
            date: Date,
            replied_by : {
                type : Schema.Types.ObjectId,
                ref: "User",
                required:true
            }
        }]
    }],
    description:{
        type: String
    },
    authors:[{type: Schema.Types.ObjectId, ref:"User" }],
    date : {
        type: Date,
        default : Date.now
    },
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

module.exports = mongoose.model('Research', ResearchSchema);