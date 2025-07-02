// routes/syllabus.js
import express from "express";
import Syllabus from "../models/syllabus.model.js";

const router = express.Router();

// POST syllabus
router.post("/", async (req, res) => {
  const { class: className, syllabusURL } = req.body;
  try {
    let existing = await Syllabus.findOne({ class: className });
    if (existing) {
      existing.syllabusURL = syllabusURL;
      await existing.save();
      return res.status(200).json(existing);
    } else {
      const newEntry = new Syllabus({ class: className, syllabusURL });
      await newEntry.save();
      return res.status(201).json(newEntry);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to save syllabus" });
  }
});

// GET syllabus
router.get("/:className", async (req, res) => {
  try {
    const syllabus = await Syllabus.findOne({ class: req.params.className });
    if (!syllabus) return res.status(404).json({ message: "Not found" });
    res.json(syllabus);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch syllabus" });
  }
});

// DELETE syllabus
router.delete("/:className", async (req, res) => {
  try {
    await Syllabus.findOneAndDelete({ class: req.params.className });
    res.json({ message: "Syllabus deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
