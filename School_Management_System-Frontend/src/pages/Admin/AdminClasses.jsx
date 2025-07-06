import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminClasses = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');

  useEffect(() => {
    fetchAllClasses();
  }, []);

  const fetchAllClasses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, { withCredentials: true });
      setClasses(res.data);
    } catch (err) {
      console.error('Error fetching classes:', err.response?.data || err.message);
    }
  };

  const fetchSubjects = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes/${id}`, { withCredentials: true });
      setSubjects(res.data.subjects || []);
      setSelectedClass(res.data);
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching subjects:', err.response?.data || err.message);
    }
  };

  const handleAddSubject = async () => {
    if (!newSubject || !selectedClass?._id) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/classes/${selectedClass._id}/subjects`,
        { subject: newSubject },
        { withCredentials: true }
      );
      setNewSubject('');
      fetchSubjects(selectedClass._id);
    } catch (err) {
      console.error('Error adding subject:', err.response?.data || err.message);
    }
  };

  const handleAddClass = async () => {
    if (!newClassName.trim()) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/classes`,
        { name: newClassName },
        { withCredentials: true }
      );
      setNewClassName('');
      setShowAddClassModal(false);
      fetchAllClasses();
    } catch (err) {
      console.error('Error adding class:', err.response?.data || err.message);
    }
  };


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header />

        <div className="flex justify-between items-center mt-10 mb-6">
          <h2 className="text-3xl font-bold">All Classes</h2>
          <button
            onClick={() => setShowAddClassModal(true)}
            className="bg-green-600 px-5 py-2 rounded-xl shadow hover:bg-green-700 font-semibold text-white"
          >
            ➕ Add Class
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classes.map((cls) => (
            <div
              key={cls._id}
              onClick={() => fetchSubjects(cls._id)}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-md cursor-pointer"
            >
              <h3 className="text-xl font-bold text-white/90">{cls.name}</h3>
              <p className="text-sm text-gray-400 mt-1">Click to manage subjects</p>
            </div>
          ))}
        </div>

        {showModal && selectedClass && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-2xl shadow-2xl w-full max-w-md relative border border-white/20">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
              >✕</button>
              <h3 className="text-xl font-bold mb-4">
                Subjects for {selectedClass.name || 'Selected Class'}
              </h3>

              <ul className="list-disc list-inside mb-4 text-sm text-gray-700 max-h-40 overflow-y-auto">
                {subjects.length > 0 ? (
                  subjects.map((sub, idx) => <li key={idx}>{sub}</li>)
                ) : (
                  <p className="text-gray-500">No subjects added yet.</p>
                )}
              </ul>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter new subject"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="p-2 border rounded w-full"
                />
                <button
                  onClick={handleAddSubject}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddClassModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-2xl shadow-2xl w-full max-w-md relative border border-white/20">
              <button
                onClick={() => setShowAddClassModal(false)}
                className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
              >✕</button>
              <h3 className="text-xl font-bold mb-4">Add New Class</h3>

              <select
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="p-2 border rounded w-full mb-4"
              >
                <option value="">-- Select Class --</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`Class ${i + 1}`}>
                    Class {i + 1}
                  </option>
                ))}
              </select>

              <div className="flex justify-end">
                <button
                  onClick={handleAddClass}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Add Class
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClasses;
