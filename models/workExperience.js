const mongoose = require('mongoose');

const workExperienceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    // employment_type: {
        
    // },
    company_name: {
        type: string,
        required:true
    },
    location: {
        type:string
    },
    start_date : {
        type: Date,
        default : Date.now
    },
    end_date: {
        type: Date,
        default:Date.now
    },
    description: {
        type: string
    },
    is_currently_working: {
        type:boolean
    }
});

module.exports = mongoose.model('workExperience', workExperienceSchema);


