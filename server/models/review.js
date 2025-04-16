//   review: {
// client object id
// freelancer  id
// job id
//     rating: { type: Number, min: 1, max: 5, default: null },
//     feedback: { type: String, trim: true, default: null },
//   },
const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    // freelancer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    review: [
      {
        client: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: { type: Number, min: 1, max: 5, required: true },
        feedback: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Review", ReviewSchema);
