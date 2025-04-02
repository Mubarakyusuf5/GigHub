const express = require("express");
const { 
  createReview,  
  updateReview, 
  getFreelancerReviews,
  getClientReviews,
  deleteReviewByClient
} = require("../controllers/reviewController");

const router = express.Router();
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");

router.post("/createReview", 
  VerifyToken, authorizeRoles("Client"), 
  createReview);       // Create a review
router.get("/reviews/:id", 
  VerifyToken, authorizeRoles("Client"), 
  getFreelancerReviews);
router.get("/clientReviews", 
  VerifyToken, authorizeRoles("Client"), 
  getClientReviews);
router.put("/updateReview/:id", 
  VerifyToken, authorizeRoles("Client"), 
  updateReview);     // Update a review
router.delete("/deleteReview/:id", 
  VerifyToken, authorizeRoles("Client"), 
  deleteReviewByClient);  // Delete a review

module.exports = router;
