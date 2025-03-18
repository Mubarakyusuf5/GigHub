// for client(5%) and freelsncer(10%)
const mongoose = require("mongoose");

const ServiceFeeSchema = mongoose.Schema(
  {
    freelancer: {
      type: Number, //percentage 10
      required: true,
      trim: true
    },
    client: {
      type: Number, //percentage 5
      required: true,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);
const ServiceFees = mongoose.model("ServiceFee", ServiceFeeSchema);

mongoose.exports = ServiceFees