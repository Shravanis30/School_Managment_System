// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";

// const StudentMarksSection = () => {
//   const [marks, setMarks] = useState([]);
//   const [filteredMarks, setFilteredMarks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [subjectFilter, setSubjectFilter] = useState("");
//   const [teamFilter, setTeamFilter] = useState("");
//   const [generatingPDF, setGeneratingPDF] = useState(false);

//   const handleDownloadPDF = () => {
//     setGeneratingPDF(true);
//     try {
//       // const handleDownloadPDF = () => {
//         const doc = new jsPDF();

//         doc.setFontSize(18);
//         doc.text("Subject-wise Marks Report", 105, 15, null, null, "center");
//         doc.setFontSize(12);
//         doc.setTextColor(100);
//         doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, null, null, "center");

//         // Create table data
//         const tableData = filteredMarks.map((entry) => [
//           entry.team,
//           entry.subjects.join(", "),
//           Object.entries(entry.marksPerSubject || {})
//             .map(([subject, mark]) => `${subject}: ${mark}`)
//             .join(", "),
//           entry.totalMarksPerSubject * entry.subjects.length,
//           `${entry.percentage}%`
//         ]);

//         // Generate the table
//         autoTable(doc, {
//           head: [["Team", "Subjects", "Marks", "Total", "Percentage"]],
//           body: tableData,
//           startY: 30,
//           theme: "grid",
//           headStyles: {
//             fillColor: [41, 128, 185],
//             textColor: 255,
//             fontStyle: "bold"
//           },
//           styles: {
//             cellPadding: 3,
//             fontSize: 10,
//             valign: "middle"
//           },
//           columnStyles: {
//             0: { cellWidth: 20 },
//             1: { cellWidth: 40 },
//             2: { cellWidth: 60 },
//             3: { cellWidth: 20 },
//             4: { cellWidth: 25 }
//           }
//         });

//         // Add summary footer
//         const avgPercentage = filteredMarks.length > 0
//           ? (filteredMarks.reduce((sum, mark) => sum + mark.percentage, 0) / filteredMarks.length).toFixed(2)
//           : 0;

//         doc.setFontSize(10);
//         doc.setTextColor(150);
//         doc.text(`Average Percentage: ${avgPercentage}%`, 14, doc.lastAutoTable.finalY + 10);

//         doc.save("student_marks_report.pdf");
//       // };
//     } catch (error) {
//       console.error("PDF generation failed", error);
//     } finally {
//       setGeneratingPDF(false);
//     }
//   };

//   useEffect(() => {
//     const fetchMarks = async () => {
//       try {
//         const res = await axios.get("/api/marks/student", {
//           withCredentials: true,
//         });
//         setMarks(res.data);
//         setFilteredMarks(res.data);
//       } catch (err) {
//         console.error("Error fetching student marks", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMarks();
//   }, []);

//   useEffect(() => {
//     const filtered = marks.filter((entry) => {
//       const subjectMatch = subjectFilter
//         ? entry.subjects.includes(subjectFilter)
//         : true;
//       const teamMatch = teamFilter
//         ? entry.team === teamFilter
//         : true;
//       return subjectMatch && teamMatch;
//     });
//     setFilteredMarks(filtered);
//   }, [subjectFilter, teamFilter, marks]);

//   // const handleDownloadPDF = () => {
//   //   const doc = new jsPDF();

//   //   doc.setFontSize(18);
//   //   doc.text("Subject-wise Marks Report", 105, 15, null, null, "center");
//   //   doc.setFontSize(12);
//   //   doc.setTextColor(100);
//   //   doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, null, null, "center");

//   //   // Create table data
//   //   const tableData = filteredMarks.map((entry) => [
//   //     entry.team,
//   //     entry.subjects.join(", "),
//   //     Object.entries(entry.marksPerSubject || {})
//   //       .map(([subject, mark]) => `${subject}: ${mark}`)
//   //       .join(", "),
//   //     entry.totalMarksPerSubject * entry.subjects.length,
//   //     `${entry.percentage}%`
//   //   ]);

//   //   // Generate the table
//   //   autoTable(doc, {
//   //     head: [["Team", "Subjects", "Marks", "Total", "Percentage"]],
//   //     body: tableData,
//   //     startY: 30,
//   //     theme: "grid",
//   //     headStyles: {
//   //       fillColor: [41, 128, 185],
//   //       textColor: 255,
//   //       fontStyle: "bold"
//   //     },
//   //     styles: {
//   //       cellPadding: 3,
//   //       fontSize: 10,
//   //       valign: "middle"
//   //     },
//   //     columnStyles: {
//   //       0: { cellWidth: 20 },
//   //       1: { cellWidth: 40 },
//   //       2: { cellWidth: 60 },
//   //       3: { cellWidth: 20 },
//   //       4: { cellWidth: 25 }
//   //     }
//   //   });

