const Project = require('../models/Project.js');
const User = require('../models/user.js');
const Research = require('../models/Research.js');
const express = require('express');
const router = express.Router();

router.post('/newResearchPaper', async (req, res) => {
    try {
        console.log(req.body);
        const { title, research_paper_links, research_paper_image, description, authors } = req.body;
        // Creating a new project wth the given data
        const researchPaper = new Research({ title, research_paper_links, research_paper_image, description, authors });
        await researchPaper.save();
        // Pushing project id to user's projects array
        for (let i = 0; i < authors.length; i++) {
            await User.findByIdAndUpdate(authors[i], { $push: { researchPapers: researchPaper._id } });
        }
        // Project creating successfully done
        return res.status(201).json({
            message: 'Research Paper added successfully'
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.get('/allResearchPapers', async (req, res) => {
    try {
        // const projects = await Project.find({});
        // How to get the userId
        const researchPapers = await User.findById(req.body.userId).populate('researchPapers')['researchPapers'];
        return res.status(200).json({
            researchPapers
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
})

module.exports = router;