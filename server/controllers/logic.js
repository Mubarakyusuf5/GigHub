const Client = require("../models/Client");
const multer = require("multer");
const path = require("path");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File Upload Middleware
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) return cb(null, true);
    cb(new Error("Only JPEG, JPG, and PNG images are allowed"));
  },
});

// Create a new client profile (Only one per user)
const createClient = async (req, res) => {
  try {
    const existingClient = await Client.findOne({ userId: req.body.userId });
    if (existingClient) {
      return res.status(400).json({ message: "Client profile already exists" });
    }

    // Ensure profilePicture is saved if a file was uploaded
    const profilePicture = req.file ? req.file.path : "";

    const client = await Client.create({ ...req.body, profilePicture });
    res.status(201).json({ message: "Client profile created successfully", data: client });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a client by ID
const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client retrieved successfully", data: client });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a client profile
const updateClient = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // If a new profile picture is uploaded, update the field
    if (req.file) {
      updateData.profilePicture = req.file.path;
    }

    const client = await Client.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client profile updated successfully", data: client });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a client profile
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  upload, // Export multer middleware
  createClient,
  getClient,
  updateClient,
  deleteClient,
};


// const express = require("express");
// const { upload, createClient, getClient, updateClient, deleteClient } = require("../controllers/clientController");

// const router = express.Router();

// router.post("/", upload.single("profilePicture"), createClient);
// router.get("/:id", getClient);
// router.put("/:id", upload.single("profilePicture"), updateClient);
// router.delete("/:id", deleteClient);

// module.exports = router;
