import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell } from "recharts";

const CircularPieChart = ({ value, total, colors = ["#3B82F6", "#E5E7EB"], text }) => {
  const data = [
    { name: "Completed", value },
    { name: "Remaining", value: total - value },
  ];

  return (
    <div className="relative w-28 h-28 mx-auto my-2">
      <PieChart width={112} height={112}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={36}
          outerRadius={48}
          paddingAngle={0}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-700">
        {text}
      </div>
    </div>
  );
};

const StudentResults = () => {
  const [studentId, setStudentId] = useState("171-101-199");
  const [semester, setSemester] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student ID:", studentId);
    console.log("Semester:", semester);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-5 min-h-screen font-sans bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white"
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-5 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md border border-white/10">
        <h2 className="text-2xl font-semibold text-white">Live Results</h2>
        <div className="flex items-center gap-4">
          <span className="font-medium">Student A</span>
          <img
            src="https://static.vecteezy.com/system/resources/previews/021/770/056/non_2x/avatar-of-a-student-character-free-vector.jpg"
            alt="User"
            className="w-9 h-9 rounded-full"
          />
          <motion.button
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            title="Logout"
            className="text-red-400 hover:text-red-600 transition text-xl"
          >
            <FiLogOut />
          </motion.button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Student ID"
            required
            className="peer w-full border border-gray-500 rounded-md px-3 pt-6 pb-2 font-semibold text-base bg-white/10 text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
          />
          <label
            htmlFor="studentId"
            className="absolute text-sm text-gray-400 left-3 top-1.5 bg-transparent px-1 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-blue-300"
          >
            Student ID
          </label>
        </div>

        <div className="relative flex-1 min-w-[200px]">
          <select
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
            className="peer w-full border border-gray-500 rounded-md px-3 pt-6 pb-2 font-semibold text-base bg-white/10 text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" hidden>Select Semester</option>
            <option>Semester 1</option>
            <option>Semester 2</option>
            <option>Semester 4</option>
            <option>Semester 5</option>
            <option>Semester 6</option>
            <option>Semester 7</option>
          </select>
          <label
            htmlFor="semester"
            className="absolute text-sm text-gray-400 left-3 top-1.5 bg-transparent px-1 transition-all peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-blue-300"
          >
            Select Semester
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          SUBMIT
        </motion.button>
      </div>

      {/* Results Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-5 mb-6 border border-white/10"
      >
        <table className="w-full text-sm text-white">
          <thead className="text-left border-b border-white/10">
            <tr>
              <th className="py-2">Course Code</th>
              <th>Course Title</th>
              <th>Credit</th>
              <th>Grade</th>
              <th>Grade Point</th>
            </tr>
          </thead>
          <tbody>
            {["ENG9775", "OS9425", "OOP987", "ELP182"].map((code, i) => (
              <tr key={code} className="border-b border-white/10">
                <td className="py-2">{code}</td>
                <td>
                  {[
                    "English Language Usage",
                    "Operating Systems",
                    "Object-oriented programming",
                    "English Language Proficiency",
                  ][i]}
                </td>
                <td>3</td>
                <td>A+</td>
                <td>4</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-medium">
              <td colSpan="2" className="pt-3 text-left">
                Total Credit Requirement: <span className="text-blue-400 font-bold">9</span>
              </td>
              <td colSpan="2" className="pt-3 text-left">
                Total Credit Taken: <span className="text-blue-400 font-bold">12</span>
              </td>
              <td className="pt-3 text-left">
                SGPA: <span className="text-blue-400 font-bold">4.00</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </motion.div>

      {/* Summary Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 text-sm text-center hover:shadow-xl border border-white/10"
          >
            {[
              <>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/021/770/056/non_2x/avatar-of-a-student-character-free-vector.jpg"
                  alt="Student"
                  className="w-16 h-16 rounded-full mb-3 mx-auto"
                />
                <p><strong>Name:</strong> Student A</p>
                <p><strong>Department:</strong> <span className="text-blue-400 font-bold">Department Of Engineering</span></p>
                <p><strong>Faculty:</strong> FHSS</p>
                <p><strong>Student ID:</strong> 171-101-199</p>
                <p><strong>Enrolment:</strong> <span className="text-blue-400 font-bold">Semester 2</span></p>
                <p><strong>Batch:</strong> 40</p>
              </>,
              <>
                <h4 className="font-semibold mb-2">Your Overall Performance This Semester</h4>
                <p>Class Attended: <span className="text-blue-400 font-bold">46/50</span></p>
                <p>Quiz Taken: <span className="text-blue-400 font-bold">11/12</span></p>
                <p>Assignment Submitted: <span className="text-blue-400 font-bold">21/24</span></p>
                <p>Presentation Completed: <span className="text-blue-400 font-bold">3/4</span></p>
              </>,
              <>
                <h4 className="font-semibold mb-2">You have completed 11 quizzes this semester!</h4>
                <CircularPieChart value={11} total={12} text="11/12" />
                <p>Average Marks: <span className="text-blue-400 font-bold">22/24</span></p>
                <p>Score: <span className="text-blue-400 font-bold">Top 90%</span></p>
              </>,
              <>
                <h4 className="font-semibold mb-2">Overall Achievement</h4>
                <CircularPieChart value={90} total={100} text="90%" colors={["#22C55E", "#E5E7EB"]} />
                <p className="text-green-400 font-semibold">Congratulations!</p>
                <p>You are in the top 90% of your class</p>
              </>,
            ][index]}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StudentResults;
