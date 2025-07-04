



// import React, { useEffect, useState } from "react";
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';
// import axios from 'axios';

// axios.defaults.withCredentials = true;

// const TeacherAttendance = () => {
//   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [academicYear, setAcademicYear] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedAttendance, setSelectedAttendance] = useState({});
//   const [currentMonth, setCurrentMonth] = useState("July");
//   const [currentYear, setCurrentYear] = useState(2025);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await axios.get('/api/classes');
//         setClasses(res.data);
//       } catch (err) {
//         console.error('Error fetching classes:', err.response?.data || err.message);
//       }
//     };
//     fetchClasses();
//   }, []);

//   // Add this useEffect to automatically set academic year
//   useEffect(() => {
//     if (selectedDate) {
//       const dateObj = new Date(selectedDate);
//       const year = dateObj.getFullYear();
//       const month = dateObj.getMonth();

//       // Academic year: April (month 3) to March (month 2)
//       const academicYear = month < 3
//         ? `${year - 1}-${year}`
//         : `${year}-${year + 1}`;

//       setAcademicYear(academicYear);
//       console.log("Auto-set academic year:", academicYear);
//     }
//   }, [selectedDate]);



//   useEffect(() => {
//     if (selectedClass?.name && selectedDate && academicYear) {
//       fetchStudentsByClass();
//     }
//   }, [selectedClass, selectedDate, academicYear]);

//   const fetchStudentsByClass = async (dateToUse = selectedDate) => {
//     try {
//       // Use class NAME instead of class ID
//       const res = await axios.get(`/api/students/class/${selectedClass.name}`);
//       setStudents(Array.isArray(res.data) ? res.data : []);
//       setSelectedAttendance({});
//     } catch (err) {
//       console.error('Error fetching students:', err.message);
//     }
//   };

//   const handleAttendanceChange = async (studentId, status) => {
//     if (saving) return;
//     setSaving(true);
//     // Validate required fields
//     if (!selectedSubject) {
//       alert("Please select a subject first");
//       return;
//     }

//     const updated = { ...selectedAttendance, [studentId]: status };
//     setSelectedAttendance(updated);

//     try {
//       const payload = {
//         studentId,
//         classId: selectedClass._id,
//         subject: selectedSubject,
//         date: selectedDate,
//         status,
//         academicYear,
//       };

//       console.log("Sending attendance payload:", payload);

//       await axios.post('/api/attendance/mark', payload);
//     } catch (error) {
//       console.error("Failed to mark attendance:", error.response?.data || error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const generateCalendarDates = () => {
//     const months = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
//     const monthIndex = months.indexOf(currentMonth);
//     const date = new Date(currentYear, monthIndex, 1);
//     const firstDayOfWeek = date.getDay();
//     const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
//     const dates = [];

//     for (let i = 0; i < firstDayOfWeek; i++) dates.push({ day: "", disabled: true });
//     for (let day = 1; day <= daysInMonth; day++) {
//       const fullDate = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//       dates.push({ day: day.toString(), fullDate, disabled: false });
//     }
//     while (dates.length < 42) dates.push({ day: "", disabled: true });

//     return dates;
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="teacher" />
//       <div className="flex-1 p-6">
//         <Header />

//         {/* Top Filters */}
//         <div className="mb-6 bg-white/10 p-4 rounded-xl border border-white/10 grid grid-cols-3 gap-4 backdrop-blur">
//           <div>
//             <label className="block text-sm mb-1">Select Class</label>
//             <select onChange={e => {
//               const selected = classes.find(cls => cls._id === e.target.value);
//               setSelectedClass(selected || null);
//             }} className="w-full p-2 bg-gray-800 rounded">
//               <option value="">Select</option>
//               {classes.map(cls => (
//                 <option key={cls._id} value={cls._id}>{cls.name}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Subject</label>
//             <select onChange={e => setSelectedSubject(e.target.value)} className="w-full p-2 bg-gray-800 rounded">
//               <option value="">Select</option>
//               {subjects.map(sub => (
//                 <option key={sub} value={sub}>{sub}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm mb-1">Academic Year</label>
//             <input
//               value={academicYear}
//               onChange={e => setAcademicYear(e.target.value)}
//               type="text"
//               placeholder="2024-2025"
//               className="w-full p-2 bg-gray-800 rounded"
//               readOnly
//             />
//           </div>
//         </div>

