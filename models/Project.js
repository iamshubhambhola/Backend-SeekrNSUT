const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim:true,
        minlength:3
    },
    project_links : {
        live_link: String,
        github_link: String,
    },
    project_image:String,
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
            required: true
        },
        replies :[{
            reply_id: String,
            reply_message: String,
            date: Date,
            replied_by : {
                type : Schema.Types.ObjectId,
                ref: "User"
            }
        }]

    }],
    description:String,
    contributors:[{type: Schema.Types.ObjectId, ref="User" }],
    date : {
        type: Date,
        default : Date.now
    },
},{timestamps:true});

module.exports = mongoose.model('Project', ProjectSchema);