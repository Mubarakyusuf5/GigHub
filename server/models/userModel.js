const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Freelancer", "Client"],
    },
    monnifyAccount: {
      bankName: String,
      accountNumber: String,
      accountReference: String,
    },
    resetToken: { type: String, expires: 900 }, // Token for password reset
    resetTokenExpires: { type: Date }, // Expiry date for reset token
    status: {
      type: String,
      enum: ["Active", "Suspended", "Blocked"],
      default: "Active",
    },
    hasProfile: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
