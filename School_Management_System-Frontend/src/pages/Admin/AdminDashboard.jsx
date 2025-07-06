import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: '', details: '', date: '' });
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notices`, { withCredentials: true });
      setNotices(res.data || []);
    } catch (err) {
      console.error('Error fetching notices:', err.response?.data || err.message);
    }
  };

  const handleAddNotice = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notices`, newNotice, {
        withCredentials: true,
      });
      setNotices((prev) => [res.data, ...prev]);
      setShowNoticeForm(false);
      setNewNotice({ title: '', details: '', date: '' });
    } catch (err) {
      console.error('Error adding notice:', err.response?.data || err.message);
      alert('Failed to add notice.');
    }
  };

  const handleDeleteNotice = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/notices/${id}`, {
          withCredentials: true,
        });
        setNotices((prev) => prev.filter((notice) => notice._id !== id));
      } catch (error) {
        console.error('Failed to delete notice:', error.response?.data || error.message);
      }
    }
  };

  const cardData = [
    {
      label: 'Total Students',
      count: 2500,
      icon: <FaUserGraduate className="text-4xl text-white drop-shadow-lg" />,
      note: '+5% this month',
      link: '/dashboard/admin/students',
    },
    {
      label: 'Total Teachers',
      count: 100,
      icon: <FaChalkboardTeacher className="text-4xl text-white drop-shadow-lg" />,
      note: 'Stable',
      link: '/dashboard/admin/teachers',
    },
    {
      label: 'Total Classes',
      count: 20,
      icon: <FaUsers className="text-4xl text-white drop-shadow-lg" />,
      note: 'New: 2',
      link: '/dashboard/admin/classes',
    },
    {
      label: 'Fee Collection',
      count: '₹2,50,00,000',
      icon: <FaMoneyBillWave className="text-4xl text-white drop-shadow-lg" />,
      note: '+10% revenue',
      link: '/dashboard/admin/fees',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-gray-900/60 to-black/30 blur-xl -z-10 animate-pulse" />
      <Sidebar role="admin" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 p-6 space-y-10">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              onClick={() => navigate(card.link)}
              className="relative group bg-white/5 p-6 rounded-3xl overflow-hidden shadow-lg border border-white/10 hover:border-indigo-500 transition-all duration-500 hover:scale-105 cursor-pointer backdrop-blur-md"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500/30 to-blue-500/20 opacity-30 rounded-3xl blur-xl group-hover:opacity-50 transition-all duration-500" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  {card.icon}
                  <div className="text-right">
                    <h4 className="text-md font-semibold text-gray-300">{card.label}</h4>
                    <p className="text-3xl font-extrabold text-white">{card.count}</p>
                  </div>
                </div>
                <p className="text-xs text-indigo-400 text-right">{card.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 p-6 rounded-2xl shadow-md backdrop-blur-md border border-white/10 mt-10 relative">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-bold">📌 Notice Board</h3>
            <button
              className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded text-black font-semibold"
              onClick={() => setShowNoticeForm(true)}
            >
              + Add Notice
            </button>
          </div>

          <table className="w-full text-sm text-white">
            <thead className="text-white/80">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Details</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((n, i) => (
                <tr key={n._id} className="bg-white/5 hover:bg-white/10 transition-all border-b border-white/10">
                  <td className="px-3 py-2 text-gray-300">{i + 1}</td>
                  <td className="px-3 py-2 text-blue-300">{n.date}</td>
                  <td className="px-3 py-2 font-semibold text-white">{n.title}</td>
                  <td className="px-3 py-2 text-gray-300">{n.details}</td>
                  <td className="px-3 py-2">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                      onClick={() => handleDeleteNotice(n._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showNoticeForm && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-20 flex items-center justify-center">

              <div className="absolute top-10 right-10 bg-white/40 text-white p-6 rounded-2xl shadow-lg border border-white/50 backdrop-blur-md z-20">
                <h3 className="text-lg font-semibold mb-4">Add New Notice</h3>
                <input
                  type="text"
                  className="w-full p-2 mb-2 border border-white/20 rounded bg-black/50 text-white"
                  placeholder="Title"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                />
                <input
                  type="text"
                  className="w-full p-2 mb-2 border border-white/20 rounded bg-black/50 text-white"
                  placeholder="Details"
                  value={newNotice.details}
                  onChange={(e) => setNewNotice({ ...newNotice, details: e.target.value })}
                />
                <input
                  type="date"
                  className="w-full p-2 mb-2 border border-white/20 rounded bg-black/50 text-white"
                  value={newNotice.date}
                  onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-400 text-black px-3 py-1 rounded"
                    onClick={() => setShowNoticeForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-700 text-white px-3 py-1 rounded"
                    onClick={handleAddNotice}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
