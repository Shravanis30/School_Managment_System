

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TeacherAddMarks = () => {
//   const [teams] = useState(["1st Team", "2nd Team", "3rd Team"]);
//   const [selectedTeam, setSelectedTeam] = useState("");
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [marks, setMarks] = useState({}); // { studentId: { subject: value } }
//   const [totalMarks, setTotalMarks] = useState(100);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     axios.get("/api/classes").then((res) => setClasses(res.data));
//   }, []);

//   useEffect(() => {
//     if (selectedClass) {
//       axios
//         .get(`/api/classes/subjects/${selectedClass}`)
//         .then((res) => setSubjects(res.data))
//         .catch((err) => {
//           console.error("Error fetching subjects:", err);
//           setSubjects([]);
//         });

//       axios
//         .get(`/api/students/by-class-name/${selectedClass}`)
//         .then((res) => setStudents(res.data))
//         .catch((err) => {
//           console.error("Error fetching students:", err);
//           setStudents([]);
//         });
//     }
//   }, [selectedClass]);

//   const handleChange = (studentId, subject, value) => {
//     setMarks((prev) => ({
//       ...prev,
//       [studentId]: {
//         ...(prev[studentId] || {}),
//         [subject]: value,
//       },
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const studentMarks = students.map((student) => {
//         const studentMarkObj = marks[student._id] || {};
//         const obtainedTotal = subjects.reduce(
//           (sum, sub) => sum + (parseFloat(studentMarkObj[sub]) || 0),
//           0
//         );
//         return {
//           studentId: student._id,
//           marksPerSubject: studentMarkObj,
//           totalObtained: obtainedTotal,
//           percentage: ((obtainedTotal / (totalMarks * subjects.length)) * 100).toFixed(2),
//         };
//       });

//       const payload = {
//         className: selectedClass,
//         team: selectedTeam,
//         totalMarksPerSubject: totalMarks,
//         subjects,
//         studentMarks,
//       };

//       await axios.post("/api/marks/multiple-subjects", payload, { withCredentials: true });
//       setMessage("✅ Marks submitted successfully!");
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Error submitting marks.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-white/5 text-white rounded-2xl border border-white/10 shadow-xl">
//       <h2 className="text-3xl font-bold mb-6 border-b border-white/10 pb-2">
//         📊 Add Marks for All Subjects
//       </h2>

//       <div className="grid md:grid-cols-4 gap-4 mb-8">
//         <div>
//           <label className="block text-sm mb-1 text-gray-300">Team</label>
//           <select
//             value={selectedTeam}
//             onChange={(e) => setSelectedTeam(e.target.value)}
//             className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
//           >
//             <option value="">Select Team</option>
//             {teams.map((team) => (
//               <option key={team} value={team}>
//                 {team}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm mb-1 text-gray-300">Class</label>
//           <select
//             value={selectedClass}
//             onChange={(e) => setSelectedClass(e.target.value)}
//             className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
//           >
//             <option value="">Select Class</option>
//             {classes.map((cls) => (
//               <option key={cls._id} value={cls.name}>
//                 {cls.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm mb-1 text-gray-300">Total Marks (Per Subject)</label>
//           <input
//             type="number"
//             value={totalMarks}
//             onChange={(e) => setTotalMarks(e.target.value)}
//             className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
//           />
//         </div>
//       </div>

//       {students.length > 0 && subjects.length > 0 && (
//         <div className="overflow-auto rounded-lg border border-white/10">
//           <table className="w-full text-sm text-left text-gray-300">
//             <thead className="bg-gray-800 text-white text-sm">
//               <tr>
//                 <th className="p-3">Roll No</th>
//                 <th className="p-3">Name</th>
//                 {subjects.map((subject) => (
//                   <th key={subject} className="p-3">{subject}</th>
//                 ))}
//                 <th className="p-3">%</th>
//               </tr>
//             </thead>
//             <tbody className="bg-gray-900">
//               {students.map((student) => {
//                 const studentMarkObj = marks[student._id] || {};
//                 const obtained = subjects.reduce(
//                   (sum, sub) => sum + (parseFloat(studentMarkObj[sub]) || 0),
//                   0
//                 );
//                 const percent = subjects.length
//                   ? ((obtained / (totalMarks * subjects.length)) * 100).toFixed(2)
//                   : 0;
//                 return (
//                   <tr key={student._id} className="border-b border-white/10">
//                     <td className="p-3">{student.rollNo}</td>
//                     <td className="p-3">{student.name}</td>
//                     {subjects.map((sub) => (
//                       <td key={sub} className="p-3">
//                         <input
//                           type="number"
//                           value={studentMarkObj[sub] || ""}
//                           onChange={(e) => handleChange(student._id, sub, e.target.value)}
//                           className="w-20 p-1 rounded bg-gray-700 text-white border border-gray-600"
//                         />
//                       </td>
//                     ))}
//                     <td className="p-3">{percent}%</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="mt-6 flex items-center justify-between">
//         <button
//           onClick={handleSubmit}
//           className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition"
//         >
//           Save Marks
//         </button>
//         {message && <p className="text-yellow-400 text-sm">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default TeacherAddMarks;



import React, { useState, useEffect } from "react";
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import axios from "axios";

const TeacherAddMarks = () => {
  const [teams] = useState(["1st Team", "2nd Team", "3rd Team"]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [totalMarks, setTotalMarks] = useState(100);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/api/classes").then((res) => setClasses(res.data));
  }, []);

  useEffect(() => {
    if (selectedClass) {
      axios.get(`/api/classes/subjects/${selectedClass}`)
        .then((res) => setSubjects(res.data))
        .catch(() => setSubjects([]));

      axios.get(`/api/students/by-class-name/${selectedClass}`)
        .then((res) => setStudents(res.data))
        .catch(() => setStudents([]));
    }
  }, [selectedClass]);

  const handleChange = (studentId, subject, value) => {
    setMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [subject]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const studentMarks = students.map((student) => {
        const studentMarkObj = marks[student._id] || {};
        const obtainedTotal = subjects.reduce(
          (sum, sub) => sum + (parseFloat(studentMarkObj[sub]) || 0),
          0
        );
        return {
          studentId: student._id,
          marksPerSubject: studentMarkObj,
          totalObtained: obtainedTotal,
          percentage: ((obtainedTotal / (totalMarks * subjects.length)) * 100).toFixed(2),
        };
      });

      const payload = {
        className: selectedClass,
        team: selectedTeam,
        totalMarksPerSubject: totalMarks,
        subjects,
        studentMarks,
      };

      await axios.post("/api/marks/multiple-subjects", payload, { withCredentials: true });
      setMessage("✅ Marks submitted successfully!");
    } catch (err) {
      setMessage("❌ Error submitting marks.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="teacher" />
      <div className="flex-1 p-6">
        <Header />

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-lg max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 border-b border-white/10 pb-2">
            📊 Add Marks for All Subjects
          </h2>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-sm mb-1 text-gray-300">Team</label>
              <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600">
                <option value="">Select Team</option>
                {teams.map((team) => <option key={team} value={team}>{team}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-300">Class</label>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600">
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls.name}>{cls.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-300">Total Marks (Per Subject)</label>
              <input type="number" value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600" />
            </div>
          </div>

          {students.length > 0 && subjects.length > 0 && (
            <div className="overflow-auto rounded-lg border border-white/10">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="bg-gray-800 text-white text-sm">
                  <tr>
                    <th className="p-3">Roll No</th>
                    <th className="p-3">Name</th>
                    {subjects.map((subject) => (
                      <th key={subject} className="p-3">{subject}</th>
                    ))}
                    <th className="p-3">%</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900">
                  {students.map((student) => {
                    const studentMarkObj = marks[student._id] || {};
                    const obtained = subjects.reduce(
                      (sum, sub) => sum + (parseFloat(studentMarkObj[sub]) || 0),
                      0
                    );
                    const percent = subjects.length
                      ? ((obtained / (totalMarks * subjects.length)) * 100).toFixed(2)
                      : 0;

                    return (
                      <tr key={student._id} className="border-b border-white/10">
                        <td className="p-3">{student.rollNo}</td>
                        <td className="p-3">{student.name}</td>
                        {subjects.map((sub) => (
                          <td key={sub} className="p-3">
                            <input
                              type="number"
                              value={studentMarkObj[sub] || ""}
                              onChange={(e) => handleChange(student._id, sub, e.target.value)}
                              className="w-20 p-1 rounded bg-gray-700 text-white border border-gray-600"
                            />
                          </td>
                        ))}
                        <td className="p-3">{percent}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition"
            >
              Save Marks
            </button>
            {message && <p className="text-yellow-400 text-sm">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAddMarks;
