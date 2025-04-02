const Users = require("../models/userModel.js");
// const VendorDetail = require("../models/vendorDetailModel.js")
const {
    hashPassword,
    comparePassword,
  } = require("../middlewares/hash.js");
// const vendorDetailModel = require("../models/vendorDetailModel.js");
const bcrypt = require("bcryptjs");
const { Freelancer, Client } = require("../models/KYC.js");

const displayUser = async (req, res)=>{
    try {
        const User = await Users.find({})
        res.status(200).json(User)
    } catch (error) {
        res.status(500).json({message: "Error displaying Users", error})
    }
}

const updateUser = async (req, res) => {
  try {
    const { fullname, role, email, status } = req.body;
    const userId = req.params.id;

    // Validate input data
    if (!fullname || !role || !email || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find user by ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Debugging: Log the existing user data
    console.log("Existing user:", user);

    // Prepare updated data
    const updatedData = { fullname, role, email, status };

    // Update password only if it's provided and different from the existing one
    if (password) {
      // Debugging: Log the plaintext and hashed passwords
      console.log("Plaintext new password:", password);
      console.log("Hashed existing password:", user.password);

      // Compare plaintext new password with existing hashed password
      const isSamePassword = await bcrypt.compare(password, user.password);
      console.log("Password comparison result:", isSamePassword);

      if (!isSamePassword) {
        // Hash and update password only if different
        updatedData.password = await bcrypt.hash(password, 10);
        console.log("New hashed password:", updatedData.password);
      } else {
        // If the password is the same, explicitly remove it from updatedData
        delete updatedData.password;
        console.log("Password is the same, not updating.");
      }
    }

    // Debugging: Log the final updatedData
    console.log("Final updatedData:", updatedData);

    // Update the user
    const updatedUser = await Users.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Omit sensitive data (e.g., password) from the response
    const userResponse = { ...updatedUser.toObject(), password: undefined };

    res.status(200).json({ message: "User updated successfully", updatedUser: userResponse });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "An error occurred while updating the user" });
  }
};



const deleteUser = async (req, res)=>{
    try {
      const user = await Users.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if(user.role === "Freelancer"){
        await Freelancer.findOneAndDelete({ user: req.params.id });
      }else if(user.role === "Client"){
        await Client.findOneAndDelete({ user: req.params.id });
      }
      
      await Users.findByIdAndDelete(req.params.id)

          res.status(200).json({message: "User deleted successfully"})
        } catch (error) {
          console.log(error)
        res.status(500).json({message: "Error deleting User", error})
    }
}


module.exports = {
    displayUser,
    updateUser,
    deleteUser,
  };