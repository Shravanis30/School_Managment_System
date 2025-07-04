// import React, { useEffect, useState } from "react";
// import Sidebar from '../../components/Sidebar';
// import axios from 'axios';

// axios.defaults.withCredentials = true; // ⬅️ globally enables cookies for requests

// const TeacherAttendance = () => {
//   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [academicYear, setAcademicYear] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedAttendance, setSelectedAttendance] = useState({});
//   const [currentMonth, setCurrentMonth] = useState("July");
//   const [currentYear, setCurrentYear] = useState(2025);

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await axios.get('/api/classes', { withCredentials: true });
//         setClasses(res.data);
//       } catch (err) {
//         console.error('Error fetching classes:', err.response?.data || err.message);
//       }
//     };
//     fetchClasses();
//   }, []);



//   useEffect(() => {
//     if (!selectedClass) return;

//     const fetchSubjects = async () => {
//       try {
//         const res = await axios.get(`/api/classes/${selectedClass}/subjects`);
//         setSubjects(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Error fetching subjects:", err);
//       }
//     };

//     fetchSubjects();
//   }, [selectedClass]);

//   useEffect(() => {
//     if (selectedClass && selectedDate && academicYear) {
//       fetchStudentsByClass();
//     }
//   }, [selectedClass, selectedDate, academicYear]);

//   // const fetchStudents = async (dateToUse = selectedDate) => {
//   //   try {
//   //     const res = await axios.get(`/api/students/by-class-id/${selectedClass}`);
//   //     setStudents(Array.isArray(res.data) ? res.data : []);

//   //     // Optionally: pre-fill attendance later
//   //     setSelectedAttendance({});
//   //   } catch (err) {
//   //     console.error("Error fetching students:", err);
//   //   }
//   // };
//   const fetchStudentsByClass = async (dateToUse = selectedDate) => {
//     try {
//       const res = await axios.get(`/api/students/by-class-id/${selectedClass}`, {
//         withCredentials: true,
//       });
//       setStudents(Array.isArray(res.data) ? res.data : []);
//       console.log("Fetched students:", res.data);
//       console.log("Fetching students for class ID:", selectedClass);

//       setSelectedAttendance({});
//     } catch (err) {
//       console.error('Error fetching students:', err.message);
//     }
//   };




//   const handleAttendanceChange = async (studentId, status) => {
//     const updated = {
//       ...selectedAttendance,
//       [studentId]: status,
//     };
//     setSelectedAttendance(updated);

//     try {
//       await axios.post('/api/attendance/mark', {
//         studentId,
//         classId: selectedClass,
//         subject: selectedSubject,
//         date: selectedDate,
//         status,
//         academicYear,
//       });
//     } catch (error) {
//       console.error("Failed to mark attendance:", error.response?.data || error.message);
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

//     for (let i = 0; i < firstDayOfWeek; i++) {
//       dates.push({ day: "", disabled: true });
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const fullDate = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//       dates.push({ day: day.toString(), fullDate, disabled: false });
//     }

//     while (dates.length < 42) {
//       dates.push({ day: "", disabled: true });
//     }

//     return dates;
//   };

//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <Sidebar role="teacher" />
//       <div className="flex-1 p-8">
//         <div className="p-8">
//           {/* Filters */}
//           <div className="grid grid-cols-4 gap-4 mb-8">
//             <div>
//               <label className="block mb-2 text-sm">Class</label>
//               <select onChange={e => setSelectedClass(e.target.value)} className="w-full p-2 bg-gray-800 text-white rounded">
//                 <option value="">Select</option>
//                 {classes.map(cls => (
//                   <option key={cls._id} value={cls._id}>{cls.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block mb-2 text-sm">Subject</label>
//               <select onChange={e => setSelectedSubject(e.target.value)} className="w-full p-2 bg-gray-800 text-white rounded">
//                 <option value="">Select</option>
//                 {subjects.map(sub => (
//                   <option key={sub} value={sub}>{sub}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block mb-2 text-sm">Academic Year</label>
//               <input
//                 value={academicYear}
//                 onChange={e => setAcademicYear(e.target.value)}
//                 type="text"
//                 placeholder="2024-2025"
//                 className="w-full p-2 bg-gray-800 text-white rounded"
//               />
//             </div>
//           </div>

