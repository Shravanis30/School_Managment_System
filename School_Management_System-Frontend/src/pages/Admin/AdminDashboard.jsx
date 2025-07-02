import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaMoneyBillWave,
  FaBell
} from 'react-icons/fa';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([
  ]);
  const [newNotice, setNewNotice] = useState({ title: '', details: '', date: '' });
  const [showNoticeForm, setShowNoticeForm] = useState(false);

  const handleAddNotice = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/notices', newNotice, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotices(prev => [res.data, ...prev]);
      setShowNoticeForm(false);
      setNewNotice({ title: '', details: '', date: '' });
    } catch (err) {
      console.error("Error adding notice:", err);
      alert("Failed to add notice.");
    }
  };

  const handleDeleteNotice = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/notices/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotices(notices.filter((notice) => notice._id !== id));
      } catch (error) {
        console.error('Failed to delete notice:', error);
      }
    }
  };



  const cardData = [
    {
      label: 'Total Students',
      count: 2500,
      icon: <FaUserGraduate className="text-4xl text-white" />,
      note: '+5% this month',
      link: '/dashboard/admin/students'
    },
    {
      label: 'Total Teachers',
      count: 100,
      icon: <FaChalkboardTeacher className="text-4xl text-white" />,
      note: 'Stable',
      link: '/dashboard/admin/teachers'
    },
    {
      label: 'Total Classes',
      count: 20,
      icon: <FaUsers className="text-4xl text-white" />,
      note: 'New: 2',
      link: '/dashboard/admin/classes'
    },
    {
      label: 'Fee Collection',
      count: '₹2,50,00,000',
      icon: <FaMoneyBillWave className="text-4xl text-white" />,
      note: '+10% revenue',
      link: '/dashboard/admin/fees'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6 space-y-8">
        <Header />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              onClick={() => navigate(card.link)}
              className="bg-gradient-to-r from-blue-800 to-indigo-800 p-5 rounded-lg shadow-md hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                {card.icon}
                <div className="text-right">
                  <h4 className="text-lg font-semibold">{card.label}</h4>
                  <p className="text-2xl font-bold">{card.count}</p>
                  <p className="text-xs text-gray-300">{card.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice Board */}
        <div className="bg-[#1b2236] p-6 rounded-xl relative shadow-lg mt-10 text-white">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-2xl font-bold">📌 Notice Board</h3>
            <button
              className="bg-green-500 hover:bg-green-600 transition px-4 py-1 rounded text-black font-semibold"
              onClick={() => setShowNoticeForm(true)}
            >
              + Add Notice
            </button>
          </div>

          <table className="w-full text-sm text-white">
            <thead className="bg-gray-800 text-left">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Details</th>
                <th className="px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              {notices.map((n, i) => (
                <tr key={n._id} className="border-b border-gray-600 hover:bg-gray-800 transition">
                  <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                  <td className="px-3 py-2 text-blue-300">{n.date}</td>
                  <td className="px-3 py-2 font-semibold">{n.title}</td>
                  <td className="px-3 py-2 text-gray-200">{n.details}</td>
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

          {/* Add Notice Modal */}
          {showNoticeForm && (
            <div className="absolute top-10 right-10 bg-white text-black p-5 rounded shadow-lg w-80 z-20">
              <h3 className="text-lg font-semibold mb-3">Add New Notice</h3>
              <input
                type="text"
                className="w-full p-2 mb-2 border rounded"
                placeholder="Title"
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
              />
              <input
                type="text"
                className="w-full p-2 mb-2 border rounded"
                placeholder="Details"
                value={newNotice.details}
                onChange={(e) => setNewNotice({ ...newNotice, details: e.target.value })}
              />
              <input
                type="date"
                className="w-full p-2 mb-2 border rounded"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

