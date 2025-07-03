// import React, { useState } from 'react';
// import axios from 'axios';

// const StudentLeaveForm = () => {
//   const [formData, setFormData] = useState({
//     studentName: '',
//     class: '',
//     rollNo: '',
//     fromDate: '',
//     toDate: '',
//     reason: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/leaves/submit', formData);
//       alert('Leave application submitted successfully!');
//       setFormData({ studentName: '', class: '', rollNo: '', fromDate: '', toDate: '', reason: '' });
//     } catch (error) {
//       alert('Error submitting leave application', error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-gray-900 p-6 rounded text-white">
//       <h2 className="text-xl font-semibold mb-4">Leave Application Form</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="studentName" placeholder="Student Name" className="w-full p-2 rounded bg-gray-800" onChange={handleChange} value={formData.studentName} required />
//         <input name="class" placeholder="Class" className="w-full p-2 rounded bg-gray-800" onChange={handleChange} value={formData.class} required />
//         <input name="rollNo" placeholder="Roll No" className="w-full p-2 rounded bg-gray-800" onChange={handleChange} value={formData.rollNo} required />
//         <input type="date" name="fromDate" className="w-full p-2 rounded bg-gray-800" onChange={handleChange} value={formData.fromDate} required />
//         <input type="date" name="toDate" className="w-full p-2 rounded bg-gray-800" onChange={handleChange} value={formData.toDate} required />
//         <textarea name="reason" placeholder="Reason for Leave" className="w-full p-2 rounded bg-gray-800" onChange={handleChange} value={formData.reason} required />
//         <button type="submit" className="bg-blue-600 px-4 py-2 rounded">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default StudentLeaveForm;


// components/StudentLeaveForm.jsx
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
    axios.get('http://localhost:5000/api/classes')
      .then((res) => setClasses(res.data))
      .catch((err) => console.error('Error fetching classes:', err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/leaves/submit', formData);
      alert('Leave application submitted successfully!');
      setFormData({ studentName: '', class: '', rollNo: '', fromDate: '', toDate: '', reason: '' });
    } catch (error) {
      alert('Failed to submit leave application', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-[#0f1117] p-6 rounded-lg text-white shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Leave Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="studentName" placeholder="Student Name" onChange={handleChange} value={formData.studentName} required
          className="w-full p-2 bg-gray-800 rounded border border-gray-600" />

        <select name="class" onChange={handleChange} value={formData.class} required
          className="w-full p-2 bg-gray-800 rounded border border-gray-600">
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls.name}>{cls.name}</option>
          ))}
        </select>

        <input name="rollNo" placeholder="Roll No" onChange={handleChange} value={formData.rollNo} required
          className="w-full p-2 bg-gray-800 rounded border border-gray-600" />

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
