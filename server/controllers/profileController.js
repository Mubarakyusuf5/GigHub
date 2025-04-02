const { Freelancer, Client } = require("../models/KYC");
const Users = require("../models/userModel");
const fs = require("fs");

// Create a new freelancer profile (Only one per user)
const createFreelancer = async (req, res) => {
  const userId = req.user?.id;
  try {
    const {
      accountName,
      accountNumber,
      bankName,
      title,
      skills,
      bio,
      state,
      experienceLevel,
      portfolio,
      github,
      linkedin,
    } = req.body;
    const existingFreelancer = await Freelancer.findOne({ user: userId });
    if (existingFreelancer) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    // Validate required fields before handling file
    if (
      !accountName ||
      !accountNumber ||
      !bankName ||
      !title ||
      !skills ||
      !bio ||
      !state ||
      !experienceLevel
    ) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      return res.status(400).json({ message: "Missing required fields" });
    }

    await Users.findByIdAndUpdate(userId, { hasProfile: true });

    const profilePicture = req.file ? req.file.path.replace(/\\/g, "/") : "";
console.log(profilePicture)
    console.log(req.body);
    console.log(req.file);

    const request = {
      user: userId,
      title,
      skills,
      bio,
      state,
      experienceLevel,
      portfolio,
      github,
      linkedin,
      profilePicture,
      bankDetails: {
        bankName,
        accountName,
        accountNumber,
      },
    };
    const freelancer = await Freelancer.create(request);
    res
      .status(201)
      .json({ message: "Profile created successfully", freelancer });
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    res.status(400).json({ message: "Error creating profile", error });
  }
};

// Get a freelancer
const displayFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.find({user: req.user.id}).populate({
      path: "user",
    });
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.status(200).json({ freelancer });
  } catch (error) {
    res.status(500).json({ message: "Error displaying profile", error });
    console.log(error)
  }
};

// Get a freelancer by ID
const displayFreelancerById = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id).populate({
      path: "User",
    });
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.status(200).json({ freelancer });
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    res.status(500).json({ message: "Error displaying profile", error });
  }
};

// Update a freelancer profile
const updateFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.json({ message: "Profile updated successfully", freelancer });
  } catch (error) {
    res.status(400).json({ message: "Error updating profile", error });
  }
};

// Delete a freelancer profile
const deleteFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findByIdAndDelete(req.params.id);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
};

// Create a new client profile (Only one per user)
const createClient = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      accountName,
      accountNumber,
      bankName,
      companyName,
      industry,
      phoneNumber,
      email,
      state,
      buisnessType,
      website,
    } = req.body;

    const existingClient = await Client.findOne({ user: userId });
    if (existingClient) {
      return res.status(400).json({ message: "Profile already exists" });
    }
    // Ensure profilePicture is saved if a file was uploaded
    // const profilePicture = req.file ? req.file.path : "";

    // console.log(req.body);
    // console.log(req.file);
    const request = {
      user: userId,
      buisnessType,
      companyName,
      industry,
      email,
      phoneNumber,
      website,
      state,
      bankDetails: {
        bankName,
        accountName,
        accountNumber,
      },
    };
    await Users.findByIdAndUpdate(userId, { hasProfile: true });

    const newClient = await Client.create(request);
    res
      .status(201)
      .json({ message: "Profile created successfully", newClient });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error creating profile", error });
  }
};

const displayClient = async (req, res) => {
  try {
    const client = await Client.find({user: req.user.id}).populate({
      path: "user",
    });
    if (!client) {
      return res.status(404).json({ message: "client not found" });
    }
    res.status(200).json({ client });
  } catch (error) {
    res.status(500).json({ message: "Error displaying profile", error });
    console.log(error)
  }
};

// Get a client by ID
const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate({
      path: "user",
    });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ client });
  } catch (error) {
    res.status(500).json({ message: "Error displaying profile", error });
  }
};

// Update a client profile
const updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client profile updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error updating profile", error });
  }
};

// Delete a client profile
const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting profile", error });
  }
};

const hasProfile = async (req, res) => {
  try {
    // Ensure the user is authenticated and has a valid ID
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID is missing." });
    }

    // Verify user existence
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    
    res.status(200).json({
      success: true,
      hasProfile: user.hasProfile || false, // Ensure boolean response
    });

  } catch (error) {
    console.error("Error in hasProfile function:", error);
    res.status(500).json({ message: "Internal server error during profile verification." });
  }
};


module.exports = {
  createFreelancer,
  displayFreelancerById,
  displayFreelancer,
  updateFreelancer,
  deleteFreelancer,
  createClient,
  displayClient,
  getClient,
  updateClient,
  deleteClient,
  hasProfile,
};
