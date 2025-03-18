const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser
} = require("../controllers/authController.js");
const { VerifyToken, VerifyResetToken } = require("../middlewares/jwt.js");
const { resetPass, frgtPass, checkToken } = require("../controllers/frgtPass.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", VerifyToken, getUser);
router.post("/logout", logout);
router.post("/forgotPassword", frgtPass);
router.post("/resetPassword", VerifyResetToken, resetPass);
router.get("/check-token/:token", checkToken);

module.exports = router;
