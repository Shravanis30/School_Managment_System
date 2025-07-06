
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teachers/list`, {
        withCredentials: true, // ✅ Send cookies (accessToken)
      });
      setTeachers(res.data);
    } catch (err) {
      console.error('Error fetching teachers:', err.message);
      if (err.response?.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login/admin');
      } else {
        alert('Failed to fetch teachers');
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this teacher?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/teachers/${id}`, {
        withCredentials: true, // ✅ Protected route, send cookie
      });
      alert('Teacher deleted successfully');
      fetchTeachers(); // Refresh list
    } catch (err) {
      console.error('Error deleting teacher:', err.message);
      alert('Failed to delete teacher');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header />
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-2 md:mb-0">All Teachers</h2>
          <button
            onClick={() => navigate('/register/teacher')}
            className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded shadow-lg"
          >
            + Register Teacher
          </button>
        </div>

        {/* Teachers Table */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/10 overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead className="bg-white/10 border-b border-white/10">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Subject(s)</th>
                <th className="p-3">Class Teacher Of</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, i) => (
                <tr key={t._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{t.fullName || t.name}</td>
                  <td className="p-3">{t.subjects?.join(', ') || '-'}</td>
                  <td className="p-3">{t.classTeacherOf || '-'}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {teachers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-300">
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTeachers;
