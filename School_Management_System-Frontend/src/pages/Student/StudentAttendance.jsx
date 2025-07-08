
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";

// axios.defaults.withCredentials = true;

// const StudentAttendance = () => {
//   const [student, setStudent] = useState(null);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [attendance, setAttendance] = useState([]);
//   const [academicYear, setAcademicYear] = useState("");
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   // 1. Load student profile (including class) and fetch subjects list
//   useEffect(() => {
//     const init = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`);
//         setStudent(res.data);
//         setSelectedClass(res.data.class);

//         // fetch subjects via your route
//         const subRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes/subjects/${res.data.class}`);
//         // backend returns array directly, not inside { subjects: [] }
//         setSubjects(subRes.data);
//       } catch (err) {
//         console.error("Error loading profile or subjects:", err.message);
//       }
//     };

//     // compute academic year like before
//     const today = new Date();
//     const year = today.getMonth() < 3
//       ? `${today.getFullYear() - 1}-${today.getFullYear()}`
//       : `${today.getFullYear()}-${today.getFullYear() + 1}`;
//     setAcademicYear(year);

//     init();
//   }, []);

//   // 2. When a subject is selected, fetch attendance for that student/subject/year
//   useEffect(() => {
//     const loadAttendance = async () => {
//       if (!student || !selectedSubject) return;
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/attendance/student/${student.id}?year=${academicYear}`);
//         const filtered = Array.isArray(res.data.records)
//           ? res.data.records.filter(r => r.subject === selectedSubject)
//           : [];
//         setAttendance(filtered);
//       } catch (err) {
//         console.error("Error fetching attendance data:", err.message);
//       }
//     };

//     loadAttendance();
//   }, [student, selectedSubject, academicYear]);

//   // Calendar generator
//   const generateCalendar = () => {
//     const start = new Date(currentYear, currentMonth, 1);
//     const firstDay = start.getDay();
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//     const cells = [];
//     for (let i = 0; i < firstDay; i++) cells.push(null);
//     for (let d = 1; d <= daysInMonth; d++) {
//       const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
//       cells.push({ day: d, fullDate });
//     }
//     return cells;
//   };

//   const statusColor = (s) => {
//     if (s === "present") return "bg-blue-500";
//     if (s === "absent") return "bg-red-500";
//     if (s === "leave") return "bg-yellow-400";
//     return "";
//   };

//   // Calendar cell status
//   const cellStatus = (date) => {
//     const rec = attendance.find(r => r.date === date);
//     return rec?.status;
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="student" />
//       <div className="flex-1 p-6">
//         <Header />
//         <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur">
//           <h2 className="text-xl font-bold text-purple-300 mb-4">📅 Attendance Calendar</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="text-sm text-blue-300">Class</label>
//               <p className="p-2 bg-gray-900 rounded border border-white/10">{selectedClass || "Loading..."}</p>
//             </div>

//             <div>
//               <label className="text-sm text-blue-300">Subject</label>
//               <select
//                 className="w-full p-2 bg-gray-800 rounded border border-white/10"
//                 value={selectedSubject}
//                 onChange={e => setSelectedSubject(e.target.value)}
//               >
//                 <option value="">--Select Subject--</option>
//                 {subjects.map(sub => (
//                   <option key={sub} value={sub}>{sub}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="flex justify-between items-center mb-4">
//             <button onClick={() => {
//               setCurrentMonth(m => m === 0 ? 11 : m - 1);
//               if (currentMonth === 0) setCurrentYear(y => y - 1);
//             }} className="text-white hover:text-purple-400">⬅️ Prev</button>
//             <h3 className="text-lg text-purple-200">{months[currentMonth]} {currentYear}</h3>
//             <button onClick={() => {
//               setCurrentMonth(m => m === 11 ? 0 : m + 1);
//               if (currentMonth === 11) setCurrentYear(y => y + 1);
//             }} className="text-white hover:text-purple-400">Next ➡️</button>
//           </div>

//           <div className="grid grid-cols-7 gap-2 text-sm text-center">
//             {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
//               <div key={d} className="text-white/70 font-semibold">{d}</div>
//             ))}
//             {generateCalendar().map((c, i) => (
//               <div key={i} className={`min-h-[70px] p-2 rounded ${c ? "bg-white/5" : ""}`}>
//                 {c?.day}
//                 {c && (
//                   <div className={`mt-2 w-4 h-4 rounded-full mx-auto ${statusColor(cellStatus(c.fullDate))}`}></div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 flex gap-6 text-sm text-white/70">
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-blue-500 rounded-full"></div> Present
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-red-500 rounded-full"></div> Absent
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-yellow-400 rounded-full"></div> Leave
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentAttendance;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";

// axios.defaults.withCredentials = true;

// const StudentAttendance = () => {
//   const [student, setStudent] = useState(null);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [attendance, setAttendance] = useState([]);
//   const [academicYear, setAcademicYear] = useState("");
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
//   const [showLeaveForm, setShowLeaveForm] = useState(false);
//   const [leaveData, setLeaveData] = useState({
//     fromDate: '',
//     toDate: '',
//     reason: ''
//   });
//   const [error, setError] = useState(null);

//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   useEffect(() => {
//     const today = new Date();
//     const year = today.getMonth() < 3
//       ? `${today.getFullYear() - 1}-${today.getFullYear()}`
//       : `${today.getFullYear()}-${today.getFullYear() + 1}`;
//     setAcademicYear(year);

//     const init = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('accessToken')}`

