const mongoose = require("mongoose");

const FreelancerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // if not referenced in user model, add the user fields here
    title: { type: String, required: true }, // e.g. Full-stack Developer
    bio: { type: String, required: true },
    skills: [{ type: String, required: true }],
    state: { type: String, required: true },
    experienceLevel: {
      type: String,
      enum: ["Entry", "Intermediate", "Expert"],
      required: true,
    },
    // workCategory: { type: String, required: true }, // can user have multiple work categories
    portfolioLinks: { type: String },
    github: { type: String },
    linkedin: { type: String },
    website: { type: String },
    bankDetails: {
      bankName: { type: String, required: true },
      accountName: { type: String, required: true },
      accountNumber: { type: String, required: true },
    },
    profilePicture: { type: String, default: "", required: true }, // Cloud storage URL
    kycVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const FrlcrKYC = mongoose.model("FreelancerKYC", FreelancerSchema);

const ClientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // if not referenced in user model, add the user fields here
    companyName: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    businessType: {
      type: String,
      enum: ["Individual", "Company"],
      required: true,
    },
    industry: { type: String, required: true },
    website: { type: String },
    bankDetails: {
      // incase of disputes
      bankName: { type: String, required: true },
      accountName: { type: String, required: true },
      accountNumber: { type: String, required: true },
    },
    profilePicture: { type: String, default: "", required: true }, // Cloud storage URL
    kycVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const ClientKYC = mongoose.model("ClientKYC", ClientSchema);

module.exports = { FrlcrKYC, ClientKYC };
