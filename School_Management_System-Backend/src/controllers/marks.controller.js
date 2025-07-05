import Marks from "../models/marks.model.js";
import Student from "../models/student.model.js";

export const saveMarks = async (req, res) => {
  const { className, subject, team, totalMarks, studentMarks } = req.body;

  try {
    const created = await Promise.all(studentMarks.map(async ({ studentId, marksObtained }) => {
      const percentage = ((marksObtained / totalMarks) * 100).toFixed(2);

      return await Marks.create({
        studentId,
        className,
        subject,
        team,
        totalMarks,
        marksObtained,
        percentage,
        teacherId: req.user._id,
      });
    }));

    res.status(201).json({ message: "Marks saved", data: created });
  } catch (err) {
    res.status(500).json({ message: "Error saving marks", error: err.message });
  }
};

export const getMarksByClassAndTeam = async (req, res) => {
  const { className, team } = req.params;
  try {
    const data = await Marks.find({ className, team }).populate("studentId", "name rollNo");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching marks", error: err.message });
  }
};
export const getMarksForStudent = async (req, res) => {
  try {
    const studentId = req.user._id;
    const marks = await Marks.find({ student: studentId }).lean();

    if (!marks || marks.length === 0) {
      return res.status(200).json([]); // Return empty array instead of 404
    }

    // Transform the data
    const transformedMarks = marks.map(mark => ({
      team: mark.team,
      subjects: mark.subjects,
      marksPerSubject: mark.marksPerSubject,
      totalMarksPerSubject: mark.totalMarksPerSubject,
      percentage: mark.percentage
    }));

    res.status(200).json(transformedMarks);
  } catch (error) {
    console.error("Error fetching student marks:", error);
    res.status(500).json({ message: "Failed to fetch marks", error: error.message });
  }
};