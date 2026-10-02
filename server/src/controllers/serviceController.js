
const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ published: true });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
  