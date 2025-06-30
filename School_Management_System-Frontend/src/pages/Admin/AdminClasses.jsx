import React from 'react';
import Sidebar from '../../components/Sidebar';

const AdminClasses = () => {
  const classes = [
    { id: 1, name: 'Class 1' },
    { id: 2, name: 'Class 2' },
    { id: 3, name: 'Class 3' },
    { id: 4, name: 'Class 4' },
    { id: 5, name: 'Class 5' },
    { id: 6, name: 'Class 6' },
    { id: 7, name: 'Class 7' },
    { id: 8, name: 'Class 8' },
    { id: 9, name: 'Class 9' },
    { id: 10, name: 'Class 10' },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">All Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{cls.name}</h3>
              <p className="text-sm text-gray-400">Class ID: {cls.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminClasses;