//         {/* Calendar */}
//         <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md max-w-2xl mb-8">
//           <div className="flex justify-between mb-4 text-white/80">
//             <h3 className="text-lg font-semibold">{currentMonth} {currentYear}</h3>
//             <div className="space-x-2">
//               <button onClick={() => {
//                 const months = [
//                   "January", "February", "March", "April", "May", "June",
//                   "July", "August", "September", "October", "November", "December"
//                 ];
//                 const index = months.indexOf(currentMonth);
//                 if (index === 0) {
//                   setCurrentYear(y => y - 1);
//                   setCurrentMonth("December");
//                 } else {
//                   setCurrentMonth(months[index - 1]);
//                 }
//               }}>◀</button>
//               <button onClick={() => {
//                 const months = [
//                   "January", "February", "March", "April", "May", "June",
//                   "July", "August", "September", "October", "November", "December"
//                 ];
//                 const index = months.indexOf(currentMonth);
//                 if (index === 11) {
//                   setCurrentYear(y => y + 1);
//                   setCurrentMonth("January");
//                 } else {
//                   setCurrentMonth(months[index + 1]);
//                 }
//               }}>▶</button>
//             </div>
//           </div>
//           <div className="grid grid-cols-7 gap-1 text-sm text-center text-white/70 mb-2">
//             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}
//           </div>
//           <div className="grid grid-cols-7 gap-1 text-center">
//             {generateCalendarDates().map((date, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => {
//                   if (!date.disabled) {
//                     setSelectedDate(date.fullDate);
//                     if (selectedClass?.name && academicYear) {
//                       fetchStudentsByClass(date.fullDate);
//                     }
//                   }
//                 }}
//                 className={`py-2 rounded-lg cursor-pointer ${date.disabled ? "text-gray-600" : selectedDate === date.fullDate ? "bg-purple-600 text-white" : "hover:bg-purple-700"}`}
//               >
//                 {date.day}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Attendance Table */}
//         {students.length > 0 && (
//           <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
//             <h3 className="text-lg font-semibold mb-4 text-white">👥 Attendance for {selectedDate}</h3>
//             <table className="w-full text-sm">
//               <thead className="bg-purple-700 text-white">
//                 <tr>
//                   <th className="p-2 text-left">Student</th>
//                   <th className="p-2">Present</th>
//                   <th className="p-2">Absent</th>
//                   <th className="p-2">Leave</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map(student => (
//                   <tr key={student._id} className="border-t border-white/10 hover:bg-white/10">
//                     <td className="p-2">{student.name}</td>
//                     {["present", "absent", "leave"].map(status => (
//                       <td key={status} className="p-2 text-center">
//                         <button
//                           onClick={() => handleAttendanceChange(student._id, status)}
//                           disabled={saving}
//                           className={`w-8 h-8 rounded-full transition ${selectedAttendance[student._id] === status
//                             ? "bg-purple-600"
//                             : "bg-gray-600"
//                             } ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
//                         >
//                           {saving ? "..." : selectedAttendance[student._id] === status ? "✓" : ""}
//                         </button>
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {students.length > 0 && selectedDate && !selectedSubject && (
//           <div className="bg-red-900/30 p-4 rounded-lg mb-4 flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <span>You must select a subject before marking attendance</span>
//           </div>
//         )}
//         {students.length > 0 && (
//           <div className="mb-4">
//             {Object.values(selectedAttendance).includes('duplicate') && (
//               <div className="bg-red-900/30 text-red-300 p-3 rounded-lg flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 Attendance already recorded for this date and subject
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeacherAttendance;


import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import axios from 'axios';

axios.defaults.withCredentials = true;

const TeacherAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAttendance, setSelectedAttendance] = useState({});
  const [currentMonth, setCurrentMonth] = useState("July");
  const [currentYear, setCurrentYear] = useState(2025);
  const [saving, setSaving] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get('/api/classes');
        setClasses(res.data);
      } catch (err) {
        console.error('Error fetching classes:', err.response?.data || err.message);
      }
    };
    fetchClasses();
  }, []);

  // Add this useEffect to automatically set academic year
  useEffect(() => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const day = dateObj.getDate();

      // Handle academic year transition (April 1st cutoff)
      const academicYear = month < 3 || (month === 3 && day < 1)
        ? `${year - 1}-${year}`
        : `${year}-${year + 1}`;

      setAcademicYear(academicYear);
    }
  }, [selectedDate]);

  // Fetch subjects when class is selected
  useEffect(() => {
    if (selectedClass) {
      // Assuming classes have subjects array
      setSubjects(selectedClass.subjects || []);
      setSelectedSubject("");
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass?.name && selectedDate && academicYear) {
      fetchStudentsByClass();
    }
  }, [selectedClass, selectedDate, academicYear]);

  const fetchStudentsByClass = async (dateToUse = selectedDate) => {
    try {
      setLoadingStudents(true);

      // Use class NAME instead of class ID
      const res = await axios.get(`/api/students/class/${selectedClass.name}`);
      setStudents(Array.isArray(res.data) ? res.data : []);
      setSelectedAttendance({});
    } catch (err) {
      console.error('Error fetching students:', err.message);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleAttendanceChange = async (studentId, status) => {
    // Add validation
    if (!selectedSubject) {
      alert("Please select a subject first");
      return;
    }
    if (!['present', 'absent', 'leave'].includes(status)) {
      console.error("Invalid status:", status);
      return;
    }

    const updated = { ...selectedAttendance, [studentId]: status };
    setSelectedAttendance(updated);

    try {
      const payload = {
        studentId,
        classId: selectedClass._id,
        subject: selectedSubject,
        date: selectedDate,
        status: status === 'leave' ? 'leave' : status, // Ensure consistent status
        academicYear,
      };

      console.log("Sending attendance payload:", payload);

      await axios.post('/api/attendance/mark', payload);
    } catch (error) {
      console.error("Failed to mark attendance:", error.response?.data || error.message);

      // Show user-friendly error
      if (error.response?.data?.message.includes('validation')) {
        alert('Invalid attendance data. Please check your inputs.');
      } else {
        alert('Failed to save attendance. Please try again.');
      }
    }

  };

  const generateCalendarDates = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = months.indexOf(currentMonth);
    const date = new Date(currentYear, monthIndex, 1);
    const firstDayOfWeek = date.getDay();
    const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
    const dates = [];

    for (let i = 0; i < firstDayOfWeek; i++) dates.push({ day: "", disabled: true });
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      dates.push({ day: day.toString(), fullDate, disabled: false });
    }
    while (dates.length < 42) dates.push({ day: "", disabled: true });

    return dates;
  };

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  // Set today's date on component mount
  useEffect(() => {
    const today = getTodayDate();
    setSelectedDate(today);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="teacher" />
      <div className="flex-1 p-6">
        <Header />

        {/* Top Filters */}
        <div className="mb-6 bg-white/10 p-4 rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 backdrop-blur">
          <div>
            <label className="block text-sm mb-1 text-blue-300">Select Class</label>
            <select
              onChange={e => {
                const selected = classes.find(cls => cls._id === e.target.value);
                setSelectedClass(selected || null);
              }}
              className="w-full p-2 bg-gray-800 rounded border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls._id} value={cls._id}>{cls.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-blue-300">Subject</label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Subject</option>
              {subjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-blue-300">Academic Year</label>
            <input
              value={academicYear}
              onChange={e => setAcademicYear(e.target.value)}
              type="text"
              placeholder="2024-2025"
              className="w-full p-2 bg-gray-800 rounded border border-white/10"
              readOnly
            />
          </div>
        </div>

        {/* Calendar Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Calendar */}
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md w-full lg:w-1/2 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-purple-300">{currentMonth} {currentYear}</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    const months = [
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ];
                    const index = months.indexOf(currentMonth);
                    if (index === 0) {
                      setCurrentYear(y => y - 1);
                      setCurrentMonth("December");
                    } else {
                      setCurrentMonth(months[index - 1]);
                    }
                  }}
                  className="p-2 bg-gray-800 rounded-full hover:bg-purple-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => {
                    setCurrentMonth(new Date().toLocaleString('default', { month: 'long' }));
                    setCurrentYear(new Date().getFullYear());
                    setSelectedDate(getTodayDate());
                  }}
                  className="text-sm bg-purple-700 px-3 py-1 rounded hover:bg-purple-600 transition"
                >
                  Today
                </button>

                <button
                  onClick={() => {
                    const months = [
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ];
                    const index = months.indexOf(currentMonth);
                    if (index === 11) {
                      setCurrentYear(y => y + 1);
                      setCurrentMonth("January");
                    } else {
                      setCurrentMonth(months[index + 1]);
                    }
                  }}
                  className="p-2 bg-gray-800 rounded-full hover:bg-purple-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-sm text-center text-white/70 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d} className="p-1 text-xs">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {generateCalendarDates().map((date, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (!date.disabled) {
                      setSelectedDate(date.fullDate);
                      if (selectedClass?.name && academicYear) {
                        fetchStudentsByClass(date.fullDate);
                      }
                    }
                  }}
                  className={`py-2 rounded-lg cursor-pointer transition-all ${date.disabled ? "text-gray-600" : selectedDate === date.fullDate ? "bg-purple-600 text-white" : "hover:bg-purple-700"}`}
                >
                  {date.day}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Selected: {selectedDate || "No date selected"}
              </div>
            </div>
          </div>
          {/* Loading State */}
          {loadingStudents && (
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md w-full lg:w-1/2 flex flex-col items-center justify-center">
              <span className="animate-spin text-2xl mb-2">🌀</span>
              <p>Loading students...</p>
            </div>
          )}
          {/* Attendance Table */}
          {students.length > 0 && (
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md w-full lg:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  👥 Attendance for {selectedDate}
                </h3>
                <span className="text-sm text-blue-300">
                  {selectedClass?.name} • {selectedSubject}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-purple-700 text-white">
                    <tr>
                      <th className="p-2 text-left">Student</th>
                      <th className="p-2 text-center">Present</th>
                      <th className="p-2 text-center">Absent</th>
                      <th className="p-2 text-center">Leave</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student._id} className="border-t border-white/10 hover:bg-white/10">
                        <td className="p-2">{student.name}</td>
                        {["present", "absent", "leave"].map(status => (
                          <td key={status} className="p-2 text-center">
                            <button
                              onClick={() => handleAttendanceChange(student._id, status)}
                              disabled={saving}
                              className={`w-8 h-8 rounded-full transition flex items-center justify-center ${selectedAttendance[student._id] === status
                                ? "bg-purple-600"
                                : "bg-gray-700 hover:bg-gray-600"
                                } ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              {saving ? "..." : selectedAttendance[student._id] === status ? "✓" : ""}
                            </button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Warnings and Messages */}
        {students.length > 0 && selectedDate && !selectedSubject && (
          <div className="bg-red-900/30 p-4 rounded-lg mb-4 flex items-center border border-red-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>You must select a subject before marking attendance</span>
          </div>
        )}

        {students.length > 0 && (
          <div className="mb-4">
            {Object.values(selectedAttendance).includes('duplicate') && (
              <div className="bg-red-900/30 text-red-300 p-3 rounded-lg flex items-center border border-red-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Attendance already recorded for this date and subject
              </div>
            )}
          </div>
        )}

        {!selectedClass && (
          <div className="bg-blue-900/30 p-6 rounded-xl text-center border border-blue-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Welcome to Attendance Portal</h3>
            <p className="text-gray-300">
              Please select a class to begin marking attendance.
              Choose a date on the calendar and select students' attendance status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAttendance;