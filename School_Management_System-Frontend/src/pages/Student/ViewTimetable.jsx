import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const ViewTimetable = () => {
  const [studentClass, setStudentClass] = useState('');
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch('http://localhost:5000/api/students/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch student info');

        const student = await res.json();
        console.log("Fetched student info:", student); // 👈 ADD THIS

        const className = student.className;
        setStudentClass(className);

        const timetableRes = await fetch(`http://localhost:5000/api/timetable/${className}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!timetableRes.ok) throw new Error('Timetable not found');

        const timetableData = await timetableRes.json();
        setTimetable(timetableData.entries || []);
      } catch (err) {
        console.error('Error:', err.message);
        setTimetable([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div className="flex bg-[#0f1117] min-h-screen text-white">
      <Sidebar role="student" />
      <div className="flex flex-col w-full">
        <div className="p-6">
          <Header />
          <h1 className="text-2xl font-bold mb-4">
            {studentClass ? `Class ${studentClass} Timetable` : 'Timetable'}
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : timetable.length === 0 ? (
            <p>No timetable uploaded yet.</p>
          ) : (
            <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-left">
                  <th className="p-3">Day</th>
                  {[...Array(6)].map((_, i) => (
                    <th key={i} className="p-3">P{i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetable.map((entry, i) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td className="p-3">{entry.day}</td>
                    {entry.periods.map((p, idx) => (
                      <td key={idx} className="p-3">{p || '-'}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTimetable;