//   //   // Add summary footer
//   //   const avgPercentage = filteredMarks.length > 0
//   //     ? (filteredMarks.reduce((sum, mark) => sum + mark.percentage, 0) / filteredMarks.length).toFixed(2)
//   //     : 0;

//   //   doc.setFontSize(10);
//   //   doc.setTextColor(150);
//   //   doc.text(`Average Percentage: ${avgPercentage}%`, 14, doc.lastAutoTable.finalY + 10);

//   //   doc.save("student_marks_report.pdf");
//   // };
//   // Get unique subjects and teams for filters
//   const allSubjects = [...new Set(marks.flatMap(m => m.subjects))].sort();
//   const allTeams = [...new Set(marks.map(m => m.team))].sort();

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
//           <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//             <div>
//               <h2 className="text-2xl font-bold text-white/90">
//                 📊 Your Subject-wise Marks
//               </h2>
//               <p className="text-gray-400 text-sm mt-1">
//                 View and analyze your academic performance
//               </p>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={handleDownloadPDF}
//                 disabled={generatingPDF || filteredMarks.length === 0}
//                 className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow flex items-center gap-2 ${generatingPDF ? "opacity-70 cursor-not-allowed" : ""
//                   }`}
//               >
//                 {generatingPDF ? (
//                   <>
//                     <span className="animate-spin">⏳</span> Generating...
//                   </>
//                 ) : (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                     Download PDF
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-300 text-sm mb-2">Filter by Subject</label>
//                 <select
//                   value={subjectFilter}
//                   onChange={(e) => setSubjectFilter(e.target.value)}
//                   className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
//                 >
//                   <option value="">All Subjects</option>
//                   {allSubjects.map((subj, i) => (
//                     <option key={i} value={subj}>
//                       {subj}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-gray-300 text-sm mb-2">Filter by Team</label>
//                 <select
//                   value={teamFilter}
//                   onChange={(e) => setTeamFilter(e.target.value)}
//                   className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white"
//                 >
//                   <option value="">All Teams</option>
//                   {allTeams.map((team, i) => (
//                     <option key={i} value={team}>
//                       {team}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Marks Table */}
//           {loading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : filteredMarks.length === 0 ? (
//             <div className="bg-gray-800/30 rounded-lg p-8 text-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               <h3 className="text-xl font-medium text-gray-400 mt-4">No marks data available</h3>
//               <p className="text-gray-500 mt-2">
//                 {subjectFilter || teamFilter
//                   ? "No marks match your filters"
//                   : "Your marks will appear here once your teacher adds them"}
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto rounded-lg border border-gray-700">
//               <table className="w-full text-sm">
//                 <thead className="text-left bg-gray-800">
//                   <tr>
//                     <th className="px-4 py-3 font-medium text-gray-300">Team</th>
//                     <th className="px-4 py-3 font-medium text-gray-300">Subjects</th>
//                     <th className="px-4 py-3 font-medium text-gray-300">Marks</th>
//                     <th className="px-4 py-3 font-medium text-gray-300">Total</th>
//                     <th className="px-4 py-3 font-medium text-gray-300">Percentage</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-700">
//                   {filteredMarks.map((entry, i) => (
//                     <tr key={i} className="hover:bg-gray-800/50">
//                       <td className="px-4 py-3 font-medium">{entry.team}</td>
//                       <td className="px-4 py-3">
//                         <div className="flex flex-wrap gap-1">
//                           {entry.subjects.map((subject, idx) => (
//                             <span key={idx} className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded text-xs">
//                               {subject}
//                             </span>
//                           ))}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="grid grid-cols-2 gap-1">
//                           {Object.entries(entry.marksPerSubject || {}).map(
//                             ([subject, score], idx) => (
//                               <div key={idx} className="flex justify-between">
//                                 <span className="text-gray-400">{subject}:</span>
//                                 <span className="font-medium">{score}</span>
//                               </div>
//                             )
//                           )}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3 font-bold text-green-400">
//                         {entry.totalMarksPerSubject * entry.subjects.length}
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center">
//                           <span className={`font-bold ${entry.percentage >= 80 ? 'text-green-400' :
//                             entry.percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
//                             }`}>
//                             {entry.percentage}%
//                           </span>
//                           <div className="ml-2 w-16 bg-gray-700 rounded-full h-2">
//                             <div
//                               className={`h-2 rounded-full ${entry.percentage >= 80 ? 'bg-green-500' :
//                                 entry.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
//                                 }`}
//                               style={{ width: `${Math.min(100, entry.percentage)}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Summary Stats */}
//           {filteredMarks.length > 0 && (
//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-gray-800/30 rounded-lg p-4">
//                 <div className="text-gray-400 text-sm">Average Percentage</div>
//                 <div className="text-2xl font-bold text-white mt-1">
//                   {Math.round(filteredMarks.reduce((sum, mark) => sum + mark.percentage, 0) / filteredMarks.length)}%
//                 </div>
//               </div>
//               <div className="bg-gray-800/30 rounded-lg p-4">
//                 <div className="text-gray-400 text-sm">Total Subjects</div>
//                 <div className="text-2xl font-bold text-white mt-1">
//                   {[...new Set(filteredMarks.flatMap(m => m.subjects))].length}
//                 </div>
//               </div>
//               <div className="bg-gray-800/30 rounded-lg p-4">
//                 <div className="text-gray-400 text-sm">Best Subject</div>
//                 <div className="text-2xl font-bold text-green-400 mt-1">
//                   {(() => {
//                     const subjectScores = {};
//                     filteredMarks.forEach(mark => {
//                       Object.entries(mark.marksPerSubject).forEach(([subject, score]) => {
//                         if (!subjectScores[subject]) subjectScores[subject] = [];
//                         subjectScores[subject].push(score);
//                       });
//                     });

