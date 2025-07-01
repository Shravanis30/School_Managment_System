import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminComplaintPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('complaints')) || [];
    setComplaints(stored);
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-10">
        <Header role="admin" name="Principal Name" designation="Admin" />

        <h1 className="text-xl font-bold mt-10 mb-6">Received Complaints</h1>
        <div className="overflow-x-auto">
          {complaints.length > 0 ? (
            <table className="table-auto w-full text-left">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2">Name</th>
                  <th className="p-2">Class</th>
                  <th className="p-2">Roll No</th>
                  <th className="p-2">Complaint</th>
                  <th className="p-2">Priority</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((item, i) => (
                  <tr key={i} className="bg-gray-700">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.class}</td>
                    <td className="p-2">{item.rollNo}</td>
                    <td className="p-2">{item.complaint}</td>
                    <td className="p-2">{item.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400">No complaints received yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintPage;
