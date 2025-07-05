// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const StudentMarksSection = () => {
//   const [marks, setMarks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchMarks = async () => {
//       try {
//         const res = await axios.get("/api/marks/student", {
//           withCredentials: true,
//         });

//         setMarks(res.data);
//       } catch (err) {
//         console.error("Error fetching student marks", err);
//         setMarks([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMarks();
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-5 mb-6 border border-white/10"
//     >
//       <h3 className="text-xl font-semibold text-white mb-4">
//         📊 Your Subject-wise Marks
//       </h3>

//       {loading ? (
//         <p className="text-gray-300">Loading...</p>
//       ) : marks.length === 0 ? (
//         <p className="text-gray-300">No marks data available yet.</p>
//       ) : (
//         <table className="w-full text-sm text-white">
//           <thead className="text-left border-b border-white/10">
//             <tr>
//               <th className="py-2">Team</th>
//               <th>Subjects</th>
//               <th>Marks</th>
//               <th>Total</th>
//               <th>Percentage</th>
//             </tr>
//           </thead>
//           <tbody>
//             {marks.map((entry, i) => (
//               <tr key={i} className="border-b border-white/10">
//                 <td className="py-2">{entry.team}</td>
//                 <td>{entry.subjects.join(", ")}</td>
//                 <td>
//                   {entry.marksPerSubject instanceof Map
//                     ? Array.from(entry.marksPerSubject.entries())
//                       .map(([subject, score]) => `${subject}: ${score}`)
//                       .join(", ")
//                     : Object.entries(entry.marksPerSubject || {})
//                       .map(([subject, score]) => `${subject}: ${score}`)
//                       .join(", ")}
//                 </td>
//                 <td>{entry.totalMarksPerSubject * entry.subjects.length}</td>
//                 <td className="text-blue-400 font-semibold">{entry.percentage}%</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </motion.div>
//   );
// };

// export default StudentMarksSection;

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";

// const StudentMarksSection = () => {
//   const [marks, setMarks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMarks = async () => {
//       try {
//         const res = await axios.get("/api/marks/student", {
//           withCredentials: true,
//         });
//         setMarks(res.data);
//       } catch (err) {
//         console.error("Error fetching student marks", err);
//         setMarks([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMarks();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="student" />
//       <div className="flex-1 p-6">
//         <Header />

//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10"
//         >
//           <h2 className="text-2xl font-bold mb-6 text-white/90">
//             📊 Your Subject-wise Marks
//           </h2>

//           {loading ? (
//             <p className="text-gray-300">Loading marks...</p>
//           ) : marks.length === 0 ? (
//             <p className="text-gray-300">No marks data available yet.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-white table-auto border-separate border-spacing-y-2">
//                 <thead className="text-left">
//                   <tr className="bg-white/10 text-white/80 rounded-md">
//                     <th className="px-4 py-2 rounded-l-xl">Team</th>
//                     <th className="px-4 py-2">Subjects</th>
//                     <th className="px-4 py-2">Marks (per subject)</th>
//                     <th className="px-4 py-2">Total</th>
//                     <th className="px-4 py-2 rounded-r-xl">Percentage</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {marks.map((entry, i) => (
//                     <tr
//                       key={i}
//                       className="bg-white/5 hover:bg-white/10 transition rounded-xl"
//                     >
//                       <td className="px-4 py-3 font-medium">{entry.team}</td>
//                       <td className="px-4 py-3">{entry.subjects.join(", ")}</td>
//                       <td className="px-4 py-3">
//                         <div className="grid grid-cols-2 gap-1">
//                           {Object.entries(entry.marksPerSubject || {}).map(
//                             ([subject, score], idx) => (
//                               <div key={idx} className="text-sm text-blue-200">
//                                 <span className="font-semibold text-blue-400">
//                                   {subject}:
//                                 </span>{" "}
//                                 {score}
//                               </div>
//                             )
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 text-green-300 font-semibold">
//                         {entry.totalMarksPerSubject * entry.subjects.length}
//                       </td>
//                       <td className="px-4 py-3 text-blue-400 font-bold">
//                         {entry.percentage}%
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default StudentMarksSection;



// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import { PieChart, Pie, Cell } from "recharts";

// // 📊 Reusable Circular Chart Component
// const CircularPieChart = ({ value, total, text, colors = ["#3B82F6", "#E5E7EB"] }) => {
//   const data = [
//     { name: "Scored", value },
//     { name: "Remaining", value: total - value },
//   ];

//   return (
//     <div className="relative w-24 h-24 mx-auto">
//       <PieChart width={96} height={96}>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           innerRadius={28}
//           outerRadius={38}
//           paddingAngle={0}
//           startAngle={90}
//           endAngle={-270}
//           dataKey="value"
//           stroke="none"
//         >
//           {data.map((entry, index) => (
//             <Cell key={index} fill={colors[index % colors.length]} />
//           ))}
//         </Pie>
//       </PieChart>
//       <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
//         {text}
//       </div>
//     </div>
//   );
// };

// const StudentMarksSection = () => {
//   const [marks, setMarks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMarks = async () => {
//       try {
//         const res = await axios.get("/api/marks/student", {
//           withCredentials: true,
//         });
//         setMarks(res.data);
//       } catch (err) {
//         console.error("Error fetching student marks", err);
//         setMarks([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMarks();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="student" />
//       <div className="flex-1 p-6">
//         <Header />

//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10"
//         >
//           <h2 className="text-2xl font-bold mb-6 text-white/90">
//             📊 Your Subject-wise Marks
//           </h2>

//           {loading ? (
//             <p className="text-gray-300">Loading marks...</p>
//           ) : marks.length === 0 ? (
//             <p className="text-gray-300">No marks data available yet.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm table-auto border-separate border-spacing-y-3">
//                 <thead>
//                   <tr className="bg-white/10 text-white/80 rounded-xl">
//                     <th className="px-4 py-2 rounded-l-xl">Team</th>
//                     <th className="px-4 py-2">Subjects</th>
//                     <th className="px-4 py-2">Marks</th>
//                     <th className="px-4 py-2">Total</th>
//                     <th className="px-4 py-2">Chart</th>
//                     <th className="px-4 py-2 rounded-r-xl">Percentage</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {marks.map((entry, i) => {
//                     const totalPossible = entry.totalMarksPerSubject * entry.subjects.length;
//                     const value = (entry.percentage / 100) * totalPossible;

//                     return (
//                       <tr
//                         key={i}
//                         className="bg-white/5 hover:bg-white/10 transition rounded-xl"
//                       >
//                         <td className="px-4 py-3 font-semibold">{entry.team}</td>
//                         <td className="px-4 py-3">{entry.subjects.join(", ")}</td>
//                         <td className="px-4 py-3">
//                           <ul className="text-sm text-blue-200 space-y-1">
//                             {Object.entries(entry.marksPerSubject || {}).map(
//                               ([subject, score], idx) => (
//                                 <li key={idx}>
//                                   <span className="font-semibold text-blue-400">
//                                     {subject}:
//                                   </span>{" "}
//                                   {score}
//                                 </li>
//                               )
//                             )}
//                           </ul>
//                         </td>
//                         <td className="px-4 py-3 text-green-300 font-semibold">
//                           {totalPossible}
//                         </td>
//                         <td className="px-4 py-3">
//                           <CircularPieChart
//                             value={value}
//                             total={totalPossible}
//                             text={`${entry.percentage}%`}
//                           />
//                         </td>
//                         <td className="px-4 py-3 text-blue-400 font-bold">
//                           {entry.percentage}%
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default StudentMarksSection;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const StudentMarksSection = () => {
  const [marks, setMarks] = useState([]);
  const [filteredMarks, setFilteredMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const handleDownloadPDF = () => {
    setGeneratingPDF(true);
    try {
      // const handleDownloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Subject-wise Marks Report", 105, 15, null, null, "center");
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, null, null, "center");

        // Create table data
        const tableData = filteredMarks.map((entry) => [
          entry.team,
          entry.subjects.join(", "),
          Object.entries(entry.marksPerSubject || {})
            .map(([subject, mark]) => `${subject}: ${mark}`)
            .join(", "),
          entry.totalMarksPerSubject * entry.subjects.length,
          `${entry.percentage}%`
        ]);

        // Generate the table
        autoTable(doc, {
          head: [["Team", "Subjects", "Marks", "Total", "Percentage"]],
          body: tableData,
          startY: 30,
          theme: "grid",
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: "bold"
          },
          styles: {
            cellPadding: 3,
            fontSize: 10,
            valign: "middle"
          },
          columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 40 },
            2: { cellWidth: 60 },
            3: { cellWidth: 20 },
            4: { cellWidth: 25 }
          }
        });

        // Add summary footer
        const avgPercentage = filteredMarks.length > 0
          ? (filteredMarks.reduce((sum, mark) => sum + mark.percentage, 0) / filteredMarks.length).toFixed(2)
          : 0;

        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Average Percentage: ${avgPercentage}%`, 14, doc.lastAutoTable.finalY + 10);

        doc.save("student_marks_report.pdf");
      // };
    } catch (error) {
      console.error("PDF generation failed", error);
    } finally {
      setGeneratingPDF(false);
    }
  };

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await axios.get("/api/marks/student", {
          withCredentials: true,
        });
        setMarks(res.data);
        setFilteredMarks(res.data);
      } catch (err) {
        console.error("Error fetching student marks", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMarks();
  }, []);

  useEffect(() => {
    const filtered = marks.filter((entry) => {
      const subjectMatch = subjectFilter
        ? entry.subjects.includes(subjectFilter)
        : true;
      const teamMatch = teamFilter
        ? entry.team === teamFilter
        : true;
      return subjectMatch && teamMatch;
    });
    setFilteredMarks(filtered);
  }, [subjectFilter, teamFilter, marks]);

  // const handleDownloadPDF = () => {
  //   const doc = new jsPDF();

  //   doc.setFontSize(18);
  //   doc.text("Subject-wise Marks Report", 105, 15, null, null, "center");
  //   doc.setFontSize(12);
  //   doc.setTextColor(100);
  //   doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, null, null, "center");

  //   // Create table data
  //   const tableData = filteredMarks.map((entry) => [
  //     entry.team,
  //     entry.subjects.join(", "),
  //     Object.entries(entry.marksPerSubject || {})
  //       .map(([subject, mark]) => `${subject}: ${mark}`)
  //       .join(", "),
  //     entry.totalMarksPerSubject * entry.subjects.length,
  //     `${entry.percentage}%`
  //   ]);

  //   // Generate the table
  //   autoTable(doc, {
  //     head: [["Team", "Subjects", "Marks", "Total", "Percentage"]],
  //     body: tableData,
  //     startY: 30,
  //     theme: "grid",
  //     headStyles: {
  //       fillColor: [41, 128, 185],
  //       textColor: 255,
  //       fontStyle: "bold"
  //     },
  //     styles: {
  //       cellPadding: 3,
  //       fontSize: 10,
  //       valign: "middle"
  //     },
  //     columnStyles: {
  //       0: { cellWidth: 20 },
  //       1: { cellWidth: 40 },
  //       2: { cellWidth: 60 },
  //       3: { cellWidth: 20 },
  //       4: { cellWidth: 25 }
  //     }
  //   });

  //   // Add summary footer
  //   const avgPercentage = filteredMarks.length > 0
  //     ? (filteredMarks.reduce((sum, mark) => sum + mark.percentage, 0) / filteredMarks.length).toFixed(2)
  //     : 0;

  //   doc.setFontSize(10);
  //   doc.setTextColor(150);
  //   doc.text(`Average Percentage: ${avgPercentage}%`, 14, doc.lastAutoTable.finalY + 10);

  //   doc.save("student_marks_report.pdf");
  // };
  // Get unique subjects and teams for filters
  const allSubjects = [...new Set(marks.flatMap(m => m.subjects))].sort();
  const allTeams = [...new Set(marks.map(m => m.team))].sort();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="student" />
      <div className="flex-1 p-6">
        <Header />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/10"
        >
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white/90">
                📊 Your Subject-wise Marks
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                View and analyze your academic performance
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDownloadPDF}
                disabled={generatingPDF || filteredMarks.length === 0}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow flex items-center gap-2 ${generatingPDF ? "opacity-70 cursor-not-allowed" : ""
                  }`}
              >
                {generatingPDF ? (
                  <>
                    <span className="animate-spin">⏳</span> Generating...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Filter by Subject</label>
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
                >
                  <option value="">All Subjects</option>
                  {allSubjects.map((subj, i) => (
                    <option key={i} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Filter by Team</label>
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
                >
                  <option value="">All Teams</option>
                  {allTeams.map((team, i) => (
                    <option key={i} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Marks Table */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredMarks.length === 0 ? (
            <div className="bg-gray-800/30 rounded-lg p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-400 mt-4">No marks data available</h3>
              <p className="text-gray-500 mt-2">
                {subjectFilter || teamFilter
                  ? "No marks match your filters"
                  : "Your marks will appear here once your teacher adds them"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="w-full text-sm">
                <thead className="text-left bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 font-medium text-gray-300">Team</th>
                    <th className="px-4 py-3 font-medium text-gray-300">Subjects</th>
                    <th className="px-4 py-3 font-medium text-gray-300">Marks</th>
                    <th className="px-4 py-3 font-medium text-gray-300">Total</th>
                    <th className="px-4 py-3 font-medium text-gray-300">Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredMarks.map((entry, i) => (
                    <tr key={i} className="hover:bg-gray-800/50">
                      <td className="px-4 py-3 font-medium">{entry.team}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {entry.subjects.map((subject, idx) => (
                            <span key={idx} className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded text-xs">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="grid grid-cols-2 gap-1">
                          {Object.entries(entry.marksPerSubject || {}).map(
                            ([subject, score], idx) => (
                              <div key={idx} className="flex justify-between">
                                <span className="text-gray-400">{subject}:</span>
                                <span className="font-medium">{score}</span>
                              </div>
                            )
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-green-400">
                        {entry.totalMarksPerSubject * entry.subjects.length}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <span className={`font-bold ${entry.percentage >= 80 ? 'text-green-400' :
                            entry.percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                            {entry.percentage}%
                          </span>
                          <div className="ml-2 w-16 bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${entry.percentage >= 80 ? 'bg-green-500' :
                                entry.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              style={{ width: `${Math.min(100, entry.percentage)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary Stats */}
          {filteredMarks.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Average Percentage</div>
                <div className="text-2xl font-bold text-white mt-1">
                  {Math.round(filteredMarks.reduce((sum, mark) => sum + mark.percentage, 0) / filteredMarks.length)}%
                </div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Total Subjects</div>
                <div className="text-2xl font-bold text-white mt-1">
                  {[...new Set(filteredMarks.flatMap(m => m.subjects))].length}
                </div>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Best Subject</div>
                <div className="text-2xl font-bold text-green-400 mt-1">
                  {(() => {
                    const subjectScores = {};
                    filteredMarks.forEach(mark => {
                      Object.entries(mark.marksPerSubject).forEach(([subject, score]) => {
                        if (!subjectScores[subject]) subjectScores[subject] = [];
                        subjectScores[subject].push(score);
                      });
                    });

                    const avgScores = Object.entries(subjectScores).map(([subject, scores]) => ({
                      subject,
                      avg: scores.reduce((a, b) => a + b, 0) / scores.length
                    }));

                    return avgScores.sort((a, b) => b.avg - a.avg)[0]?.subject || 'N/A';
                  })()}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentMarksSection;