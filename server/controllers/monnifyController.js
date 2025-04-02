const axios = require("axios")
const Payment = require("../models/payment") // Your payment schema
require("dotenv").config();


// Verify Monnify Payment
// router.post("/payment-success", 
exports.verifyPayment = async (req, res) => {
  const { reference, jobId, amount } = req.body;

  try {
    // Authenticate with Monnify API
    const authResponse = await axios.post("https://api.monnify.com/api/v1/auth/login", {
      apiKey: process.env.MONNIFY_API_KEY,
      secretKey: process.env.MONNIFY_SECRET_KEY,
    });

    const token = authResponse.data.responseBody.accessToken;

    // Verify the payment
    const response = await axios.get(`https://sandbox.monnify.com/api/v1/transactions/${reference}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.responseBody.paymentStatus === "PAID") {
      // Save payment details in MongoDB
      const newPayment = new Payment({
        jobId,
        reference,
        amount,
        status: "Paid",
      });
      await newPayment.save();

      return res.status(200).json({ success: true, message: "Payment successful" });
    } else {
      return res.status(400).json({ success: false, message: "Payment not verified" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

