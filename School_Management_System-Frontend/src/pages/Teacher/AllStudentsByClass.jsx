import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import axios from 'axios';

const AllStudentsByClass = () => {
  const [students, setStudents] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    fetchClassOptions();
  }, []);

  useEffect(() => {
    if (selectedClass) fetchStudentsByClass(selectedClass);
  }, [selectedClass]);

  const fetchClassOptions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/classes');
      setClassOptions(res.data);
    } catch (err) {
      console.error('Error fetching class options:', err.message);
    }
  };

  const fetchStudentsByClass = async (className) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:5000/api/students/by-class/${className}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err.message);
    }
  };

  return (
    <div className="flex bg-[#0f1117] min-h-screen text-white">
      <Sidebar role="teacher" />
      <div className="flex flex-col m-5 w-full">
        <Header />

        <div className="p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Students by Class</h1>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-[#1a1d23] text-white border border-gray-600 rounded px-4 py-2"
            >
              <option value="">-- Select Class --</option>
              {classOptions.map((cls) => (
                <option key={cls._id} value={cls.name}>{cls.name}</option>
              ))}
            </select>
          </div>

          {students.length > 0 ? (
            <div className="bg-[#1c1f26] rounded-lg shadow p-5">
              <ul className="divide-y divide-gray-700">
                {students.map((student) => (
                  <li key={student._id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-white">{student.name}</p>
                      <p className="text-sm text-gray-400">{student.email}</p>
                    </div>
                    <span className="text-sm text-gray-300">Roll No: {student.rollNumber}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            selectedClass && <p className="text-gray-400">No students found for this class.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllStudentsByClass;