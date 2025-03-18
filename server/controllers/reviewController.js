const Review = require("../models/review");

exports.createReview = async (req, res) => {
  try {
    const { freelancer, review } = req.body;

    // Validate required fields
    if (!freelancer || !review?.rating || !review?.feedback) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //   // Validate rating range (assuming a 1-5 rating scale)
    //   if (review.rating < 1 || review.rating > 5) {
    //     return res.status(400).json({ message: "Rating must be between 1 and 5" });
    //   }

    // Check if a review document exists for this freelancer
    let existingReview = await Review.findOne({ freelancer });

    if (existingReview) {
      // Optional: Prevent duplicate reviews from the same client
      
      const alreadyReviewed = existingReview.review.find(
        (r) => r.client.toString() === req.user.id
      );

      if (alreadyReviewed) {
        return res
          .status(400)
          .json({ message: "You have already reviewed this freelancer" });
      }

      // Append new review to existing freelancer reviews
      existingReview.review.push({
        client: req.user.id,
        rating: review.rating,
        feedback: review.feedback,
      });

      await existingReview.save();
      return res
        .status(200)
        .json({ message: "Review submitted successfully", existingReview });
    } else {
      // Create a new review document for the freelancer
      const newReview = await Review.create({
        freelancer,
        review: [
          {
            client: req.user.id,
            rating: review.rating,
            feedback: review.feedback,
          },
        ],
      });

      return res
        .status(201)
        .json({ message: "Review submitted successfully", newReview });
    }
  } catch (error) {
    console.error("Error submitting review:", error);
    res
      .status(500)
      .json({ message: "Error submitting review", error: error.message });
  }
};

exports.getFreelancerReviews = async (req, res) => {
    try {
  
      // Find reviews for the given freelancer
      const freelancerReviews = await Review.findOne({ freelancer: req.params.id })
        .populate("review.client", "name email") // Optional: Populate client details
        // .select("review"); // Only return the review array
  
      if (!freelancerReviews) {
        return res.status(404).json({ message: "No reviews found for this freelancer" });
      }
  
      res.status(200).json({ reviews: freelancerReviews.review });
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Error displaying reviews", error: error.message });
    }
  };

  exports.getClientReviews = async (req, res) => {
    try {
      // Find all reviews where the client has submitted a review
      const clientReviews = await Review.find({
        "review.client": req.user.id, // Search for client's ID inside the review array
      })
        .populate("freelancer", "name email") // Optional: Show freelancer details
        .select("freelancer review"); // Select only relevant fields
  
      if (!clientReviews.length) {
        return res.status(404).json({ message: "No reviews found for this client" });
      }
  
      res.status(200).json({ reviews: clientReviews });
    } catch (error) {
      console.error("Error fetching client reviews:", error);
      res.status(500).json({ message: "Error displaying reviews", error: error.message });
    }
  };
  
  
// exports.updateReview = async (req, res) => {
//     try {
//       const { freelancer, review } = req.body;
  
//         // Validate required fields
//       if (!freelancer || !review?.rating || !review?.feedback) {
//         return res.status(400).json({ message: "All fields are required" });
//       }
  

  
//       // Find existing review document for the freelancer
//       let existingReview = await Review.findOne({ freelancer });
  
//       if (!existingReview) {
//         return res.status(404).json({ message: "No review found for this freelancer" });
//       }
  
//       // Find the review from this client
//       let clientReview = existingReview.review.find(
//         (r) => r.client.toString() === req.user.id
//       );
  
//       if (!clientReview) {
//         return res.status(404).json({ message: "You have not reviewed this freelancer" });
//       }
  
//       // Update the review details
//       clientReview.rating = review.rating;
//       clientReview.feedback = review.feedback;
  
//     await existingReview.save();
  
//       return res
//         .status(200)
//         .json({ message: "Review updated successfully", existingReview });
//     } catch (error) {
//       console.error("Error updating review:", error);
//       res.status(500).json({ message: "Internal server error", error: error.message });
//     }
//   };
exports.updateReview = async (req, res) => {
    try {
      const { freelancer, review } = req.body;

      // Validate required fields
      if (!freelancer || !review?.rating || !review?.feedback) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Find existing review document for the freelancer
      let existingReview = await Review.findOne({ freelancer });
  
      if (!existingReview) {
        return res.status(404).json({ message: "No review found for this freelancer" });
      }
  
      // Find the review from this client
      let clientReviewIndex = existingReview.review.findIndex(
        (r) => r.client.toString() === req.user.id
      );
  
      if (clientReviewIndex === -1) {
        return res.status(404).json({ message: "You have not reviewed this freelancer" });
      }
  
      // Update the review details
      existingReview.review[clientReviewIndex].rating = review.rating;
      existingReview.review[clientReviewIndex].feedback = review.feedback;
  
      // Update the review document using findByIdAndUpdate
      const updatedReview = await Review.findByIdAndUpdate(
        existingReview._id,
        { review: existingReview.review },
        { new: true, runValidators: true }
      );
  
      return res
        .status(200)
        .json({ message: "Review updated successfully", updatedReview });
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
    
  exports.deleteReviewByClient = async (req, res) => {
    try {
      const { id } = req.params;
      // Find the review document for the freelancer
      let existingReview = await Review.findOne({ freelancer: id });
  
      if (!existingReview) {
        return res.status(404).json({ message: "No reviews found for this freelancer" });
      }
       // Filter out the review written by this client
      const updatedReviews = existingReview.review.filter(
        (r) => r.client.toString() !== req.user.id
      );
  
      // Update the review array
      const updatedReviewDoc = await Review.findByIdAndUpdate(
        existingReview._id,
        { review: updatedReviews },
        { new: true }
      );
  
      res.status(200).json({ message: "Review deleted successfully", updatedReviewDoc });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ message: "Error deleting review", error: error.message });
    }
  };
  
