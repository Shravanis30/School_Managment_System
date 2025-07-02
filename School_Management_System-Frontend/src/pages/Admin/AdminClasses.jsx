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
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchAllClasses();
  }, []);

  const fetchAllClasses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/classes', config);
      setClasses(res.data);
    } catch (err) {
      console.error('Error fetching classes:', err.message);
    }
  };

  const fetchSubjects = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/classes/${id}`, config);
      setSubjects(res.data.subjects || []);
      setSelectedClass(res.data);
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching subjects:', err.message);
    }
  };

  const handleAddSubject = async () => {
    if (!newSubject || !selectedClass?._id) return;
    try {
      await axios.post(`http://localhost:5000/api/classes/${selectedClass._id}/subjects`, {
        subject: newSubject,

      }, config);
      setNewSubject('');
      fetchSubjects(selectedClass._id);
    } catch (err) {
      console.error('Error adding subject:', err.message);
    }
  };

  const handleAddClass = async () => {
    if (!newClassName.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/classes', { name: newClassName }, config);
      setNewClassName('');
      setShowAddClassModal(false);
      fetchAllClasses();
    } catch (err) {
      console.error('Error adding class:', err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header />

        {/* Header row with title and Add Class button */}
        <div className="flex justify-between items-center mt-10 mb-6">
          <h2 className="text-2xl font-bold">All Classes</h2>
          <button
            onClick={() => setShowAddClassModal(true)}
            className="bg-green-600 px-4 py-1 rounded text-white font-semibold hover:bg-green-700"
          >
            ➕ Add Class
          </button>
        </div>

        {/* Classes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classes.map((cls) => (
            <div
              key={cls._id}
              onClick={() => fetchSubjects(cls._id)}
              className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-xl transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold">{cls.name}</h3>
              <p className="text-sm text-gray-400">Click to manage subjects</p>
            </div>
          ))}
        </div>

        {/* Modal for managing subjects */}
        {showModal && selectedClass && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-xl w-full max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>
              <h3 className="text-lg font-bold mb-4">
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

        {/* Modal for adding class */}
        {showAddClassModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-xl w-full max-w-md relative">
              <button
                onClick={() => setShowAddClassModal(false)}
                className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>
              <h3 className="text-lg font-bold mb-4">Add New Class</h3>

              {/* Dropdown for class selection */}
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
