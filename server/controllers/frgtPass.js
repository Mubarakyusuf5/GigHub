const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const { sendEmail } = require("../middlewares/emailService");
const { hashPassword, comparePassword } = require("../middlewares/hash");
const { createToken } = require("../middlewares/jwt");

// forgot password logic
const frgtPass = async (req, res) => {
  const { email } = req.body
  // console.log("Forget Password API Hit"); // Debugging
  // console.log("Request Body:", req.body); // Debugging

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  // if (user.resetToken && Date.now() < user.resetTokenExpires) {
  //   return res
  //     .status(400)
  //     .json({ message: "Reset link already sent. Try again later." });
  // }

  const { resetToken } = createToken(user);

  // Hash the reset token before saving
  const hashedToken = await hashPassword(resetToken);

  user.resetToken = hashedToken;
  user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry
  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  // const emailTemplate = `
  //   <div style="font-family: Arial, sans-serif;">
  //     <h2>Password Reset</h2>
  //     <p>Click the link below to reset your password:</p>
  //     <a href="${resetLink}" style="padding: 10px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">
  //       Reset Password
  //     </a>
  //     <p>This link is valid for 15 minutes.</p>
  //   </div>
  // `;

  // Load and compile email template
  const templatePath = path.join(__dirname, "../templates/reset-password-template.html");
  const source = fs.readFileSync(templatePath, "utf-8");
  const template = handlebars.compile(source);
  const emailTemplate = template({ resetLink });

  try {
    await sendEmail(email, "Reset Your Password", emailTemplate);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send reset email" });
  }
};

// reset password logic
const resetPass = async (req, res) => {
  const { newPassword } = req.body;
  const userId = req.user.id;
  console.log("Reset hit", userId, newPassword);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure the reset token exists and is not expired
    if (!user.resetToken || user.resetTokenExpires < Date.now()) {
      return res
        .status(400)
        .json({ message: "Reset token expired or invalid" });
    }
    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's password and clear reset token fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword, resetToken: null, resetTokenExpires: null },
      { new: true }
    );

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reset password" });
  }
};


// const checkToken = async (req, res) => {
//   const { token } = req.params;
//   const userId = req.user.id;
//   console.log("Reset hit", userId, token);
//   console.log("Request received");
  
//   try {

//     if (!token) {
//       return res.status(400).json({ message: "Token is required" });
//     }
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Ensure the reset token exists and is not expired
//     if (!user.resetToken || user.resetTokenExpires < Date.now()) {
//       return res.status(400).json({ message: "Reset token expired or invalid" });
//     }

//     // Compare hashed token
//     const isValidToken = await comparePassword(token, user.resetToken);
//     if (!isValidToken) {
//       return res.status(400).json({ message: "Invalid reset token" });
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


const checkToken = async (req, res) => {
  const { token } = req.params;

  console.log("Reset hit", token);
  console.log("Request received");

  try {
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Find user by token (we hash the incoming token and compare)
    const users = await User.find({ resetTokenExpires: { $gt: Date.now() } });

    // Check if any user's token matches the hashed token
    const user = users.find((u) => comparePassword(token, u.resetToken));

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// checkToken()

module.exports = { frgtPass, resetPass, checkToken };
