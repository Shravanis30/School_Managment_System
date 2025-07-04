
// import React, { useEffect, useState } from "react";
// import Sidebar from '../../components/Sidebar';
// import axios from 'axios';

// const TeacherAttendance = () => {
//   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [academicYear, setAcademicYear] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedAttendance, setSelectedAttendance] = useState({});
//   const [currentMonth, setCurrentMonth] = useState("January");
//   const [currentYear, setCurrentYear] = useState(2025);



//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const classRes = await axios.get('/api/classes/');
//         if (Array.isArray(classRes.data)) {
//           setClasses(classRes.data);
//         } else {
//           console.error("Expected array for classes, got:", classRes.data);
//           setClasses([]);
//         }
//       } catch (error) {
//         console.error("Error fetching classes:", error);
//         setClasses([]);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       if (!selectedClass) return;
//       const token = localStorage.getItem('token');
//       try {
//         const res = await axios.get(`http://localhost:5000/api/classes/${selectedClass}/subjects`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (Array.isArray(res.data)) {
//           setSubjects(res.data);
//         } else {
//           setSubjects([]);
//           console.warn("Expected subject array, got:", res.data);
//         }
//       } catch (err) {
//         console.error("Error fetching subjects:", err);
//         setSubjects([]);
//       }
//     };

//     fetchSubjects();
//   }, [selectedClass]);

//   // ✅ Add this auto-fetch useEffect here
//   useEffect(() => {
//     if (selectedClass && selectedDate && academicYear) {
//       handleSearch();
//     }
//   }, [selectedClass, selectedDate, academicYear]);

//   const handleSearch = async () => {
//     const token = localStorage.getItem('token');
//     if (!selectedClass || !selectedDate || !academicYear) return;

//     try {
//       const res = await axios.get(`http://localhost:5000/api/students/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Student response:", res.data);

//       // 🔥 Flatten the object values if it's grouped by class
//       let studentArray = [];

//       if (Array.isArray(res.data)) {
//         studentArray = res.data;
//       } else if (res.data && typeof res.data === "object") {
//         // Combine all students from all keys
//         studentArray = Object.values(res.data).flat();
//       }

//       if (Array.isArray(studentArray)) {
//         setStudents(studentArray);

//         const today = selectedDate;
//         const stored = localStorage.getItem('attendanceData');
//         const data = stored ? JSON.parse(stored) : {};
//         const attendanceState = {};
//         studentArray.forEach(student => {
//           attendanceState[student._id] = data[student._id]?.[today] || '';
//         });
//         setSelectedAttendance(attendanceState);
//       } else {
//         console.error("Expected array for students, got:", res.data);
//         setStudents([]);
//       }
//     } catch (error) {
//       console.error("Error fetching students by class:", error);
//       setStudents([]);
//     }
//   };



// const handleAttendanceChange = (studentId, status) => {
//   setSelectedAttendance(prev => {
//     const updated = { ...prev, [studentId]: status };
    
//     // ✅ Immediately send to backend
//     saveAttendanceToServer(updated);
//     return updated;
//   });
// };
// const saveAttendanceToServer = async (attendanceData) => {
//   const token = localStorage.getItem('token');
//   const today = selectedDate;

//   const records = Object.entries(attendanceData).map(([studentId, status]) => ({
//     studentId,
//     academicYear,
//     record: {
//       date: today,
//       status,
//       subject: selectedSubject,
//       classId: selectedClass
//     }
//   }));

//   try {
//     await axios.post('http://localhost:5000/api/attendance/save', { records }, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     console.log("Attendance saved to DB ✅");
//   } catch (error) {
//     console.error("Failed to save attendance:", error.response?.data || error.message);
//   }
// };


//   const generateCalendarDates = () => {
//     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     const monthIndex = months.indexOf(currentMonth);
//     const date = new Date(currentYear, monthIndex, 1);
//     const firstDayOfWeek = date.getDay();
//     const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
//     const dates = [];
//     for (let i = 0; i < firstDayOfWeek; i++) dates.push({ day: "", disabled: true });
//     for (let day = 1; day <= daysInMonth; day++) {
//       const fullDate = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//       dates.push({ day: day.toString(), disabled: false, active: selectedDate === fullDate, fullDate });
//     }
//     while (dates.length < 42) dates.push({ day: "", disabled: true });
//     return dates;
//   };

