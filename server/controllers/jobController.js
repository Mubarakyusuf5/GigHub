const Job = require("../models/jobPosting");

// Create a new job (Client only)
exports.createJob = async (req, res) => {
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
      requirements,
      skills,
    } = req.body;
    // console.log(req.user)


    const newJob = await Job.create({
      client: "67b4c474bffa981502693743", // Authenticated client
      title,
      budget,
      duration,
      experienceLevel,
      proposalsToReview,
      hires,
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
    const jobs = await Job.find()//.populate("client", "name")
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching jobs", error: error.message });
  }
};

// Get all jobs for client each (private)
exports.displayJobsClient = async (req, res) => {
  try {
    const jobs = await Job.find()//.populate("client", "name")
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
    const job = await Job.findById(req.params.id)

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

    // Validate freelancerId
    if (!freelancer) {
      return res.status(400).json({ message: "Freelancer ID is required" });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Use $addToSet to prevent duplicates and ensure atomic update
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { hired: freelancer } }, 
      { new: true }
    );

    res.status(200).json({ message: "Freelancer hired successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Error hiring freelancer", error: error.message });
  }
};

// Submission of proposals (Client only)
exports.submitProposal = async (req, res) => {
  try {
    const { freelancer, coverLetter, duration, bidAmount, payment, milestone } = req.body;

    if (!freelancer) {
      return res.status(400).json({ message: "Freelancer ID is required" });
    }

    // Find the job
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
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


