
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminComplaintPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('/api/complaints', {
          credentials: 'include' // Add this
        });
        const data = await res.json();
        setComplaints(data);
      } catch (err) {
        console.error('Failed to fetch complaints', err);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6 md:p-10">
        <Header role="admin" name="Principal Name" designation="Admin" />

        <h1 className="text-3xl font-bold mb-8 text-white">Received Complaints</h1>

        <div className="overflow-x-auto">
          {complaints.length > 0 ? (
            <table className="w-full text-left rounded-xl overflow-hidden backdrop-blur bg-white/5 border border-white/10 shadow-2xl">
              <thead className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 text-white">
                <tr>
                  <th className="p-4 text-sm font-semibold">Name</th>
                  <th className="p-4 text-sm font-semibold">Class</th>
                  <th className="p-4 text-sm font-semibold">Roll No</th>
                  <th className="p-4 text-sm font-semibold">Complaint</th>
                  <th className="p-4 text-sm font-semibold">Priority</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-white/10 transition duration-300 border-t border-white/10"
                  >
                    <td className="p-4 text-sm text-white/90">{item.name}</td>
                    <td className="p-4 text-sm text-white/90">{item.class}</td>
                    <td className="p-4 text-sm text-white/90">{item.rollNo}</td>
                    <td className="p-4 text-sm text-white/90">{item.complaint}</td>
                    <td className="p-4 text-sm text-yellow-400 font-semibold">{item.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-lg">No complaints received yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintPage;
