// category and tags(skills + categories and others)
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    // industry: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    // },
    // detail: [
      // {
        category: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },
        skills: [
          {
            type: String,
            required: true,
            trim: true, // Ensures skills are stored cleanly
          },
        ],
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", CategorySchema);
