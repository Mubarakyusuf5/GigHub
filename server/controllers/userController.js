const Users = require("../models/userModel.js");
const { hashPassword, comparePassword } = require("../middlewares/hash.js");
// const vendorDetailModel = require("../models/vendorDetailModel.js");
const bcrypt = require("bcryptjs");
const { Freelancer, Client } = require("../models/KYC.js");

const displayUser = async (req, res) => {
  try {
    const User = await Users.find({});
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: "Error displaying Users", error });
  }
};

const updateUserAdmin = async (req, res) => {
  try {
    const { fullname, role, email, status } = req.body;
    const userId = req.params.id;

    // Validate input data
    if (!fullname || !role || !email || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedData = { fullname, role, email, status };

    const updatedUser = await Users.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { fullname, email} = req.body;
    const userId = req.params.id;

    // Validate input data
    if (!fullname || !email) {
      return res.status(400).json({ message: "Fullname and email are required" });
    }

    // Find user by ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedData = { fullname, email };

    const updatedUser = await Users.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Personal details updated successfully" });
  } catch (error) {
    console.error("Error updating personal details:", error);
    res.status(500).json({ message: "Error updating personal details" });
  }
};


const updatePasswordAdmin = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.params.id;

    // Validate input data
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find user by ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //hash updated password
    const hashed = await hashPassword(password);

    const updatedUserPassword = await Users.findByIdAndUpdate(userId, hashed, {
      new: true,
    });
    // console.log(updatedUserPassword)
    if (!updatedUserPassword) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User password updated successfully" });
  } catch (error) {
    console.error("Error updating user password:", error);
    res.status(500).json({ message: "Error updating user password" });
  }
};

const updatePasswordUser = async (req, res) => {
  try {
    const { password, cPassword } = req.body;
    const userId = req.params.id;

    if (!cPassword) {
      return res.status(400).json({ message: "Current password is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find user by ID
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //compare current with user password
    const matchPassword = comparePassword(cPassword, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    //hash new password
    const hashed = await hashPassword(password);

    const updatedPassword = await Users.findByIdAndUpdate(userId, hashed, {
      new: true,
    });
    // console.log(updatedPassword)
    if (!updatedPassword) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User password updated successfully" });
  } catch (error) {
    console.error("Error updating user password:", error);
    res.status(500).json({ message: "Error updating user password" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "Freelancer") {
      await Freelancer.findOneAndDelete({ user: req.params.id });
    } else if (user.role === "Client") {
      await Client.findOneAndDelete({ user: req.params.id });
    }

    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("delete user", error);
    res.status(500).json({ message: "Error deleting User", error });
  }
};

module.exports = {
  displayUser,
  updateUserAdmin,
  updateUserDetails,
  updatePasswordAdmin,
  updatePasswordUser,
  deleteUser,
};
