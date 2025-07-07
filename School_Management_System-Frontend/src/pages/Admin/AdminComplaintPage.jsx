
// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';

// const AdminComplaintPage = () => {
//   const [complaints, setComplaints] = useState([]);

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complaints`, {
//           credentials: 'include' // Add this
//         });
//         const data = await res.json();
//         setComplaints(data);
//       } catch (err) {
//         console.error('Failed to fetch complaints', err);
//       }
//     };
//     fetchComplaints();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="admin" />
//       <div className="flex-1 p-6 md:p-10">
//         <Header role="admin" name="Principal Name" designation="Admin" />

//         <h1 className="text-3xl font-bold mb-8 text-white">Received Complaints</h1>

//         <div className="overflow-x-auto">
//           {complaints.length > 0 ? (
//             <table className="w-full text-left rounded-xl overflow-hidden backdrop-blur bg-white/5 border border-white/10 shadow-2xl">
//               <thead className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 text-white">
//                 <tr>
//                   <th className="p-4 text-sm font-semibold">Name</th>
//                   <th className="p-4 text-sm font-semibold">Class</th>
//                   <th className="p-4 text-sm font-semibold">Roll No</th>
//                   <th className="p-4 text-sm font-semibold">Complaint</th>
//                   <th className="p-4 text-sm font-semibold">Priority</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {complaints.map((item, i) => (
//                   <tr
//                     key={i}
//                     className="hover:bg-white/10 transition duration-300 border-t border-white/10"
//                   >
//                     <td className="p-4 text-sm text-white/90">{item.name}</td>
//                     <td className="p-4 text-sm text-white/90">{item.class}</td>
//                     <td className="p-4 text-sm text-white/90">{item.rollNo}</td>
//                     <td className="p-4 text-sm text-white/90">{item.complaint}</td>
//                     <td className="p-4 text-sm text-yellow-400 font-semibold">{item.priority}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="text-gray-400 text-lg">No complaints received yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminComplaintPage;



import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminComplaintPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complaints`, {
          credentials: 'include'
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch complaints');
        }
        
        const data = await res.json();
        setComplaints(data);
      } catch (err) {
        console.error('Failed to fetch complaints', err);
        setError('Failed to load complaints. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  // Priority badge styling
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': 
        return 'bg-gradient-to-r from-red-600 to-orange-500 text-red-100';
      case 'Medium':
        return 'bg-gradient-to-r from-amber-600 to-yellow-500 text-amber-100';
      case 'Low':
        return 'bg-gradient-to-r from-green-600 to-emerald-500 text-green-100';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6 md:p-10">
        <Header role="admin" name="Principal Name" designation="Admin" />

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Received Complaints
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
          </div>

          {error ? (
            <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-300">{error}</span>
            </div>
          ) : null}

          <div className="overflow-x-auto rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
              </div>
            ) : complaints.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-800/70 to-gray-700/70">
                  <tr>
                    <th className="p-4 text-left text-sm font-medium text-blue-300">Student</th>
                    <th className="p-4 text-left text-sm font-medium text-blue-300">Class</th>
                    <th className="p-4 text-left text-sm font-medium text-blue-300">Roll No</th>
                    <th className="p-4 text-left text-sm font-medium text-blue-300">Complaint</th>
                    <th className="p-4 text-left text-sm font-medium text-blue-300">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {complaints.map((item, i) => (
                    <tr
                      key={i}
                      className="hover:bg-white/5 transition duration-150"
                    >
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="bg-gray-700 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center mr-3">
                            <span className="text-xs font-bold">{item.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-medium text-white">{item.name}</div>
                            <div className="text-xs text-gray-400">{item.studentName || 'Student'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-white/90">{item.class}</td>
                      <td className="p-4 text-white/90">{item.rollNo}</td>
                      <td className="p-4">
                        <div className="text-white/90 max-w-md">{item.complaintText || item.complaint}</div>
                        <div className="text-xs text-cyan-400 mt-1">
                          {new Date(item.createdAt).toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityClass(item.priority)}`}>
                          {item.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16">
                <div className="inline-block p-4 bg-gray-800/50 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-300 mb-2">No Complaints Yet</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  All issues are resolved! No complaints have been submitted by students.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintPage;