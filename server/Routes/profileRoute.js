const express = require("express");
const router = express.Router();
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");
const {
  createFreelancer,
  displayFreelancer,
  updateFreelancer,
  deleteFreelancer,
  createClient,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/profileController.js");


// router.get("/hasDetail", VerifyToken, authorizeRoles("Admin","Vendor"),hasDetail);
// Freelancer routes
router.post("/createFrlncrProfile", createFreelancer);
router.get("/displayFrlncrProfile/:id", displayFreelancer);
router.put("/updateFrlncrProfile/:id", updateFreelancer);
router.delete("/deleteFrlncrProfile/:id", deleteFreelancer);

// Client routes
router.post("/createClientProfile", createClient);
router.get("/displayClientProfile/:id", getClient);
router.put("/updateClientProfile/:id", updateClient);
router.delete("/deleteClientProfile/:id", deleteClient);

module.exports = router;


