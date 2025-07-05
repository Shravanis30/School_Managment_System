
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

axios.defaults.withCredentials = true;

const StudentAttendance = () => {
  const [student, setStudent] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [academicYear, setAcademicYear] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // 1. Load student profile (including class) and fetch subjects list
  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get("/api/user/profile");
        setStudent(res.data);
        setSelectedClass(res.data.class);

        // fetch subjects via your route
        const subRes = await axios.get(`/api/classes/subjects/${res.data.class}`);
        // backend returns array directly, not inside { subjects: [] }
        setSubjects(subRes.data);
      } catch (err) {
        console.error("Error loading profile or subjects:", err.message);
      }
    };

    // compute academic year like before
    const today = new Date();
    const year = today.getMonth() < 3
      ? `${today.getFullYear() - 1}-${today.getFullYear()}`
      : `${today.getFullYear()}-${today.getFullYear() + 1}`;
    setAcademicYear(year);

    init();
  }, []);

  // 2. When a subject is selected, fetch attendance for that student/subject/year
  useEffect(() => {
    const loadAttendance = async () => {
      if (!student || !selectedSubject) return;
      try {
        const res = await axios.get(`/api/attendance/student/${student.id}?year=${academicYear}`);
        const filtered = Array.isArray(res.data.records)
          ? res.data.records.filter(r => r.subject === selectedSubject)
          : [];
        setAttendance(filtered);
      } catch (err) {
        console.error("Error fetching attendance data:", err.message);
      }
    };

    loadAttendance();
  }, [student, selectedSubject, academicYear]);

  // Calendar generator
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

  // Calendar cell status
  const cellStatus = (date) => {
    const rec = attendance.find(r => r.date === date);
    return rec?.status;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="student" />
      <div className="flex-1 p-6">
        <Header />
        <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur">
          <h2 className="text-xl font-bold text-purple-300 mb-4">📅 Attendance Calendar</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm text-blue-300">Class</label>
              <p className="p-2 bg-gray-900 rounded border border-white/10">{selectedClass || "Loading..."}</p>
            </div>

            <div>
              <label className="text-sm text-blue-300">Subject</label>
              <select
                className="w-full p-2 bg-gray-800 rounded border border-white/10"
                value={selectedSubject}
                onChange={e => setSelectedSubject(e.target.value)}
              >
                <option value="">--Select Subject--</option>
                {subjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
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
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <div key={d} className="text-white/70 font-semibold">{d}</div>
            ))}
            {generateCalendar().map((c, i) => (
              <div key={i} className={`min-h-[70px] p-2 rounded ${c ? "bg-white/5" : ""}`}>
                {c?.day}
                {c && (
                  <div className={`mt-2 w-4 h-4 rounded-full mx-auto ${statusColor(cellStatus(c.fullDate))}`}></div>
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
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
