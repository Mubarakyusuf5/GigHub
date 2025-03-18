const express = require("express");
const { 
  createReview,  
  updateReview, 
  getFreelancerReviews,
  getClientReviews,
  deleteReviewByClient
} = require("../controllers/reviewController");

const router = express.Router();

router.post("/createReview", createReview);       // Create a review
router.get("/reviews/:id", getFreelancerReviews);
router.get("/clientReviews", getClientReviews);
router.put("/updateReview/:id", updateReview);     // Update a review
router.delete("/deleteReview/:id", deleteReviewByClient);  // Delete a review

module.exports = router;
