const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the client who posted the job
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
        // required: true,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
      min: 1,
    },
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    experienceLevel: {
      type: String,
      enum: ["Entry", "Intermediate", "Expert", "All"],
      required: true,
    },
    duration: {
      type: String,
      enum: ["less than 1 month", "1-3 months", "3-6 months"],
      required: true,
    },
    hires: {
      type: Number,
      required: true,
    },
    proposalsToReview: {
      type: Number,
      required: true,
    },
    hired: [
      {
        freelancer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Assigned freelancer (if hired)
        },
        hiredOn: {
          type: Date,
          required: true,
          default: Date.now,
        }
      },
    ],
    messaged: [
      {
        freelancer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Assigned freelancer (if messaged)
        },
        status: { type: Boolean, default: false },
      },
    ],
    proposals: [
      {
        // proposal: {
          freelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          submittedOn: {
            type: Date,
            required: true,
            default: Date.now
          },
          coverLetter: {
            type: String,
            required: true,
          },
          duration: {
            type: String,
            required: true,
          },
          bidAmount: {
            type: String,
            required: true,
          },
          platformFee: {
            type: String,
            required: true,
          },
          payment: {
            type: String,
            enum: ["On completion", "Milestone"],
          },
          milestone: [
            {
              description: String,
              amount: {
                type: Number,
                min: 1,
              },
            },
          ],
        // },
      },
    ],
    status: {
      type: String,
      enum: ["Open", "In progress", "Completed"],
      default: "Open",
    },
    payment: {
      funded: { type: Boolean, default: false }, // Whether client funded escrow
      transactionId: { type: String, default: null }, // Payment reference ID (if escrow is used)
      status: {
        type: String,
        enum: ["Pending", "Verified"], //or pending for Pending
        default: "Pending",
      },
    },
    saved: {
      type: Boolean,
      default: false,
    },
    platformFee: {
    type: String,
    required: true
   }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
