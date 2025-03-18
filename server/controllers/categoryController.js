const Categories = require("../models/category");

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { category, skills } = req.body;

        if (!category || !skills || !Array.isArray(skills)) {
            return res.status(400).json({ message: "Category and skills array are required" });
        }

        const newCategory = await Categories.create({ category, skills });
        res.status(201).json({ message: "Category created successfully", newCategory });
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error: error.message });
    }
};

// Display all categories
const displayCategory = async (req, res) => {
    try {
        const categories = await Categories.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error displaying categories", error: error.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
        const { category, skills } = req.body;

        const updatedCategory = await Categories.findByIdAndUpdate(
            req.params.id, 
            { category, skills },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Categories.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully", deletedCategory });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
};

module.exports = {
    createCategory,
    displayCategory,
    updateCategory,
    deleteCategory,
};