//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <Sidebar role="teacher" />
//       <div className="flex-1 p-8">
//         <div className="p-8">
//           <div className="grid grid-cols-4 gap-4 mb-8">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Class</label>
//               <select onChange={e => setSelectedClass(e.target.value)} className="w-full p-3 border-2 border-gray-600 rounded-lg bg-gray-800 text-white">
//                 <option value="">Select</option>
//                 {Array.isArray(classes) && classes.map(cls => (
//                   <option key={cls._id} value={cls._id}>{cls.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
//               <select onChange={e => setSelectedSubject(e.target.value)} className="w-full p-3 border-2 border-gray-600 rounded-lg bg-gray-800 text-white">
//                 <option value="">Select</option>
//                 {Array.isArray(subjects) && subjects.map(sub => (
//                   <option key={sub} value={sub}>{sub}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">Academic Year</label>
//               <input value={academicYear} onChange={e => setAcademicYear(e.target.value)} type="text" className="w-full p-3 border-2 border-gray-600 rounded-lg bg-gray-800 text-white" placeholder="2024-2025" />
//             </div>
//             <div className="flex items-end">
//               <button onClick={handleSearch} className="w-full bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition hover:scale-105">🔍 Search</button>
//             </div>
//           </div>

//           {/* Calendar */}
//           <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 mb-6 shadow-sm w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">📅 {currentMonth} {currentYear}</h3>
//               <div className="flex space-x-2">
//                 <button onClick={() => setCurrentMonth(prev => {
//                   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//                   const index = months.indexOf(prev);
//                   if (index === 0) {
//                     setCurrentYear(y => y - 1);
//                     return "December";
//                   }
//                   return months[index - 1];
//                 })}>◀</button>
//                 <button onClick={() => setCurrentMonth(prev => {
//                   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//                   const index = months.indexOf(prev);
//                   if (index === 11) {
//                     setCurrentYear(y => y + 1);
//                     return "January";
//                   }
//                   return months[index + 1];
//                 })}>▶</button>
//               </div>
//             </div>
//             <div className="grid grid-cols-7 gap-1 mb-2">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
//                 <div key={day} className="text-center text-sm text-gray-400">{day}</div>
//               ))}
//             </div>
//             <div className="grid grid-cols-7 gap-1">
//               {generateCalendarDates().map((date, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => !date.disabled && setSelectedDate(date.fullDate)}
//                   className={`text-center py-2 text-sm rounded-lg cursor-pointer ${date.disabled ? "text-gray-600" : selectedDate === date.fullDate ? "bg-purple-600 text-white font-bold" : "text-gray-300 hover:bg-purple-800"}`}
//                 >
//                   {date.day}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Student List (rendered below calendar) */}
//           {(
//             <div className="bg-gray-800 rounded-xl p-6 mt-6 w-full">
//               <h3 className="text-lg font-semibold mb-4">👥 Student Attendance for {selectedDate}</h3>
//               <table className="w-full bg-gray-900">
//                 <thead className="bg-purple-900">
//                   <tr>
//                     <th className="py-2 px-4">Student</th>
//                     <th className="py-2 px-4">Present</th>
//                     <th className="py-2 px-4">Absent</th>
//                     <th className="py-2 px-4">Leave</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map(student => (
//                     <tr key={student._id} className="border-t border-gray-700">
//                       <td className="py-2 px-4">{student.name}</td>
//                       {["present", "absent", "leave"].map(status => (
//                         <td key={status} className="py-2 px-4 text-center">
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

axios.defaults.withCredentials = true; // ⬅️ globally enables cookies for requests

const TeacherAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAttendance, setSelectedAttendance] = useState({});
  const [currentMonth, setCurrentMonth] = useState("July");
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get('/api/classes');
        setClasses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    if (!selectedClass) return;

    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`/api/classes/${selectedClass}/subjects`);
        setSubjects(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass && selectedDate && academicYear) {
      fetchStudents();
    }
  }, [selectedClass, selectedDate, academicYear]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`/api/students/class/${selectedClass}`);
      setStudents(Array.isArray(res.data) ? res.data : []);

      // Optionally, fetch existing attendance here if you want to prefill
      setSelectedAttendance({});
    } catch (err) {
      console.error("Error fetching students:", err);
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
        classId: selectedClass,
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
              <select onChange={e => setSelectedClass(e.target.value)} className="w-full p-2 bg-gray-800 text-white rounded">
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
                  const months = [...generateCalendarDates().map(d => d.month)];
                  const index = months.indexOf(currentMonth);
                  if (index === 0) {
                    setCurrentYear(y => y - 1);
                    setCurrentMonth("December");
                  } else {
                    setCurrentMonth(months[index - 1]);
                  }
                }}>◀</button>
                <button onClick={() => {
                  const months = [...generateCalendarDates().map(d => d.month)];
                  const index = months.indexOf(currentMonth);
                  if (index === 11) {
                    setCurrentYear(y => y + 1);
                    setCurrentMonth("January");
                  } else {
                    setCurrentMonth(months[index + 1]);
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
                  onClick={() => !date.disabled && setSelectedDate(date.fullDate)}
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
