const express = require("express");
const router = express.Router();
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");
const {
  createFreelancer,
  getFreelancer,
  updateFreelancer,
  deleteFreelancer,
  createClient,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/KYCController");


// router.get("/hasDetail", VerifyToken, authorizeRoles("Admin","Vendor"),hasDetail);
// Freelancer routes
router.post("/createFrlncrKYC", createFreelancer);
router.get("/displayFrlncrKYC/:id", getFreelancer);
router.put("/updateFrlncrKYC/:id", updateFreelancer);
router.delete("/deleteFrlncrKYC/:id", deleteFreelancer);

// Client routes
router.post("/createClientsKYC", createClient);
router.get("/displayClientsKYC/:id", getClient);
router.put("/updateClientsKYC/:id", updateClient);
router.delete("/deleteClientsKYC/:id", deleteClient);

module.exports = router;


