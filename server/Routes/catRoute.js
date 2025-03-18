const express = require("express");
const {
  createCategory,
  updateCategory,
  displayCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/createCategory", createCategory);
router.get("/displayCategory", displayCategory);
router.put("/updateCategory/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);

module.exports = router;
