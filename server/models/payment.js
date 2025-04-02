const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  reference: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Paid", "Pending", "Failed"],
    default: "Pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
