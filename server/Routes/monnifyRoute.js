const express = require("express");
const { verifyPayment } = require("../controllers/monnifyController.js");
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");
const router = express.Router();

router.post("/payment-success", verifyPayment);

module.exports = router;