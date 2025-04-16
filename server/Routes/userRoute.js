const express = require("express");
const {
  displayUser,
  deleteUser,
  updatePasswordAdmin,
  updatePasswordUser,
  updateUserAdmin,
  updateUserDetails
} = require("../controllers/userController.js");
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");
const router = express.Router();

router.put("/updateUserAdmin/:id", 
  VerifyToken, authorizeRoles("Admin"), 
  updateUserAdmin);
router.put("/updateUserDetails/:id", 
  VerifyToken, authorizeRoles("Freelancer", "Client"), 
  updateUserDetails);
router.put("/updatePasswordAdmin/:id", 
  VerifyToken, authorizeRoles("Admin"), 
  updatePasswordAdmin);
router.put("/updatePasswordUser/:id", 
  VerifyToken, authorizeRoles("Freelancer", "Client"), 
  updatePasswordUser);
router.delete("/deleteUser/:id", 
  VerifyToken, authorizeRoles("Admin", "Client", "Freelancer"), 
  deleteUser);
router.get("/displayUser", 
  VerifyToken, authorizeRoles("Admin", "Client", "Freelancer"), 
  displayUser);

module.exports = router;