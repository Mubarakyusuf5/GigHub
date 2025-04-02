const express = require("express");
const {
  createCategory,
  updateCategory,
  displayCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();
const { VerifyToken } = require("../middlewares/jwt.js");
const authorizeRoles = require("../middlewares/RoleMiddleware.js");

router.post("/createCategory",
  VerifyToken, authorizeRoles("Admin"), 
  createCategory);
router.get("/displayCategory", 
  VerifyToken, authorizeRoles("Admin", "Client", "Freelancer"), 
  displayCategory);
router.put("/updateCategory/:id", 
  VerifyToken, authorizeRoles("Admin"), 
  updateCategory);
router.delete("/deleteCategory/:id", 
  VerifyToken, authorizeRoles("Admin"), 
  deleteCategory);

module.exports = router;
