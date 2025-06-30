import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

export const ApiKey = mongoose.model("ApiKey", apiKeySchema);