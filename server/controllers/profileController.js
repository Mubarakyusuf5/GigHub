const { Freelancer, Client } = require("../models/KYC");


// Create a new freelancer profile (Only one per user)
const createFreelancer = async (req, res) => {
  try {
    const existingFreelancer = await Freelancer.findOne({ user: req.user.id });
    if (existingFreelancer) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const freelancer = await Freelancer.create(req.body);
    res.status(201).json({ message: "Profile created successfully" , freelancer });
  } catch (error) {
    res.status(400).json({ message: "Error creating profile", error });
  }
};

// Get a freelancer by ID
const displayFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id).populate({path: "User"});
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.status(200).json({freelancer });
  } catch (error) {
    res.status(500).json({ message: "Error displaying profile", error });
  }
};

// Update a freelancer profile
const updateFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.json({ message: "Profile updated successfully", freelancer });
  } catch (error) {
    res.status(400).json({ message: "Error updating profile",error });
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
    res.status(500).json({ message: "Error deleting profile",error });
  }
};


// Create a new client profile (Only one per user)
const createClient = async (req, res) => {
  try {
    const existingClient = await Client.findOne({ user: req.user.id });
    if (existingClient) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const newClient = await Client.create(req.body);
    res.status(201).json({ message: "Profile created successfully", newClient });
  } catch (error) {
    res.status(400).json({ message: "Error creating profile", error });
  }
};

// Get a client by ID
const getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate({path: "user"});
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
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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



module.exports = {
  createFreelancer,
  displayFreelancer,
  updateFreelancer,
  deleteFreelancer,
  createClient,
  getClient,
  updateClient,
  deleteClient,
};
