import express from "express";
import mongoose from "mongoose";

// Define the Grade schema and model
const gradeSchema = new mongoose.Schema({
  learners_id: { type: Number, required: true },
  class_id: { type: Number, required: true },
  scores: [{ type: Number }],
});

const Grade = mongoose.model("Grade", gradeSchema);

const router = express.Router();

// Create a single grade entry
router.post("/", async (req, res) => {
  try {
    const newGrade = new Grade(req.body);
    await newGrade.save();
    res.status(201).send(newGrade);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating grade entry.");
  }
});

// Get a single grade entry
router.get("/:id", async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).send("Grade not found.");
    }
    res.status(200).send(grade);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching grade entry.");
  }
});

// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      { $push: { scores: req.body.score } },
      { new: true }
    );
    if (!grade) {
      return res.status(404).send("Grade not found.");
    }
    res.status(200).send(grade);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding score.");
  }
});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(
      req.params.id,
      { $pull: { scores: req.body.score } },
      { new: true }
    );
    if (!grade) {
      return res.status(404).send("Grade not found.");
    }
    res.status(200).send(grade);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error removing score.");
  }
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);
    if (!grade) {
      return res.status(404).send("Grade not found.");
    }
    res.status(200).send("Grade deleted.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting grade entry.");
  }
});

export default router;