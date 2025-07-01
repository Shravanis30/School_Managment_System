import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      subject: 'Mathematics',
      classTeacherOf: 'Class 6'
    },
    {
      id: 2,
      name: 'Meena Sharma',
      subject: 'Science',
      classTeacherOf: 'Class 7'
    }
  ]);

  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', classTeacherOf: '' });
  const [showForm, setShowForm] = useState(false);

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.subject && newTeacher.classTeacherOf) {
      const updatedTeachers = [
        { ...newTeacher, id: Date.now() },
        ...teachers
      ];
      setTeachers(updatedTeachers);
      setNewTeacher({ name: '', subject: '', classTeacherOf: '' });
      setShowForm(false);
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header />
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-2 md:mb-0">All Teachers</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded shadow"
          >
            + Register Teacher
          </button>
        </div>

        {/* Teacher Registration Form */}
        {showForm && (
          <div className="bg-white text-black p-6 rounded shadow-lg max-w-md mx-auto mb-6">
            <h3 className="text-xl font-semibold mb-4">Register New Teacher</h3>
            <input
              type="text"
              placeholder="Teacher Name"
              className="w-full mb-3 p-2 border rounded"
              value={newTeacher.name}
              onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full mb-3 p-2 border rounded"
              value={newTeacher.subject}
              onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
            />
            <input
              type="text"
              placeholder="Class Teacher Of (e.g., Class 8)"
              className="w-full mb-3 p-2 border rounded"
              value={newTeacher.classTeacherOf}
              onChange={(e) => setNewTeacher({ ...newTeacher, classTeacherOf: e.target.value })}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >Cancel</button>
              <button
                onClick={handleAddTeacher}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >Add</button>
            </div>
          </div>
        )}

        {/* Teachers Table */}
        <div className="bg-gray-800 p-4 rounded shadow overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Class Teacher Of</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, i) => (
                <tr key={t.id} className="border-t border-gray-600 hover:bg-gray-700">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{t.name}</td>
                  <td className="p-3">{t.subject}</td>
                  <td className="p-3">{t.classTeacherOf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTeachers;