//           {/* Calendar */}
//           <div className="bg-gray-900 p-6 rounded-lg max-w-md mb-8">
//             <div className="flex justify-between mb-4">
//               <h3>{currentMonth} {currentYear}</h3>
//               <div className="space-x-2">
//                 <button onClick={() => {
//                   const months = [...generateCalendarDates().map(d => d.month)];
//                   const index = months.indexOf(currentMonth);
//                   if (index === 0) {
//                     setCurrentYear(y => y - 1);
//                     setCurrentMonth("December");
//                   } else {
//                     setCurrentMonth(months[index - 1]);
//                   }
//                 }}>◀</button>
//                 <button onClick={() => {
//                   const months = [...generateCalendarDates().map(d => d.month)];
//                   const index = months.indexOf(currentMonth);
//                   if (index === 11) {
//                     setCurrentYear(y => y + 1);
//                     setCurrentMonth("January");
//                   } else {
//                     setCurrentMonth(months[index + 1]);
//                   }
//                 }}>▶</button>
//               </div>
//             </div>

//             <div className="grid grid-cols-7 gap-1 text-sm text-center text-gray-400 mb-2">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}
//             </div>
//             <div className="grid grid-cols-7 gap-1">
//               {generateCalendarDates().map((date, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => {
//                     if (!date.disabled) {
//                       setSelectedDate(date.fullDate);
//                       if (selectedClass && academicYear) {
//                         fetchStudentsByClass(date.fullDate);
//                       }
//                     }
//                   }} className={`py-2 rounded-lg cursor-pointer ${date.disabled ? "text-gray-600" : selectedDate === date.fullDate ? "bg-purple-600 text-white" : "hover:bg-purple-700"}`}
//                 >
//                   {date.day}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Student Table */}
//           {students.length > 0 && (
//             <div className="bg-gray-800 p-6 rounded-lg">
//               <h3 className="mb-4">👥 Attendance for {selectedDate}</h3>
//               <table className="w-full text-sm">
//                 <thead className="bg-purple-700">
//                   <tr>
//                     <th className="p-2 text-left">Student</th>
//                     <th className="p-2">Present</th>
//                     <th className="p-2">Absent</th>
//                     <th className="p-2">Leave</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student) => (
//                     <tr key={student._id} className="border-t border-gray-600">
//                       <td className="p-2">{student.name}</td>
//                       {["present", "absent", "leave"].map(status => (
//                         <td className="p-2 text-center" key={status}>
//                           <button
//                             onClick={() => handleAttendanceChange(student._id, status)}
//                             className={`w-8 h-8 rounded-full ${selectedAttendance[student._id] === status ? "bg-purple-600" : "bg-gray-600"}`}
//                           >
//                             {selectedAttendance[student._id] === status ? "✓" : ""}
//                           </button>
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherAttendance;



import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

axios.defaults.withCredentials = true;

const TeacherAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null); // Now storing full object
  const [selectedSubject, setSelectedSubject] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAttendance, setSelectedAttendance] = useState({});
  const [currentMonth, setCurrentMonth] = useState("July");
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get('/api/classes', { withCredentials: true });
        setClasses(res.data);
      } catch (err) {
        console.error('Error fetching classes:', err.response?.data || err.message);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    if (!selectedClass?._id) return;

    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`/api/classes/${selectedClass._id}/subjects`);
        setSubjects(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass?.name && selectedDate && academicYear) {
      fetchStudentsByClass();
    }
  }, [selectedClass, selectedDate, academicYear]);

  const fetchStudentsByClass = async (dateToUse = selectedDate) => {
    try {
      const res = await axios.get(`/api/students/by-class-id/${selectedClass._id}`, {
        withCredentials: true,
      });
      setStudents(Array.isArray(res.data) ? res.data : []);
      setSelectedAttendance({});
    } catch (err) {
      console.error('Error fetching students:', err.message);
    }
  };

  const handleAttendanceChange = async (studentId, status) => {
    const updated = {
      ...selectedAttendance,
      [studentId]: status,
    };
    setSelectedAttendance(updated);

    try {
      await axios.post('/api/attendance/mark', {
        studentId,
        classId: selectedClass._id,
        subject: selectedSubject,
        date: selectedDate,
        status,
        academicYear,
      });
    } catch (error) {
      console.error("Failed to mark attendance:", error.response?.data || error.message);
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

    for (let i = 0; i < firstDayOfWeek; i++) {
      dates.push({ day: "", disabled: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      dates.push({ day: day.toString(), fullDate, disabled: false });
    }

    while (dates.length < 42) {
      dates.push({ day: "", disabled: true });
    }

    return dates;
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar role="teacher" />
      <div className="flex-1 p-8">
        <div className="p-8">
          {/* Filters */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block mb-2 text-sm">Class</label>
              <select
                onChange={e => {
                  const selected = classes.find(cls => cls._id === e.target.value);
                  setSelectedClass(selected || null);
                }}
                className="w-full p-2 bg-gray-800 text-white rounded"
              >
                <option value="">Select</option>
                {classes.map(cls => (
                  <option key={cls._id} value={cls._id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm">Subject</label>
              <select onChange={e => setSelectedSubject(e.target.value)} className="w-full p-2 bg-gray-800 text-white rounded">
                <option value="">Select</option>
                {subjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm">Academic Year</label>
              <input
                value={academicYear}
                onChange={e => setAcademicYear(e.target.value)}
                type="text"
                placeholder="2024-2025"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-gray-900 p-6 rounded-lg max-w-md mb-8">
            <div className="flex justify-between mb-4">
              <h3>{currentMonth} {currentYear}</h3>
              <div className="space-x-2">
                <button onClick={() => {
                  const index = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ].indexOf(currentMonth);
                  if (index === 0) {
                    setCurrentYear(y => y - 1);
                    setCurrentMonth("December");
                  } else {
                    setCurrentMonth(prev => ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ][index - 1]);
                  }
                }}>◀</button>
                <button onClick={() => {
                  const index = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ].indexOf(currentMonth);
                  if (index === 11) {
                    setCurrentYear(y => y + 1);
                    setCurrentMonth("January");
                  } else {
                    setCurrentMonth(prev => ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ][index + 1]);
                  }
                }}>▶</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-sm text-center text-gray-400 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
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
                  className={`py-2 rounded-lg cursor-pointer ${date.disabled ? "text-gray-600" : selectedDate === date.fullDate ? "bg-purple-600 text-white" : "hover:bg-purple-700"}`}
                >
                  {date.day}
                </div>
              ))}
            </div>
          </div>

          {/* Student Table */}
          {students.length > 0 && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="mb-4">👥 Attendance for {selectedDate}</h3>
              <table className="w-full text-sm">
                <thead className="bg-purple-700">
                  <tr>
                    <th className="p-2 text-left">Student</th>
                    <th className="p-2">Present</th>
                    <th className="p-2">Absent</th>
                    <th className="p-2">Leave</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} className="border-t border-gray-600">
                      <td className="p-2">{student.name}</td>
                      {["present", "absent", "leave"].map(status => (
                        <td className="p-2 text-center" key={status}>
                          <button
                            onClick={() => handleAttendanceChange(student._id, status)}
                            className={`w-8 h-8 rounded-full ${selectedAttendance[student._id] === status ? "bg-purple-600" : "bg-gray-600"}`}
                          >
                            {selectedAttendance[student._id] === status ? "✓" : ""}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;
