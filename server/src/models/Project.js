const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String },
  descriptionAr: { type: String },
  category: { type: String },
  location: { type: String },
  date: { type: Date },
  images: [{ type: String }],
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);