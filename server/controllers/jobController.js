const Job = require("../models/jobPosting");

// Create a new job (Client only)
exports.createJob = async (req, res) => {
  const userId = req.user.id
  try {
    const {
      title,
      budget,
      duration,
      experienceLevel,
      proposalsToReview,
      hires,
      category,
      description,
      platformFee,
      totalAmount,
      requirements,
      skills,
    } = req.body;
    // console.log(req.user)


    const newJob = await Job.create({
      client: userId, // Authenticated client
      title,
      budget,
      duration,
      experienceLevel,
      proposalsToReview,
      hires,
      platformFee,
      totalAmount,
      category,
      description,
      requirements,
      skills,
    });

    res.status(201).json({ message: "Job created successfully", newJob });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating job", error: error.message });
  }
};

// Get all jobs (Public)
exports.displayJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate({ path: "client" }) // Fetch name and email
    .populate({ path: "hired.freelancer" }) // Fetch name and profile picture
    .populate({ path: "proposals.freelancer"});
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: error.message });
  }
};

// exports.displayJobsBySkill = async (req, res) => {
//   try {
//     const jobs = await Job.find().populate({ path: "client" }) // Fetch name and email
//     .populate({ path: "hired.freelancer" }) // Fetch name and profile picture
//     .populate({ path: "proposals.freelancer"});
//     res.status(200).json(jobs);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching jobs", error: error.message });
//   }
// };

// Get all jobs for client each (private)
exports.displayJobsClient = async (req, res) => {
  try {
    const jobs = await Job.find({client: req.user.id}).populate({ path: "client" }) // Fetch name and email
    .populate({ path: "hired.freelancer" }) // Fetch name and profile picture
    .populate({ path: "proposals.freelancer"});
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: error.message });
  }
};
 
// Get a single job by ID (Public)
exports.displayJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate({ path: "client" }) // Fetch name and email
    .populate({ path: "hired.freelancer" }) // Fetch name and profile picture
    .populate({ path: "proposals.freelancer"});

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching job", error: error.message });
  }
};

// Update job (Client only)
exports.updateJob = async (req, res) => {
  try {
    const { title, description, budget, level, category } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Job updated successfully", updatedJob });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating job", error: error.message });
  }
};

// Delete job (Client only)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting job", error: error.message });
  }
};

// Assign a freelancer (Client only)
exports.hireFreelancer = async (req, res) => {
  try {
    const { freelancer } = req.body;
// console.log(freelancer)
    // Validate freelancerId
    if (!freelancer) {
      return res.status(400).json({ message: "Freelancer ID is required" });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
// if hired an email will be sent 
    // Use $addToSet to prevent duplicates and ensure atomic update
    const hiredJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $push: { hired: {freelancer} } }, 
      { new: true }
    );

    res.status(200).json({ message: "Freelancer hired successfully", job: hiredJob });
  } catch (error) {
    res.status(500).json({ message: "Error hiring freelancer", error});
    console.log(error)
  }
};

exports.unHiredFreelancer = async (req, res) => {
  try {
    const { freelancer } = req.body;

    // Validate freelancerId
    if (!freelancer) {
      return res.status(400).json({ message: "Freelancer ID is required" });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
// if unhired an email will be sent
    // Remove the freelancer from the hired list
    const unHireJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $pull: { hired: freelancer } }, // Correct removal operation
      { new: true } // Returns updated job document
    );

    res.status(200).json({ message: "Freelancer removed successfully", job: unHireJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing freelancer", error });
  }
};


// Submission of proposals (Client only)
exports.submitProposal = async (req, res) => {
  try {
    const { coverLetter, duration, platformFee, bidAmount, payment, milestone } = req.body;
    const freelancer = req.user?.id
    if (!freelancer) {
      return res.status(400).json({ message: "Freelancer ID is required" });
    }
// if proposal is submitted an email will be sent to client
    // Find the job
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // proposal submitted should'nt go above proposals to review
    if(job.proposals.length > job.proposalsToReview){
      return res.status(400).json({ message: "Proposal submission have been maxed out" });
    }

    if(bidAmount > job.budget){
      return res.status(400).json({ message: "Bid amount cannot go above client budget" });
    }

    // Check if the freelancer has already submitted a proposal for this job
    const existingProposal = job.proposals.find(
      (p) => p.freelancer.toString() === freelancer.toString()
    );
    if (existingProposal) {
      return res.status(400).json({ message: "You have already submitted a proposal for this job" });
    }
    // Construct the proposal object
    const newProposal = {
      freelancer,
      coverLetter,
      duration,
      bidAmount,
      payment,
      platformFee,
      milestone,
    };

    // Add the new proposal
    await Job.findByIdAndUpdate(
      req.params.id,
      { $push: { proposals: newProposal } }, // Use `$push` instead of `$addToSet`
      { new: true }
    );

    res.status(200).json({ message: "Proposal submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting proposal", error: error.message });
  }
};


