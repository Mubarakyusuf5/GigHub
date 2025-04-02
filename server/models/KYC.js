const mongoose = require("mongoose");

const FreelancerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // instead of using user schema, i will this model to get user details
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
    profilePicture: { type: String, required: true }, // Cloud storage URL
    // hasProfile: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Freelancer = mongoose.model("FreelancerProfile", FreelancerSchema);

const ClientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // if not referenced in user model, add the user fields here
    companyName: { type: String },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    buisnessType: {
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
    profilePicture: { type: String, default:"/placeholder.svg" }, // Cloud storage URL
    // hasProfile: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("ClientProfile", ClientSchema);

module.exports = { Freelancer, Client };
