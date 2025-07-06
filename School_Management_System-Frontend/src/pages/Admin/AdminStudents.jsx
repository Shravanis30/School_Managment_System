
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchClassOptions();
  }, []);

  useEffect(() => {
    if (selectedClass) fetchStudentsByClass(selectedClass);
  }, [selectedClass]);

  const fetchClassOptions = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, {
        withCredentials: true,
      });
      setClassOptions(res.data);
    } catch (err) {
      console.error('Error fetching class options:', err.message);
    }
  };

  const fetchStudentsByClass = async (className) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/students/by-class-name/${className}`, {
        withCredentials: true,
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/students/${id}`, {
        withCredentials: true,
      });
      alert('Student deleted successfully');
      fetchStudentsByClass(selectedClass);
    } catch (err) {
      alert('Failed to delete student');
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header />

        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-2 md:mb-0">Manage Students</h2>
          <button
            onClick={() => navigate('/register/student')}
            className="bg-green-400 hover:bg-green-500 text-black px-4 py-2 rounded-full font-medium shadow-md"
          >
            + Register Student
          </button>
        </div>

        {/* Class Selector */}
        <div className="mb-6 bg-white/5 p-4 rounded-xl backdrop-blur-md border border-white/10">
          <label className="block mb-2 font-medium">Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full md:w-64 bg-gray-800 text-white p-2 rounded border border-gray-700 focus:outline-none"
          >
            <option value="">-- Select Class --</option>
            {classOptions.map((cls) => (
              <option key={cls._id} value={cls.name}>{cls.name}</option>
            ))}
          </select>
        </div>

        {/* Student Table */}
        {students.length > 0 ? (
          <div className="overflow-x-auto bg-white/5 rounded-xl shadow-md p-4 backdrop-blur-md border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-white/80">
                  <th className="p-2">#</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Roll Number</th>
                  <th className="p-2">Class</th>
                  <th className="p-2">Section</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s._id} className="bg-white/5 hover:bg-white/10 border-b border-white/10">
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{s.fullName || s.name}</td>
                    <td className="p-2">{s.rollNumber || '-'}</td>
                    <td className="p-2">{s.className || '-'}</td>
                    <td className="p-2">{s.section || '-'}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-sm font-medium text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          selectedClass && <p className="text-gray-400">No students found for this class.</p>
        )}
      </div>
    </div>
  );
};

export default AdminStudents;
