import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [150, "Email cannot exceed 150 characters"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: [30, "Phone number cannot exceed 30 characters"],
    },

    company: {
      type: String,
      trim: true,
      maxlength: [150, "Company name cannot exceed 150 characters"],
    },

    projectType: {
      type: String,
      required: [true, "Project type is required"],
      trim: true,
      maxlength: [100, "Project type cannot exceed 100 characters"],
    },

    projectLocation: {
      type: String,
      required: [true, "Project location is required"],
      trim: true,
      maxlength: [200, "Project location cannot exceed 200 characters"],
    },

    budget: {
      type: String,
      trim: true,
      maxlength: [100, "Budget cannot exceed 100 characters"],
    },

    expectedStartDate: {
      type: Date,
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },

    language: {
      type: String,
      enum: ["en", "ar"],
      default: "en",
    },

    status: {
      type: String,
      enum: [
        "new",
        "reviewing",
        "quoted",
        "approved",
        "rejected",
        "closed",
      ],
      default: "new",
      index: true,
    },

    source: {
      type: String,
      enum: ["website", "whatsapp", "other"],
      default: "website",
    },
  },
  {
    timestamps: true,
  }
);

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;