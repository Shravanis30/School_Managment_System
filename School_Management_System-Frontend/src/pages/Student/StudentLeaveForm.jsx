

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentLeaveForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    class: '',
    rollNo: '',
    fromDate: '',
    toDate: '',
    reason: '',
  });

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch available classes
    axios.get('/api/classes', { withCredentials: true })
      .then((res) => setClasses(res.data))
      .catch((err) => console.error('Error fetching classes:', err));

    // Auto-fill student details from /api/user/profile
    axios.get('/api/user/profile', { withCredentials: true })
      .then((res) => {
        const student = res.data;
        setFormData(prev => ({
          ...prev,
          studentName: student.name,
          class: student.class,
          rollNo: student.rollNo,
        }));
      })
      .catch((err) => {
        console.error('Error fetching student profile:', err);
        alert('Please log in again');
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/leaves/submit', formData, {
        withCredentials: true, // 🔐 send accessToken cookie
      });
      alert('Leave application submitted successfully!');
      setFormData(prev => ({
        ...prev,
        fromDate: '',
        toDate: '',
        reason: '',
      }));
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to submit leave application');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-[#0f1117] p-6 rounded-lg text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Leave Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="studentName" value={formData.studentName} readOnly
          className="w-full p-2 bg-gray-700 rounded border border-gray-500 cursor-not-allowed" />

        <select name="class" value={formData.class} disabled
          className="w-full p-2 bg-gray-700 rounded border border-gray-500 cursor-not-allowed">
          <option>{formData.class}</option>
        </select>

        <input name="rollNo" value={formData.rollNo} readOnly
          className="w-full p-2 bg-gray-700 rounded border border-gray-500 cursor-not-allowed" />

        <input type="date" name="fromDate" onChange={handleChange} value={formData.fromDate} required
          className="w-full p-2 bg-gray-800 rounded border border-gray-600" />

        <input type="date" name="toDate" onChange={handleChange} value={formData.toDate} required
          className="w-full p-2 bg-gray-800 rounded border border-gray-600" />

        <textarea name="reason" placeholder="Reason for Leave" onChange={handleChange} value={formData.reason} required
          className="w-full p-2 bg-gray-800 rounded border border-gray-600" />

        <button type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded text-white font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentLeaveForm;
