const express = require("express");
const {
  displayUser,
  updateUser,
  deleteUser
} = require("../controllers/userController.js");
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");
const router = express.Router();

router.put("/updateUser/:id", 
  // VerifyToken, authorizeRoles("Admin"), 
  updateUser);
router.delete("/deleteUser/:id", 
  // VerifyToken, authorizeRoles("Admin"), 
  deleteUser);
router.get("/displayUser", 
  // VerifyToken, authorizeRoles("Admin", "Organizer"), 
  displayUser);

module.exports = router;