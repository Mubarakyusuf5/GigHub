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
  hasProfile,
  displayFreelancerById,
  displayClient,
} = require("../controllers/profileController.js");
const { upload } = require("../middlewares/multerUpload.js");


router.get("/hasProfile", 
  VerifyToken, authorizeRoles("Freelancer","Client"),
hasProfile);
// Freelancer routes
router.post("/createFrlncrProfile", upload.single("profilePicture"), 
VerifyToken, authorizeRoles("Admin", "Freelancer"), 
createFreelancer);
router.get("/displayFrlncrProfile", 
  VerifyToken, authorizeRoles("Admin", "Freelancer"),
  displayFreelancer);
router.get("/displayFrlncrProfileById/:id", 
  VerifyToken, authorizeRoles("Admin", "Freelancer"),
  displayFreelancerById);
router.put("/updateFrlncrProfile/:id", 
  VerifyToken, authorizeRoles("Admin", "Freelancer"),
  updateFreelancer);
router.delete("/deleteFrlncrProfile/:id", 
  VerifyToken, authorizeRoles("Admin", "Freelancer"),
  deleteFreelancer);

// Client routes
router.post("/createClientProfile", 
  VerifyToken, authorizeRoles("Admin", "Client"), 
  createClient);
  router.get("/displayClientProfile", 
    VerifyToken, authorizeRoles("Admin", "Client"),
    displayClient);
router.get("/displayClientProfileById/:id", 
  VerifyToken, authorizeRoles("Admin", "Client"), 
  getClient);
router.put("/updateClientProfile/:id", 
  VerifyToken, authorizeRoles("Admin", "Client"), 
  updateClient);
router.delete("/deleteClientProfile/:id", 
  VerifyToken, authorizeRoles("Admin", "Client"), 
  deleteClient);

module.exports = router;


