import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import axios from 'axios';

const UploadResources = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    className: '',
    subject: '',
    title: '',
    file: null,
  });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, {
          withCredentials: true,
        });
        setClasses(res.data);
      } catch (err) {
        console.error("Failed to fetch classes:", err);
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchSubjects = async (id) => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes/${id}`, { withCredentials: true });
        setSubjects(res.data.subjects || []);
      } catch (err) {
        console.error('Error fetching subjects:', err.response?.data || err.message);
      }
    };

    const selectedClass = classes.find((cls) => cls.name === formData.className);
    if (selectedClass) {
      fetchSubjects(selectedClass._id);
    } else {
      setSubjects([]);
    }
  }, [formData.className, classes]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { className, subject, file, title } = formData;

    if (!className || !subject || !title || !file) {
      alert("All fields are required!");
      return;
    }

    const data = new FormData();
    data.append("className", className);
    data.append("subject", subject);
    data.append("title", title);
    data.append("file", file);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/resources/upload`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Resource uploaded successfully!");
      setFormData({ className: '', subject: '', title: '', file: null });
      setSubjects([]);
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Failed to upload resource");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="teacher" />
      <div className="flex-1 p-6">
        <Header />
        <div className="bg-white/10 p-6 rounded-lg shadow-md max-w-xl mx-auto border border-white/20 backdrop-blur">
          <h2 className="text-2xl font-bold mb-6 text-center">Upload PDF Resource</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Class</label>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 text-white rounded"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls.name}>{cls.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 text-white rounded"
              >
                <option value="">Select Subject</option>
                {subjects.map((sub, i) => (
                  <option key={i} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter resource title"
                className="w-full p-2 bg-gray-800 text-white rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Upload PDF</label>
              <input
                type="file"
                name="file"
                accept="application/pdf"
                onChange={handleChange}
                className="w-full bg-gray-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-black hover:file:bg-green-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 font-semibold"
            >
              Upload Resource
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadResources;
