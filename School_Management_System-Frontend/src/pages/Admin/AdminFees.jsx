// Updated AdminFees.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminFees = () => {
  const [feeStructures, setFeeStructures] = useState({});
  const [selectedClass, setSelectedClass] = useState('');
  const [amount, setAmount] = useState('');
  const [students, setStudents] = useState([]);
  const [classOptions, setClassOptions] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setClassOptions(data.map(cls => cls.name)));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fee-structure`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        const structure = {};
        data.forEach(item => structure[item.className] = item.amount);
        setFeeStructures(structure);
      });
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/students/by-class-name/${selectedClass}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setStudents(data));
    }
  }, [selectedClass]);

  const handleFeeSubmit = async () => {
    if (!selectedClass || !amount) return;

    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fee-structure`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ className: selectedClass, amount }),
    });

    setFeeStructures(prev => ({ ...prev, [selectedClass]: amount }));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header />

        <div className="mt-10 mb-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">💰 Fee Management</h2>
        </div>

        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Select Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-gray-800 px-3 py-2 rounded w-full"
            >
              <option value="">-- Select --</option>
              {classOptions.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Fee Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-800 px-3 py-2 rounded w-full"
            />
          </div>

          <button
            onClick={handleFeeSubmit}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Set Fee Structure
          </button>
        </div>

        {selectedClass && (
          <>
            <h3 className="text-xl font-semibold mt-10 mb-4">🧾 Fee Collection - {selectedClass}</h3>
            <div className="overflow-auto rounded-xl shadow-2xl bg-white/5 border border-white/10">
              <table className="w-full text-left">
                <thead className="text-sm bg-white/10">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Class</th>
                    <th className="px-6 py-3">Total Fee</th>
                    <th className="px-6 py-3">Paid</th>
                    <th className="px-6 py-3">Due</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => {
                    const total = parseInt(feeStructures[student.className]) || 0;
                    const paid = student.paidFee || 0;
                    const due = total - paid;
                    return (
                      <tr key={student._id} className="border-t border-white/10">
                        <td className="px-6 py-3">{student.name}</td>
                        <td className="px-6 py-3">{student.className}</td>
                        <td className="px-6 py-3">₹{total}</td>
                        <td className="px-6 py-3 text-green-400">₹{paid}</td>
                        <td className="px-6 py-3 text-red-400">₹{due}</td>
                        <td className="px-6 py-3">
                          <span className={`px-3 py-1 text-xs rounded-full ${due === 0 ? 'bg-green-600' : 'bg-yellow-400 text-black'}`}>
                            {due === 0 ? 'Paid' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminFees;
