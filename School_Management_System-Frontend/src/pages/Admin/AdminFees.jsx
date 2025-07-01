import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminFees = () => {
  const students = [
    {
      id: 1,
      name: 'Aarav Sharma',
      class: 'Class 1',
      totalFee: 20000,
      paidFee: 15000,
    },
    {
      id: 2,
      name: 'Isha Verma',
      class: 'Class 2',
      totalFee: 20000,
      paidFee: 20000,
    },
    {
      id: 3,
      name: 'Rohan Mehta',
      class: 'Class 3',
      totalFee: 20000,
      paidFee: 8000,
    },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header/>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl mt-10 font-bold">Fee Collection</h2>
          <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded font-medium">
            Export Report
          </button>
        </div>

        <div className="overflow-auto bg-gray-900 rounded-lg shadow-lg">
          <table className="w-full table-auto text-left text-white">
            <thead className="bg-gray-800 text-sm">
              <tr>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Total Fee</th>
                <th className="px-4 py-3">Paid Fee</th>
                <th className="px-4 py-3">Due Fee</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {students.map((student) => {
                const due = student.totalFee - student.paidFee;
                const status = due === 0 ? 'Paid' : 'Pending';
                return (
                  <tr key={student.id} className="border-b border-gray-700">
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.class}</td>
                    <td className="px-4 py-2">₹{student.totalFee.toLocaleString()}</td>
                    <td className="px-4 py-2 text-green-400">₹{student.paidFee.toLocaleString()}</td>
                    <td className="px-4 py-2 text-red-400">₹{due.toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'Paid' ? 'bg-green-600' : 'bg-yellow-500 text-black'
                          }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFees;
