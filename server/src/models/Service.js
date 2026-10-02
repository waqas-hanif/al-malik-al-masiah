const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleAr: { type: String, required: true },
  descriptionEn: { type: String },
  descriptionAr: { type: String },
  images: [{ type: String }],
  features: [{ type: String }],
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);