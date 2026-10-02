import mongoose from "mongoose";

const assistantLogSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: [true, "Session ID is required"],
      trim: true,
      maxlength: [150, "Session ID is too long"],
      index: true,
    },

    language: {
      type: String,
      enum: ["en", "ar"],
      default: "en",
      index: true,
    },

    userMessage: {
      type: String,
      required: [true, "User message is required"],
      trim: true,
      minlength: [1, "User message cannot be empty"],
      maxlength: [1500, "User message cannot exceed 1500 characters"],
    },

    assistantMessage: {
      type: String,
      required: [true, "Assistant message is required"],
      trim: true,
      minlength: [1, "Assistant message cannot be empty"],
      maxlength: [3000, "Assistant message cannot exceed 3000 characters"],
    },

    source: {
      type: String,
      enum: ["website", "admin"],
      default: "website",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const AssistantLog = mongoose.model(
  "AssistantLog",
  assistantLogSchema
);

export default AssistantLog;