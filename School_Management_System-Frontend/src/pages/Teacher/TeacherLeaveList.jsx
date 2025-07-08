// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';

// axios.defaults.withCredentials = true;

// const TeacherLeaveList = () => {
//   const [leaves, setLeaves] = useState([]);


//   useEffect(() => {
//     const fetchLeaves = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/leaves`);
//         setLeaves(res.data);
//       } catch (error) {
//         console.error('Error fetching leaves:', error.response?.data || error.message);
//       }
//     };
//     fetchLeaves();
//   }, []);


//   const handleApprove = async (id) => {
//     try {
//       await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/leaves/${id}`, { status: 'Approved' });
//       setLeaves(leaves.map(l => l._id === id ? { ...l, status: 'Approved' } : l));
//     } catch (error) {
//       console.error('Approval failed:', error);
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/leaves/${id}`, { status: 'Rejected' });
//       setLeaves(leaves.map(l => l._id === id ? { ...l, status: 'Rejected' } : l));
//     } catch (error) {
//       console.error('Rejection failed:', error);
//     }
//   };

//   return (
//     <div className="flex bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white">
//       <Sidebar role="teacher" />

//       <div className="flex-1 p-6 space-y-8">
//         <Header />

//         <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
//           <h2 className="text-2xl font-bold mb-6">Student Leave Applications</h2>

//           <div className="overflow-x-auto rounded-md">
//             <table className="min-w-full text-sm text-white/90 border border-white/10">
//               <thead className="bg-white/10 text-white/80">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Student Name</th>
//                   <th className="px-4 py-3 text-left">Class</th>
//                   <th className="px-4 py-3 text-left">Roll No</th>
//                   <th className="px-4 py-3 text-left">From</th>
//                   <th className="px-4 py-3 text-left">To</th>
//                   <th className="px-4 py-3 text-left">Reason</th>
//                   <th className="px-4 py-3 text-left">Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {leaves.length > 0 ? (
//                   leaves.map((leave, index) => (
//                     <tr key={index} className="border-t border-white/10 hover:bg-white/10 transition">
//                       <td className="px-4 py-2">{leave.studentName}</td>
//                       <td className="px-4 py-2">{leave.class}</td>
//                       <td className="px-4 py-2">{leave.rollNo}</td>
//                       <td className="px-4 py-2">{leave.fromDate?.slice(0, 10)}</td>
//                       <td className="px-4 py-2">{leave.toDate?.slice(0, 10)}</td>
//                       <td className="px-4 py-2">{leave.reason}</td>
//                       <td className="px-4 py-2">
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold
//                           ${leave.status === 'Approved' ? 'bg-green-600/80 text-white'
//                             : leave.status === 'Rejected' ? 'bg-red-600/80 text-white'
//                               : 'bg-yellow-500/80 text-black'}`}>
//                           {leave.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td className="px-4 py-2">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleApprove(leave._id)}
//                           className="px-2 py-1 bg-green-600 rounded hover:bg-green-500"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => handleReject(leave._id)}
//                           className="px-2 py-1 bg-red-600 rounded hover:bg-red-500"
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherLeaveList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

axios.defaults.withCredentials = true;

const TeacherLeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/leaves`, { withCredentials: true });
        setLeaves(res.data);
      } catch (error) {
        console.error('Error fetching leaves:', error.response?.data || error.message);
      }
    };
    fetchLeaves();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/leaves/${id}`, { withCredentials: true },{ status: 'Approved' });
      setLeaves(leaves.map(l => l._id === id ? { ...l, status: 'Approved' } : l));
    } catch (error) {
      console.error('Approval failed:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/leaves/${id}`, { withCredentials: true }, { withCredentials: true }, { status: 'Rejected' });
      setLeaves(leaves.map(l => l._id === id ? { ...l, status: 'Rejected' } : l));
    } catch (error) {
      console.error('Rejection failed:', error);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-black via-gray-900 to-black min-h-screen text-white">
      <Sidebar role="teacher" />

      <div className="flex-1 p-6 space-y-8">
        <Header />

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
          <h2 className="text-2xl font-bold mb-6">Student Leave Applications</h2>

          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full text-sm text-white/90 border border-white/10">
              <thead className="bg-white/10 text-white/80">
                <tr>
                  <th className="px-4 py-3 text-left">Student Name</th>
                  <th className="px-4 py-3 text-left">Class</th>
                  <th className="px-4 py-3 text-left">Roll No</th>
                  <th className="px-4 py-3 text-left">From</th>
                  <th className="px-4 py-3 text-left">To</th>
                  <th className="px-4 py-3 text-left">Reason</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {leaves.length > 0 ? (
                  leaves.map((leave) => (
                    <tr key={leave._id} className="border-t border-white/10 hover:bg-white/10 transition">
                      <td className="px-4 py-2">{leave.studentName}</td>
                      <td className="px-4 py-2">{leave.class}</td>
                      <td className="px-4 py-2">{leave.rollNo}</td>
                      <td className="px-4 py-2">{leave.fromDate?.slice(0, 10)}</td>
                      <td className="px-4 py-2">{leave.toDate?.slice(0, 10)}</td>
                      <td className="px-4 py-2">{leave.reason}</td>
                      <td className="px-4 py-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${leave.status === 'Approved' ? 'bg-green-600/80 text-white'
                            : leave.status === 'Rejected' ? 'bg-red-600/80 text-white'
                              : 'bg-yellow-500/80 text-black'}`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {leave.status === 'Pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(leave._id)}
                              className="px-2 py-1 bg-green-600 rounded hover:bg-green-500"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(leave._id)}
                              className="px-2 py-1 bg-red-600 rounded hover:bg-red-500"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-4 py-4 text-center">
                      No leave applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLeaveList;