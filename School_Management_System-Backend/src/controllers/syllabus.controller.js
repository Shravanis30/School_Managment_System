// controllers/syllabus.controller.js
import Syllabus from '../models/syllabus.model.js';

export const uploadSyllabus = async (req, res) => {
  const { class: className, syllabusURL } = req.body;

  try {
    let syllabus = await Syllabus.findOne({ class: className });

    if (syllabus) {
      syllabus.syllabusURL = syllabusURL;
      await syllabus.save();
      return res.json({ message: 'Syllabus updated' });
    }

    syllabus = new Syllabus({ class: className, syllabusURL });
    await syllabus.save();
    res.status(201).json({ message: 'Syllabus uploaded' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getSyllabusByClass = async (req, res) => {
  const { class: className } = req.params;

  try {
    const syllabus = await Syllabus.findOne({ class: className });

    if (!syllabus) {
      return res.status(404).json({ error: 'Syllabus not found' });
    }

    res.json(syllabus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
