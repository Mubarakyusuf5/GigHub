// cover letter stating y u are best for the job
// bidding price
// duration less than 1month, 1 to 3month, or above 3month
// payment on completion or milestone
// frelancer
// refernce in job

const mongoose = require("mongoose");

const ProposalSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    proposal: {
        freelancer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        coverLetter: {
          type: String,
          required: true,
        },
        duration: {
          type: String,
          required: true,
        },
        bidPrice: {
          type: String,
          required: true,
        },
        payment: {
            type: String,
            enum: ["On completion", "Milestone"]
        },
        milestone: [
            {
                description: String,
                amount: {
                    type: Number,
                    min: 1
                }
            }
        ]
      },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Proposal", ProposalSchema);