//             }
//           }
//         );
//         setStudent(res.data);
//         setSelectedClass(res.data.class);
//       } catch (err) {
//         console.error("Error loading profile:", err);
//         setError("Failed to load profile data");
//       }
//     };
//     init();
//   }, []);

//   useEffect(() => {
//     if (!student?._id) return; // Add this check

//     if (student?._id && academicYear) {
//       loadAttendance();
//     }
//   }, [student, academicYear]);

//   const loadAttendance = async () => {
//     if (!student) return;
//     setError(null);
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/attendance/student/${student._id}?year=${academicYear}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`
//           }
//         }
//       );
//       setAttendance(Array.isArray(res.data?.records) ? res.data.records : []);
//     } catch (err) {
//       console.error("Error fetching attendance data:", err);
//       setError("Failed to load attendance data. Please try again.");
//     }
//   };

//   useEffect(() => {
//     loadAttendance();
//   }, [student, academicYear]);

//   const generateCalendar = () => {
//     const start = new Date(currentYear, currentMonth, 1);
//     const firstDay = start.getDay();
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//     const cells = [];
//     for (let i = 0; i < firstDay; i++) cells.push(null);
//     for (let d = 1; d <= daysInMonth; d++) {
//       const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
//       cells.push({ day: d, fullDate });
//     }
//     return cells;
//   };

//   const statusColor = (s) => {
//     if (s === "present") return "bg-blue-500";
//     if (s === "absent") return "bg-red-500";
//     if (s === "leave") return "bg-yellow-400";
//     return "";
//   };

//   const cellStatus = (date) => {
//     const rec = attendance.find(r => r.date === date);
//     return rec?.status;
//   };

//   const handleSubmitLeave = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/leaves/submit`, // Add /submit
//         {
//           studentId: student._id,
//           studentName: student.name,
//           class: student.class,
//           rollNo: student.rollNo,
//           fromDate: leaveData.fromDate,
//           toDate: leaveData.toDate,
//           reason: leaveData.reason
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('accessToken')}`
//           }
//         }
//       );
//       alert("Leave application submitted successfully!");
//       setShowLeaveForm(false);
//       setLeaveData({ fromDate: '', toDate: '', reason: '' });
//     } catch (error) {
//       console.error("Error submitting leave:", error);
//       alert("Failed to submit leave application. Please try again.");
//     }
//   };


//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="student" />
//       <div className="flex-1 p-6">
//         <Header />
//         <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur">
//           <h2 className="text-xl font-bold text-purple-300 mb-4">📅 Attendance Calendar</h2>

//           <div className="mb-6">
//             <label className="text-sm text-blue-300">Class</label>
//             <p className="p-2 bg-gray-900 rounded border border-white/10">{selectedClass || "Loading..."}</p>
//           </div>

//           <div className="flex justify-between items-center mb-4">
//             <button onClick={() => {
//               setCurrentMonth(m => m === 0 ? 11 : m - 1);
//               if (currentMonth === 0) setCurrentYear(y => y - 1);
//             }} className="text-white hover:text-purple-400">⬅️ Prev</button>
//             <h3 className="text-lg text-purple-200">{months[currentMonth]} {currentYear}</h3>
//             <button onClick={() => {
//               setCurrentMonth(m => m === 11 ? 0 : m + 1);
//               if (currentMonth === 11) setCurrentYear(y => y + 1);
//             }} className="text-white hover:text-purple-400">Next ➡️</button>
//           </div>

//           <div className="grid grid-cols-7 gap-2 text-sm text-center">
//             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
//               <div key={d} className="text-white/70 font-semibold">{d}</div>
//             ))}
//             {generateCalendar().map((c, i) => (
//               <div key={i} className={`min-h-[70px] p-2 rounded ${c ? "bg-white/5" : ""}`}>
//                 {c?.day}
//                 {c && (
//                   <div className="mt-1 flex justify-center">

//                     {/* <div className={`mt-2 w-4 h-4 rounded-full mx-auto ${statusColor(cellStatus(c.fullDate))}`}></div> */}
//                     <div className={`w-3 h-3 rounded-full ${statusColor(cellStatus(c.fullDate))}`}></div>

//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="mt-6 flex gap-6 text-sm text-white/70">
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-blue-500 rounded-full"></div> Present
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-red-500 rounded-full"></div> Absent
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-4 h-4 bg-yellow-400 rounded-full"></div> Leave
//             </div>
//           </div>

//           <div className="mt-8">
//             <button
//               onClick={() => setShowLeaveForm(true)}
//               className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
//             >
//               Apply for Leave
//             </button>
//           </div>

//           {error && (
//             <div className="mt-4 p-4 bg-red-900/30 rounded-lg">
//               <p className="text-red-300">{error}</p>
//               <button
//                 onClick={loadAttendance}
//                 className="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
//               >
//                 Retry
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {showLeaveForm && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
//             <h3 className="text-lg font-bold mb-4">Apply for Leave</h3>
//             <form onSubmit={handleSubmitLeave}>
//               <div className="mb-4">
//                 <label className="block text-sm mb-1">From Date</label>
//                 <input
//                   type="date"
//                   value={leaveData.fromDate}
//                   onChange={e => setLeaveData({ ...leaveData, fromDate: e.target.value })}
//                   className="w-full p-2 bg-gray-700 rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm mb-1">To Date</label>
//                 <input
//                   type="date"
//                   value={leaveData.toDate}
//                   onChange={e => setLeaveData({ ...leaveData, toDate: e.target.value })}
//                   className="w-full p-2 bg-gray-700 rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm mb-1">Reason</label>
//                 <textarea
//                   value={leaveData.reason}
//                   onChange={e => setLeaveData({ ...leaveData, reason: e.target.value })}
//                   className="w-full p-2 bg-gray-700 rounded"
//                   required
//                   rows={3}
//                 />
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowLeaveForm(false)}
//                   className="px-4 py-2 bg-gray-600 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-yellow-500 text-black rounded"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentAttendance;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

axios.defaults.withCredentials = true;

const StudentAttendance = () => {
  const [student, setStudent] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [academicYear, setAcademicYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveData, setLeaveData] = useState({
    fromDate: '',
    toDate: '',
    reason: ''
  });
  const [error, setError] = useState(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const today = new Date();
    const year = today.getMonth() < 3
      ? `${today.getFullYear() - 1}-${today.getFullYear()}`
      : `${today.getFullYear()}-${today.getFullYear() + 1}`;
    setAcademicYear(year);

    const init = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          { withCredentials: true }

        );
        setStudent(res.data);
        setSelectedClass(res.data.class);
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Failed to load profile data");
      }
    };
    init();
  }, []);

  const loadAttendance = async () => {
    if (!student?._id) return;
    setError(null);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/attendance/student/${student._id}?year=${academicYear}`,
        { withCredentials: true }

      );
      setAttendance(Array.isArray(res.data?.records) ? res.data.records : []);
    } catch (err) {
      console.error("Error fetching attendance data:", err);
      setError("Failed to load attendance data. Please try again.");
    }
  };

  useEffect(() => {
    if (student?._id && academicYear) {
      loadAttendance();
    }
  }, [student, academicYear]);

  const generateCalendar = () => {
    const start = new Date(currentYear, currentMonth, 1);
    const firstDay = start.getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const fullDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ day: d, fullDate });
    }
    return cells;
  };

  const statusColor = (s) => {
    if (s === "present") return "bg-blue-500";
    if (s === "absent") return "bg-red-500";
    if (s === "leave") return "bg-yellow-400";
    return "";
  };

  const cellStatus = (date) => {
    const rec = attendance.find(r => r.date === date);
    return rec?.status;
  };

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/leaves/submit`,
        {
          studentId: student._id,
          studentName: student.name,
          class: student.class,
          rollNo: student.rollNo,
          fromDate: leaveData.fromDate,
          toDate: leaveData.toDate,
          reason: leaveData.reason
        },
        { withCredentials: true }

      );
      alert("Leave application submitted successfully!");
      setShowLeaveForm(false);
      setLeaveData({ fromDate: '', toDate: '', reason: '' });
    } catch (error) {
      console.error("Error submitting leave:", error);
      alert("Failed to submit leave application. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="student" />
      <div className="flex-1 p-6">
        <Header />
        <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur">
          <h2 className="text-xl font-bold text-purple-300 mb-4">📅 Attendance Calendar</h2>

          <div className="mb-6">
            <label className="text-sm text-blue-300">Class</label>
            <p className="p-2 bg-gray-900 rounded border border-white/10">{selectedClass || "Loading..."}</p>
          </div>

          <div className="flex justify-between items-center mb-4">
            <button onClick={() => {
              setCurrentMonth(m => m === 0 ? 11 : m - 1);
              if (currentMonth === 0) setCurrentYear(y => y - 1);
            }} className="text-white hover:text-purple-400">⬅️ Prev</button>
            <h3 className="text-lg text-purple-200">{months[currentMonth]} {currentYear}</h3>
            <button onClick={() => {
              setCurrentMonth(m => m === 11 ? 0 : m + 1);
              if (currentMonth === 11) setCurrentYear(y => y + 1);
            }} className="text-white hover:text-purple-400">Next ➡️</button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-sm text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
              <div key={d} className="text-white/70 font-semibold">{d}</div>
            ))}
            {generateCalendar().map((c, i) => (
              <div key={i} className={`min-h-[70px] p-2 rounded ${c ? "bg-white/5" : ""}`}>
                {c?.day}
                {c && (
                  <div className="mt-1 flex justify-center">
                    <div className={`w-3 h-3 rounded-full ${statusColor(cellStatus(c.fullDate))}`}></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div> Present
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div> Absent
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div> Leave
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setShowLeaveForm(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
            >
              Apply for Leave
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-900/30 rounded-lg">
              <p className="text-red-300">{error}</p>
              <button
                onClick={loadAttendance}
                className="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>

      {showLeaveForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Apply for Leave</h3>
            <form onSubmit={handleSubmitLeave}>
              <div className="mb-4">
                <label className="block text-sm mb-1">From Date</label>
                <input
                  type="date"
                  value={leaveData.fromDate}
                  onChange={e => setLeaveData({ ...leaveData, fromDate: e.target.value })}
                  className="w-full p-2 bg-gray-700 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">To Date</label>
                <input
                  type="date"
                  value={leaveData.toDate}
                  onChange={e => setLeaveData({ ...leaveData, toDate: e.target.value })}
                  className="w-full p-2 bg-gray-700 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Reason</label>
                <textarea
                  value={leaveData.reason}
                  onChange={e => setLeaveData({ ...leaveData, reason: e.target.value })}
                  className="w-full p-2 bg-gray-700 rounded"
                  required
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLeaveForm(false)}
                  className="px-4 py-2 bg-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-black rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;