//                     const avgScores = Object.entries(subjectScores).map(([subject, scores]) => ({
//                       subject,
//                       avg: scores.reduce((a, b) => a + b, 0) / scores.length
//                     }));

//                     return avgScores.sort((a, b) => b.avg - a.avg)[0]?.subject || 'N/A';
//                   })()}
//                 </div>
//               </div>
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
  const [loading, setLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [transformedData, setTransformedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Transform marks data for tabular display
  const transformMarksData = (data) => {
    return data.flatMap(entry => 
      entry.subjects.map(subject => ({
        id: `${entry._id}-${subject}`,
        team: entry.team,
        subject,
        marks: entry.marksPerSubject[subject] || 0,
        total: entry.totalMarksPerSubject,
        percentage: entry.marksPerSubject[subject] 
          ? ((entry.marksPerSubject[subject] / entry.totalMarksPerSubject) * 100).toFixed(2)
          : "0.00",
        date: new Date(entry.createdAt).toLocaleDateString(),
      }))
    );
  };

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/marks/student`, {
          withCredentials: true,
        });
        setMarks(res.data);
        
        // Transform data for tabular display
        const transformed = transformMarksData(res.data);
        setTransformedData(transformed);
        setFilteredData(transformed);
      } catch (err) {
        console.error("Error fetching student marks", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMarks();
  }, []);

  useEffect(() => {
    let filtered = transformedData;
    
    if (subjectFilter) {
      filtered = filtered.filter(item => item.subject === subjectFilter);
    }
    
    if (teamFilter) {
      filtered = filtered.filter(item => item.team === teamFilter);
    }
    
    setFilteredData(filtered);
  }, [subjectFilter, teamFilter, transformedData]);

  const handleDownloadPDF = () => {
    setGeneratingPDF(true);
    try {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Student Marks Report", 105, 15, null, null, "center");
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, null, null, "center");

      // Create table data
      const tableData = filteredData.map((item) => [
        item.team,
        item.subject,
        item.date,
        item.marks,
        item.total,
        `${item.percentage}%`
      ]);

      // Generate the table
      autoTable(doc, {
        head: [["Team", "Subject", "Date", "Marks", "Total", "Percentage"]],
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
          1: { cellWidth: 35 },
          2: { cellWidth: 25 },
          3: { cellWidth: 20 },
          4: { cellWidth: 20 },
          5: { cellWidth: 25 }
        }
      });

      // Add summary footer
      const avgPercentage = filteredData.length > 0
        ? (filteredData.reduce((sum, item) => sum + parseFloat(item.percentage), 0) / filteredData.length).toFixed(2)
        : 0;

      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Average Percentage: ${avgPercentage}%`, 14, doc.lastAutoTable.finalY + 10);

      doc.save("student_marks_report.pdf");
    } catch (error) {
      console.error("PDF generation failed", error);
    } finally {
      setGeneratingPDF(false);
    }
  };

  // Get unique subjects and teams for filters
  const allSubjects = [...new Set(transformedData.map(item => item.subject))].sort();
  const allTeams = [...new Set(transformedData.map(item => item.team))].sort();

  // Calculate performance stats
  const calculateStats = () => {
    const stats = {
      totalSubjects: 0,
      averagePercentage: 0,
      bestSubject: { name: "", percentage: 0 },
      worstSubject: { name: "", percentage: 100 }
    };

    if (filteredData.length === 0) return stats;

    // Group by subject
    const subjectGroups = {};
    filteredData.forEach(item => {
      if (!subjectGroups[item.subject]) {
        subjectGroups[item.subject] = [];
      }
      subjectGroups[item.subject].push(parseFloat(item.percentage));
    });

    // Calculate averages
    let totalPercentage = 0;
    Object.entries(subjectGroups).forEach(([subject, percentages]) => {
      const avg = percentages.reduce((a, b) => a + b, 0) / percentages.length;
      totalPercentage += avg;
      
      if (avg > stats.bestSubject.percentage) {
        stats.bestSubject = { name: subject, percentage: avg };
      }
      
      if (avg < stats.worstSubject.percentage) {
        stats.worstSubject = { name: subject, percentage: avg };
      }
    });

    stats.totalSubjects = Object.keys(subjectGroups).length;
    stats.averagePercentage = (totalPercentage / stats.totalSubjects).toFixed(2);
    
    return stats;
  };

  const stats = calculateStats();

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
                📊 Your Academic Performance
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Detailed view of your marks across all subjects
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDownloadPDF}
                disabled={generatingPDF || filteredData.length === 0}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow flex items-center gap-2 ${
                  generatingPDF || filteredData.length === 0 ? "opacity-70 cursor-not-allowed" : ""
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
                    Download Report
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
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          {/* Performance Stats */}
          {filteredData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-4 rounded-lg border border-blue-500/20">
                <div className="text-sm text-blue-300">Subjects</div>
                <div className="text-2xl font-bold mt-1">{stats.totalSubjects}</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-4 rounded-lg border border-green-500/20">
                <div className="text-sm text-green-300">Avg Percentage</div>
                <div className="text-2xl font-bold mt-1">{stats.averagePercentage}%</div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 p-4 rounded-lg border border-yellow-500/20">
                <div className="text-sm text-yellow-300">Best Subject</div>
                <div className="text-xl font-bold mt-1 truncate">{stats.bestSubject.name}</div>
                <div className="text-sm">{stats.bestSubject.percentage.toFixed(2)}%</div>
              </div>
              
              <div className="bg-gradient-to-br from-red-900/30 to-rose-900/30 p-4 rounded-lg border border-red-500/20">
                <div className="text-sm text-red-300">Needs Improvement</div>
                <div className="text-xl font-bold mt-1 truncate">{stats.worstSubject.name}</div>
                <div className="text-sm">{stats.worstSubject.percentage.toFixed(2)}%</div>
              </div>
            </div>
          )}

          {/* Marks Table */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredData.length === 0 ? (
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
            <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
              <table className="w-full text-sm">
                <thead className="text-left bg-gray-800 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 font-medium text-gray-300">Subject</th>
                    <th className="px-4 py-3 font-medium text-gray-300">Team</th>
                    <th className="px-4 py-3 font-medium text-gray-300">Date</th>
                    <th className="px-4 py-3 font-medium text-gray-300">Marks</th>
                    <th className="px-4 py-3 font-medium text-gray-300">Total</th>
                    <th className="px-4 py-3 font-medium text-gray-300">Percentage</th>
                    <th className="px-4 py-3 font-medium text-gray-300">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredData.map((item) => {
                    const percentage = parseFloat(item.percentage);
                    return (
                      <tr key={item.id} className="hover:bg-gray-800/50">
                        <td className="px-4 py-3 font-medium">{item.subject}</td>
                        <td className="px-4 py-3">{item.team}</td>
                        <td className="px-4 py-3 text-gray-400">{item.date}</td>
                        <td className="px-4 py-3 font-bold">{item.marks}</td>
                        <td className="px-4 py-3">{item.total}</td>
                        <td className="px-4 py-3">
                          <span className={`font-bold ${percentage >= 80 ? 'text-green-400' :
                            percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {item.percentage}%
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${percentage >= 80 ? 'bg-green-500' :
                                  percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(100, percentage)}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs">
                              {percentage >= 80 ? 'Excellent' : 
                               percentage >= 60 ? 'Good' : 'Needs Improvement'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentMarksSection;