const express = require("express");
const {
  createJob,
  displayJobs,
  displayJobById,
  updateJob,
  deleteJob,
  hireFreelancer,
  displayJobsClient,
  submitProposal,
  unHiredFreelancer,
} = require("../controllers/jobController");

const router = express.Router();
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");

router.get("/displayJobs", 
  VerifyToken, authorizeRoles("Client", "Freelancer"), 
  displayJobs);
router.get("/displayJobsClient", 
  VerifyToken, authorizeRoles("Client", "Freelancer"), 
  displayJobsClient);
router.get("/displayJobById/:id", 
  VerifyToken, authorizeRoles("Client", "Freelancer"), 
  displayJobById);
router.post("/createJobs", 
  VerifyToken, authorizeRoles("Client"), 
  createJob);
router.put("/updateJob/:id", 
  VerifyToken, authorizeRoles("Client"), 
  updateJob);
router.delete("/deletejob/:id", 
  VerifyToken, authorizeRoles("Client"), 
  deleteJob);
router.post("/hireFreelancer/:id", 
  VerifyToken, authorizeRoles("Client"), 
  hireFreelancer);
router.post("/unHireFreelancer/:id", 
  VerifyToken, authorizeRoles("Client"), 
  unHiredFreelancer);
router.post("/submitProposal/:id", 
  VerifyToken, authorizeRoles("Client", "Freelancer"), 
  submitProposal);

module.exports = router;
