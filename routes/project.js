const Project = require('../models/Project.js');
const User = require('../models/user.js');
const express = require('express');
const router = express.Router();

router.post('/newProject', async (req, res) => {
    try {
        const { title, project_links, project_image, description, contributors } = req.files;
        // Creating a new project wth the given data
        const project = new Project({ title, project_links, project_image, description, contributors });
        await project.save();
        // Pushing project id to user's projects array
        for (let i = 0; i < contributors.length; i++) {
            await User.findByIdAndUpdate(contributors[i], { $push: { projects: project._id } });
        }
        // Project creating successfully done
        return res.status(201).json({
            message: 'Project added successfully'
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.get('/allProjects', async (req, res) => {
    try {
        // const projects = await Project.find({});
        // How to get the userId
        const projects = await User.findById(req.body.userId).populate('projects')['projects'];
        return res.status(200).json({
            projects
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message
        });
    }
})

module.exports = router;