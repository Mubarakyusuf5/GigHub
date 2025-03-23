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
} = require("../controllers/jobController");

const router = express.Router();

router.get("/displayJobs", displayJobs);
router.get("/displayJobsClient", displayJobsClient);
router.get("/displayJobById/:id", displayJobById);
router.post("/createJobs", createJob);
router.put("/updateJob/:id", updateJob);
router.delete("/deletejob/:id", deleteJob);
router.post("/hireFreelancer/:id", hireFreelancer);
router.post("/submitProposal/:id", submitProposal);

module.exports = router;
