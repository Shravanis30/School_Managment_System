
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';
// import { FaBell } from 'react-icons/fa';

// const resultCategory = 'Final Result';


// const tabs = ['Syllabus', 'Time-Table', 'Result'];

// const AdminAcademics = () => {
//   const [uploadedSyllabus, setUploadedSyllabus] = useState({});
//   const [syllabusFile, setSyllabusFile] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [activeSyllabusClass, setActiveSyllabusClass] = useState('');

//   const [uploadedTimetables, setUploadedTimetables] = useState({});
//   const [newTimetableEntries, setNewTimetableEntries] = useState([
//     { day: 'Monday', periods: ['', '', '', '', '', ''] },
//     { day: 'Tuesday', periods: ['', '', '', '', '', ''] },
//     { day: 'Wednesday', periods: ['', '', '', '', '', ''] },
//     { day: 'Thursday', periods: ['', '', '', '', '', ''] },
//     { day: 'Friday', periods: ['', '', '', '', '', ''] },
//     { day: 'Saturday', periods: ['', '', '', '', '', ''] }
//   ]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalClass, setModalClass] = useState('');
//   const [classOptions, setClassOptions] = useState([]);
//   const [selectedClass, setSelectedClass] = useState('');
//   const [activeTab, setActiveTab] = useState('Subject');
//   const [results, setResults] = useState({});
//   const [newResults, setNewResults] = useState({});
//   const [students, setStudents] = useState([]);
//   const BACKEND_BASE = 'http://localhost:5000';

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, {
//           credentials: 'include',
//         });
//         const data = await response.json();
//         const classNames = data.map(cls => cls.name);
//         setClassOptions(classNames);
//         if (classNames.length > 0) {
//           setSelectedClass(classNames[0]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch class list", error);
//       }
//     };
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     if (!selectedClass) return;

//     // const fetchStudents = async () => {
//     //   try {
//     //     const res = await fetch(`/api/syllabus/${selectedClass.replace('Class ', '')}`, {
//     //       credentials: 'include'
//     //     });
//     //     if (res.ok) {
//     //       const data = await res.json();
//     //       const names = data.map(std => std.name);
//     //       setStudents(names);
//     //     } else {
//     //       setStudents([]);
//     //     }
//     //   } catch (err) {
//     //     console.error("Error fetching students", err);
//     //     setStudents([]);
//     //   }
//     // };

//     const fetchStudents = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/students/by-class-name/${selectedClass}`, {
//           credentials: 'include',
//         });

//         const data = await res.json();

//         if (!Array.isArray(data)) {
//           console.error("Expected array, got:", data);
//           return;
//         }

//         // const studentNames = data.map((s) => s.name);
//         // setStudents(studentNames);
//         setStudents(data); // Full student objects with _id and name

//       } catch (err) {
//         console.error("Fetch students error", err);
//       }
//     };


//     const fetchSyllabus = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/syllabus/${selectedClass.replace('Class ', '')}`, {
//           credentials: 'include',
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setUploadedSyllabus(prev => ({
//             ...prev,
//             [selectedClass]: { url: data.syllabusURL },
//           }));
//         } else if (res.status === 404) {
//           setUploadedSyllabus(prev => ({
//             ...prev,
//             [selectedClass]: null,
//           }));
//         }
//       } catch (err) {
//         console.error("Fetch syllabus error", err);
//       }
//     };



//     const fetchTimetable = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/timetable/${selectedClass}`, {
//           credentials: 'include',
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setUploadedTimetables(prev => ({
//             ...prev,
//             [selectedClass]: data.entries,
//           }));
//         } else if (res.status === 404) {
//           setUploadedTimetables(prev => ({
//             ...prev,
//             [selectedClass]: [],
//           }));
//         }
//       } catch (err) {
//         console.error("Fetch timetable error", err);
//       }
//     };

//     fetchStudents();
//     fetchSyllabus();
//     fetchTimetable();
//   }, [selectedClass]);
//   const handleTimetableSubmit = async () => {
//     const payload = {
//       class: selectedClass.replace('Class ', ''),
//       entries: newTimetableEntries,
//     };

//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/timetable`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: 'include', // ✅ <== important
//         body: JSON.stringify(payload),
//       });
//       if (res.ok) {
//         const updated = { ...uploadedTimetables, [selectedClass]: newTimetableEntries };
//         setUploadedTimetables(updated);
//         setNewTimetableEntries([
//           { day: 'Monday', periods: ['', '', '', '', '', ''] },
//           { day: 'Tuesday', periods: ['', '', '', '', '', ''] },
//           { day: 'Wednesday', periods: ['', '', '', '', '', ''] },
//           { day: 'Thursday', periods: ['', '', '', '', '', ''] },
//           { day: 'Friday', periods: ['', '', '', '', '', ''] },
//           { day: 'Saturday', periods: ['', '', '', '', '', ''] }
//         ]);
//       }
//     } catch (err) {
//       console.error("Timetable upload error", err);
//     }
//   };

//   const handleTimetableInput = (dayIndex, periodIndex, value) => {
//     const updatedEntries = [...newTimetableEntries];
//     updatedEntries[dayIndex].periods[periodIndex] = value;
//     setNewTimetableEntries(updatedEntries);
//   };


//   const handleDeleteTimetable = async (cls) => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/timetable/${cls.replace('Class ', '')}`, {
//         method: "DELETE",
//         credentials: 'include',
//       });
//       if (res.ok) {
//         const updated = { ...uploadedTimetables };
//         delete updated[cls];
//         setUploadedTimetables(updated);
//         alert(`Timetable for Class ${cls} deleted.`);
//       } else {
//         alert("Failed to delete timetable.");
//       }
//     } catch (err) {
//       console.error("Delete timetable error", err);
//     }
//   };


//   const handleResultChange = (studentId, file) => {
//     setNewResults((prev) => ({
//       ...prev,
//       [studentId]: file,
//     }));
//   };



//   const handleFileChange = (studentId, term, e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setNewResults((prev) => ({
//       ...prev,
//       [studentId]: {
//         ...prev[studentId],
//         [term]: file,
//       },
//     }));
//   };


//   const handleSaveResults = async () => {
//     try {
//       for (const [studentId, file] of Object.entries(newResults)) {
//         const formData = new FormData();
//         formData.append("file", file);

//         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/results/${encodeURIComponent(selectedClass)}/${studentId}`, {
//           method: "POST",
//           credentials: "include",
//           body: formData
//         });

//         if (!res.ok) {
//           const errorText = await res.text();
//           throw new Error(`Failed for ${studentId}: ${errorText}`);
//         }
//       }

//       alert("Results uploaded successfully");
//       setNewResults({});
//     } catch (err) {
//       console.error(err);
//       alert("Failed to upload some results");
//     }
//   };



//   const handleSyllabusUpload = async () => {
//     if (!syllabusFile) return;

//     const formData = new FormData();
//     formData.append('class', selectedClass);
//     formData.append('syllabus', syllabusFile);

//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/syllabus/upload`, {
//         method: "POST",
//         credentials: 'include', // ✅ <== important
//         body: formData
//       });

//       if (res.ok) {
//         const data = await res.json();
//         const updated = { ...uploadedSyllabus, [selectedClass]: { name: syllabusFile.name, url: data.url } };
//         setUploadedSyllabus(updated);
//         setSyllabusFile(null);
//       }
//     } catch (err) {
//       console.error("Syllabus upload error", err);
//     }
//   };


//   const openSyllabusModal = (cls) => {
//     if (uploadedSyllabus[cls]) {
//       setActiveSyllabusClass(cls);
//       setIsModalOpen(true);
//     }
//   };

//   // const closeModal = () => {
//   //   setIsModalOpen(false);
//   //   setActiveSyllabusClass('');
//   // };

//   const openTimetableModal = (cls) => {
//     setModalClass(cls);
//     setModalOpen(true);
//   };

//   const closeModal1 = () => {
//     setModalOpen(false);
//     setModalClass('');
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {

//       case 'Syllabus':
//         return (
//           <div className="bg-gray-900 p-4 rounded relative">
//             <h3 className="text-lg font-semibold mb-4">Upload Syllabus PDF for Class {selectedClass}</h3>
//             <input
//               type="file"
//               onChange={(e) => setSyllabusFile(e.target.files[0])}
//               accept="application/pdf"
//               className="mb-2"
//             />
//             <button
//               onClick={handleSyllabusUpload}
//               className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
//             >
//               Upload
//             </button>
//             <div className="mt-6">
//               <h4 className="text-lg font-semibold mb-2">Syllabus Upload Status</h4>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {classOptions.map((cls) => (
//                   <div
//                     key={cls}
//                     className="bg-gray-800 p-4 rounded text-center cursor-pointer hover:bg-gray-700"
//                     onClick={() => openSyllabusModal(cls)}
//                   >
//                     <h5 className="font-bold mb-2">Class {cls}</h5>
//                     {uploadedSyllabus[cls] ? (
//                       <span className="text-green-400 underline">View Syllabus</span>
//                     ) : (
//                       <span className="text-gray-400">Not Uploaded</span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {activeSyllabusClass && uploadedSyllabus[activeSyllabusClass] && (
//               <div className="mt-6 text-center">
//                 <h4 className="text-lg font-semibold mb-4">Download Syllabus for Class {activeSyllabusClass}</h4>
//                 <a
//                   href={`${uploadedSyllabus[activeSyllabusClass].url}`}
//                   download
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-block transition"
//                 >
//                   📥 Download Syllabus
//                 </a>
//               </div>
//             )}

//           </div>
//         );
//       case 'Time-Table':
//         return (
//           <div className="bg-gray-900 p-4 rounded">
//             <h3 className="text-lg font-semibold mb-4">Enter Time-Table for Class {selectedClass}</h3>
//             {newTimetableEntries.map((entry, dayIdx) => (
//               <div key={entry.day} className="mb-4">
//                 <h4 className="mb-2 font-semibold">{entry.day}</h4>
//                 <div className="grid grid-cols-6 gap-2">
//                   {entry.periods.map((period, periodIdx) => (
//                     <input
//                       key={periodIdx}
//                       type="text"
//                       placeholder={`P${periodIdx + 1}`}
//                       value={period}
//                       onChange={(e) => handleTimetableInput(dayIdx, periodIdx, e.target.value)}
//                       className="p-2 rounded bg-gray-800 text-white"
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))}
//             <button onClick={handleTimetableSubmit} className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700">Save Time-Table</button>
//             <div className="mt-6">
//               <h4 className="text-lg font-semibold mb-2">Class-wise Time-Table View</h4>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {classOptions.map((cls) => (
//                   <div key={cls} className="bg-gray-800 p-4 rounded text-center hover:bg-gray-700">
//                     <h5 className="font-bold mb-2">Class {cls}</h5>
//                     {uploadedTimetables[cls] ? (
//                       <div className="space-y-1">
//                         <span
//                           className="text-green-400 underline block cursor-pointer"
//                           onClick={() => openTimetableModal(cls)}
//                         >
//                           View Time-Table
//                         </span>
//                         <button
//                           onClick={() => handleDeleteTimetable(cls)}
//                           className="text-red-400 text-sm hover:text-red-500 underline"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     ) : (
//                       <span className="text-gray-400">Not Uploaded</span>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {modalOpen && uploadedTimetables[modalClass] && (
//               <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//                 <div className="bg-white text-black rounded p-6 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 relative">
//                   <button
//                     onClick={closeModal1}
//                     className="absolute top-2 right-3 text-black text-xl font-bold hover:text-red-600"
//                   >
//                     &times;
//                   </button>
//                   <h4 className="text-lg font-bold mb-4">Time-Table for Class {modalClass}</h4>
//                   <table className="w-full border border-gray-300 text-sm">
//                     <thead className="bg-gray-200">
//                       <tr>
//                         <th className="px-2 py-1 border">Day</th>
//                         {[...Array(6)].map((_, idx) => (
//                           <th key={idx} className="px-2 py-1 border">P{idx + 1}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {uploadedTimetables[modalClass].map((row, i) => (
//                         <tr key={i}>
//                           <td className="px-2 py-1 border font-semibold">{row.day}</td>
//                           {row.periods.map((p, idx) => (
//                             <td key={idx} className="px-2 py-1 border">{p}</td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>

//         );
//       case 'Result':
//         return (
//           <div className="bg-gray-900 p-4 rounded">
//             <h3 className="text-lg font-semibold mb-4">Post Results for Class {selectedClass}</h3>
//             {/* {students.map((student) => (
//               <div key={student} className="mb-4">
//                 <h4 className="text-md font-bold mb-2">{student}</h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
//                   {resultCategories.map((cat) => (
//                     <input
//                       key={cat}
//                       type="text"
//                       placeholder={`${cat} Marks`}
//                       className="p-2 bg-gray-800 text-white rounded"
//                       value={newResults[student]?.[cat] || ''}
//                       onChange={(e) => handleResultChange(student, cat, e.target.value)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))} */}

//             {students.map((studentObj) => (
//               <div key={studentObj._id} className="mb-4">
//                 <h4 className="text-md font-bold mb-2">{studentObj.name}</h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
//                   <input
//                     type="file"
//                     accept="application/pdf"
//                     className="p-2 bg-gray-800 text-white rounded"
//                     onChange={(e) => handleResultChange(studentObj._id, e.target.files[0])}
//                   />

//                 </div>
//               </div>
//             ))}


//             <button
//               onClick={handleSaveResults}
//               className="mt-4 bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
//             >
//               Save Results
//             </button>
//             <div className="mt-6">
//               <h4 className="text-lg font-semibold mb-2">Result Preview</h4>
//               {(results[selectedClass] && Object.entries(results[selectedClass]).length) ? (
//                 <div className="space-y-4">
//                   {Object.entries(results[selectedClass]).map(([student, res]) => (
//                     <div key={student} className="bg-gray-800 p-4 rounded">
//                       <h5 className="font-bold mb-2">{student}</h5>
//                       <ul>
//                         {resultCategories.map((cat) => (
//                           <li key={cat} className="text-gray-300">{cat}: {res[cat]}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-400">No results posted for this class.</p>
//               )}
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };
//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-gray-900/60 to-black/30 blur-xl -z-10 animate-pulse" />
//       <Sidebar role="admin" />
//       <div className="flex-1 p-6 space-y-10">
//         <Header />
//         <div className="flex flex-col mt-10 lg:flex-row justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold mb-4 lg:mb-0 text-white">Academics</h2>
//           <select
//             value={selectedClass}
//             onChange={(e) => setSelectedClass(e.target.value)}
//             className="bg-white/50 backdrop-blur-md text-black px-3 py-2 rounded border border-white/40 shadow-lg"
//           >
//             <option value="">Select Class</option>
//             {classOptions.map((cls) => (
//               <option key={cls} value={cls}>{`${cls}`}</option>
//             ))}
//           </select>
//         </div>

//         {/* Tabs */}
//         <div className="flex flex-wrap gap-3 mb-6">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-5 py-2 rounded-full transition duration-200 text-sm font-semibold shadow-md border border-white/10 backdrop-blur-md ${activeTab === tab
//                 ? 'bg-white text-black'
//                 : 'bg-white/10 hover:bg-white/20 text-white'
//                 }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content Wrapper */}
//         <div className="rounded-xl p-4 bg-white/5 shadow-lg border border-white/10 backdrop-blur-md">
//           {renderTabContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAcademics;


import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { FaDownload, FaTrash, FaTimes } from 'react-icons/fa';

const AdminAcademics = () => {
  // Syllabus state
  const [uploadedSyllabus, setUploadedSyllabus] = useState({});
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [activeSyllabusClass, setActiveSyllabusClass] = useState('');
  
  // Timetable state
  const [uploadedTimetables, setUploadedTimetables] = useState({});
  const [newTimetableEntries, setNewTimetableEntries] = useState(
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => ({
      day,
      periods: Array(6).fill('')
    }))
  );
  const [activeTimetableClass, setActiveTimetableClass] = useState('');
  
  // Results state
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [activeTab, setActiveTab] = useState('Syllabus');
  const [students, setStudents] = useState([]);
  const [newResults, setNewResults] = useState({});
  
  // Modal states
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);

  const normalizeClassName = (className) => className.replace(/^Class\s*/, '');

  // Fetch classes on component mount
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, {
          credentials: 'include',
        });
        const data = await response.json();
        const classNames = data.map(cls => cls.name);
        setClassOptions(classNames);
        if (classNames.length > 0) {
          setSelectedClass(classNames[0]);
        }
      } catch (error) {
        console.error("Failed to fetch class list", error);
      }
    };
    fetchClasses();
  }, []);

  // Fetch data when selected class changes
  useEffect(() => {
    if (!selectedClass) return;

    const fetchData = async () => {
      try {
        // Fetch students
        const studentsRes = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/students/by-class-name/${selectedClass}`, 
          { credentials: 'include' }
        );
        const studentsData = await studentsRes.json();
        setStudents(studentsData);

        // Fetch syllabus
        const syllabusRes = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/syllabus/${normalizeClassName(selectedClass)}`,
          { credentials: 'include' }
        );
        if (syllabusRes.ok) {
          const syllabusData = await syllabusRes.json();
          setUploadedSyllabus(prev => ({
            ...prev,
            [selectedClass]: syllabusData
          }));
        } else if (syllabusRes.status === 404) {
          setUploadedSyllabus(prev => ({
            ...prev,
            [selectedClass]: null
          }));
        }

        // Fetch timetable
        const timetableRes = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/timetable/${normalizeClassName(selectedClass)}`,
          { credentials: 'include' }
        );
        if (timetableRes.ok) {
          const timetableData = await timetableRes.json();
          setUploadedTimetables(prev => ({
            ...prev,
            [selectedClass]: timetableData.entries
          }));
          
          // Pre-fill form with existing timetable
          if (timetableData.entries && timetableData.entries.length > 0) {
            setNewTimetableEntries(timetableData.entries);
          }
        } else if (timetableRes.status === 404) {
          setUploadedTimetables(prev => ({
            ...prev,
            [selectedClass]: []
          }));
        }
      } catch (err) {
        console.error("Fetch data error", err);
      }
    };

    fetchData();
  }, [selectedClass]);

  // Syllabus handlers
  const handleSyllabusUpload = async () => {
    if (!syllabusFile || !selectedClass) return;

    const formData = new FormData();
    formData.append('class', normalizeClassName(selectedClass));
    formData.append('syllabus', syllabusFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/syllabus/upload`, {
        method: "POST",
        credentials: 'include',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        setUploadedSyllabus(prev => ({
          ...prev,
          [selectedClass]: data
        }));
        setSyllabusFile(null);
        alert('Syllabus uploaded successfully!');
      } else {
        const error = await res.json();
        throw new Error(error.message || 'Upload failed');
      }
    } catch (err) {
      console.error("Syllabus upload error", err);
      alert(err.message || "Failed to upload syllabus");
    }
  };

  const handleDeleteSyllabus = async () => {
    if (!activeSyllabusClass) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/syllabus/${normalizeClassName(activeSyllabusClass)}`, 
        { 
          method: "DELETE",
          credentials: 'include'
        }
      );

      if (res.ok) {
        setUploadedSyllabus(prev => {
          const updated = {...prev};
          delete updated[activeSyllabusClass];
          return updated;
        });
        setIsSyllabusModalOpen(false);
        alert('Syllabus deleted successfully!');
      } else {
        throw new Error('Failed to delete syllabus');
      }
    } catch (err) {
      console.error("Delete syllabus error", err);
      alert(err.message || "Failed to delete syllabus");
    }
  };

  // Timetable handlers
  const handleTimetableInput = (dayIndex, periodIndex, value) => {
    const updatedEntries = [...newTimetableEntries];
    updatedEntries[dayIndex].periods[periodIndex] = value;
    setNewTimetableEntries(updatedEntries);
  };

  const handleTimetableSubmit = async () => {
    const payload = {
      class: normalizeClassName(selectedClass),
      entries: newTimetableEntries
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/timetable`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        const data = await res.json();
        setUploadedTimetables(prev => ({
          ...prev,
          [selectedClass]: data.entries
        }));
        alert('Timetable saved successfully!');
      } else {
        throw new Error('Failed to save timetable');
      }
    } catch (err) {
      console.error("Timetable upload error", err);
      alert(err.message || "Failed to save timetable");
    }
  };

  const handleDeleteTimetable = async () => {
    if (!activeTimetableClass) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/timetable/${normalizeClassName(activeTimetableClass)}`, 
        { 
          method: "DELETE",
          credentials: 'include'
        }
      );

      if (res.ok) {
        setUploadedTimetables(prev => {
          const updated = {...prev};
          delete updated[activeTimetableClass];
          return updated;
        });
        setIsTimetableModalOpen(false);
        alert('Timetable deleted successfully!');
      } else {
        throw new Error('Failed to delete timetable');
      }
    } catch (err) {
      console.error("Delete timetable error", err);
      alert(err.message || "Failed to delete timetable");
    }
  };

  // Results handlers
  const handleResultChange = (studentId, file) => {
    setNewResults(prev => ({
      ...prev,
      [studentId]: file
    }));
  };

  const handleSaveResults = async () => {
    try {
      for (const [studentId, file] of Object.entries(newResults)) {
        if (!file) continue;

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/results/${normalizeClassName(selectedClass)}/${studentId}`, 
          {
            method: "POST",
            credentials: "include",
            body: formData
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed for student ${studentId}: ${errorText}`);
        }
      }

      alert("Results uploaded successfully");
      setNewResults({});
    } catch (err) {
      console.error(err);
      alert("Failed to upload results: " + err.message);
    }
  };

  // Render helpers
  const renderSyllabusTab = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Upload Syllabus for {selectedClass}</h3>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Select PDF File
            </label>
            <input
              type="file"
              onChange={(e) => setSyllabusFile(e.target.files[0])}
              accept="application/pdf"
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700"
            />
          </div>
          <button
            onClick={handleSyllabusUpload}
            disabled={!syllabusFile}
            className="px-6 py-3 bg-green-600 rounded-lg text-white font-semibold 
              hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload Syllabus
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Class Syllabus Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {classOptions.map((cls) => (
            <div
              key={cls}
              className={`p-4 rounded-lg border ${
                uploadedSyllabus[cls] 
                  ? "border-green-500 bg-green-900/20" 
                  : "border-gray-700 bg-gray-900/50"
              } transition hover:scale-[1.02] cursor-pointer`}
              onClick={() => {
                if (uploadedSyllabus[cls]) {
                  setActiveSyllabusClass(cls);
                  setIsSyllabusModalOpen(true);
                }
              }}
            >
              <div className="flex justify-between items-center">
                <h5 className="font-bold text-lg">{cls}</h5>
                <span className={`px-2 py-1 rounded text-xs ${
                  uploadedSyllabus[cls] 
                    ? "bg-green-800 text-green-200" 
                    : "bg-gray-700 text-gray-400"
                }`}>
                  {uploadedSyllabus[cls] ? "Uploaded" : "Not Uploaded"}
                </span>
              </div>
              <div className="mt-3">
                {uploadedSyllabus[cls] ? (
                  <span className="text-blue-400 flex items-center">
                    <FaDownload className="mr-2" /> Click to view
                  </span>
                ) : (
                  <span className="text-gray-500">No syllabus available</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimetableTab = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Edit Timetable for {selectedClass}</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 text-left border border-gray-600">Day</th>
                {[1, 2, 3, 4, 5, 6].map(period => (
                  <th key={period} className="p-2 border border-gray-600">Period {period}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {newTimetableEntries.map((entry, dayIdx) => (
                <tr key={entry.day} className="hover:bg-gray-750">
                  <td className="p-2 font-semibold border border-gray-700">{entry.day}</td>
                  {entry.periods.map((period, periodIdx) => (
                    <td key={periodIdx} className="border border-gray-700">
                      <input
                        type="text"
                        value={period}
                        onChange={(e) => handleTimetableInput(dayIdx, periodIdx, e.target.value)}
                        className="w-full p-2 bg-gray-900 focus:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder={`Subject ${periodIdx + 1}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleTimetableSubmit}
            className="px-6 py-3 bg-green-600 rounded-lg text-white font-semibold hover:bg-green-700 transition"
          >
            Save Timetable
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Class Timetables</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {classOptions.map((cls) => (
            <div
              key={cls}
              className={`p-4 rounded-lg border ${
                uploadedTimetables[cls]?.length > 0
                  ? "border-blue-500 bg-blue-900/20" 
                  : "border-gray-700 bg-gray-900/50"
              } transition hover:scale-[1.02]`}
            >
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-bold text-lg">{cls}</h5>
                <span className={`px-2 py-1 rounded text-xs ${
                  uploadedTimetables[cls]?.length > 0
                    ? "bg-blue-800 text-blue-200" 
                    : "bg-gray-700 text-gray-400"
                }`}>
                  {uploadedTimetables[cls]?.length > 0 ? "Uploaded" : "Not Uploaded"}
                </span>
              </div>
              
              {uploadedTimetables[cls]?.length > 0 ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setActiveTimetableClass(cls);
                      setIsTimetableModalOpen(true);
                    }}
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setActiveTimetableClass(cls);
                      handleDeleteTimetable();
                    }}
                    className="py-2 px-3 bg-red-600 hover:bg-red-700 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No timetable available</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderResultsTab = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Upload Results for {selectedClass}</h3>
        
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <p className="text-gray-400 mb-3">Instructions:</p>
          <ul className="list-disc pl-5 text-gray-300 space-y-1 text-sm">
            <li>Upload PDF result files for each student</li>
            <li>Files should be named as: [StudentName]_[Term].pdf</li>
            <li>Only PDF files are accepted</li>
            <li>Click "Save Results" when finished</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((student) => (
            <div key={student._id} className="bg-gray-900 p-4 rounded-lg">
              <h4 className="font-bold mb-3 flex items-center">
                <span className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  {student.name.charAt(0)}
                </span>
                {student.name}
              </h4>
              <div className="flex items-center">
                <label className="flex-1 mr-2">
                  <span className="sr-only">Upload result for {student.name}</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="block w-full text-sm text-gray-400
                      file:mr-2 file:py-1.5 file:px-3
                      file:rounded file:border-0
                      file:text-xs file:font-medium
                      file:bg-gray-700 file:text-gray-300
                      hover:file:bg-gray-600"
                    onChange={(e) => handleResultChange(student._id, e.target.files[0])}
                  />
                </label>
                {newResults[student._id] && (
                  <span className="text-green-400 text-sm">Ready</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">
          {Object.keys(newResults).length} file(s) ready for upload
        </p>
        <button
          onClick={handleSaveResults}
          disabled={Object.keys(newResults).length === 0}
          className="px-6 py-3 bg-green-600 rounded-lg text-white font-semibold 
            hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Results
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Sidebar role="admin" />
      
      <div className="flex-1 p-4 md:p-8">
        <Header />
        
        <div className="max-w-7xl mx-auto mt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 lg:mb-0">Academic Management</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-64"
              >
                <option value="">Select Class</option>
                {classOptions.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
              
              <div className="flex bg-gray-800 rounded-lg p-1">
                {['Syllabus', 'Time-Table', 'Result'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-700 shadow-2xl">
            {activeTab === 'Syllabus' && renderSyllabusTab()}
            {activeTab === 'Time-Table' && renderTimetableTab()}
            {activeTab === 'Result' && renderResultsTab()}
          </div>
        </div>
      </div>
      
      {/* Syllabus Modal */}
      {isSyllabusModalOpen && uploadedSyllabus[activeSyllabusClass] && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full border border-gray-700 shadow-2xl">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                Syllabus for {activeSyllabusClass}
              </h3>
              <button 
                onClick={() => setIsSyllabusModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-xl w-64 h-64 flex items-center justify-center">
                  <span className="text-gray-500">PDF Preview</span>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <a
                  href={uploadedSyllabus[activeSyllabusClass].syllabusURL}
                  download
                  className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold flex items-center hover:bg-blue-700"
                >
                  <FaDownload className="mr-2" /> Download Syllabus
                </a>
                
                <button
                  onClick={handleDeleteSyllabus}
                  className="px-6 py-3 bg-red-600 rounded-lg text-white font-semibold flex items-center hover:bg-red-700"
                >
                  <FaTrash className="mr-2" /> Delete Syllabus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Timetable Modal */}
      {isTimetableModalOpen && uploadedTimetables[activeTimetableClass] && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full border border-gray-700 shadow-2xl">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                Timetable for {activeTimetableClass}
              </h3>
              <button 
                onClick={() => setIsTimetableModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="p-4 overflow-auto max-h-[70vh]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-3 text-left border border-gray-600">Day</th>
                    {[1, 2, 3, 4, 5, 6].map(period => (
                      <th key={period} className="p-3 border border-gray-600">Period {period}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {uploadedTimetables[activeTimetableClass].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-750">
                      <td className="p-3 font-semibold border border-gray-700">{row.day}</td>
                      {row.periods.map((p, idx) => (
                        <td key={idx} className="p-3 border border-gray-700">{p}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAcademics;