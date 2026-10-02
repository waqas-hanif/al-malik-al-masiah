
const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ published: true }).sort('-date');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
  