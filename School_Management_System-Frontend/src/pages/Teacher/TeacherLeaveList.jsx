// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';

// const TeacherLeaveList = () => {
//   const [leaves, setLeaves] = useState([]);

//   useEffect(() => {
//     const fetchLeaves = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/leaves');
//         setLeaves(res.data);
//       } catch (error) {
//         console.error('Error fetching leaves:', error);
//       }
//     };
//     fetchLeaves();
//   }, []);

//   return (
//     <div className="flex bg-[#0f1117] min-h-screen text-white">
//       <Sidebar role="teacher" />
//       <div className="flex-1 p-6">
//         <Header />
//         <h2 className="text-2xl font-bold mb-6">Student Leave Applications</h2>

//         <div className="overflow-x-auto rounded-lg shadow-md bg-gray-900">
//           <table className="min-w-full table-auto">
//             <thead className="bg-gray-800 text-left">
//               <tr>
//                 <th className="px-4 py-2">Student Name</th>
//                 <th className="px-4 py-2">Class</th>
//                 <th className="px-4 py-2">Roll No</th>
//                 <th className="px-4 py-2">From</th>
//                 <th className="px-4 py-2">To</th>
//                 <th className="px-4 py-2">Reason</th>
//                 <th className="px-4 py-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leaves.length > 0 ? (
//                 leaves.map((leave, index) => (
//                   <tr key={index} className="border-t border-gray-700 hover:bg-gray-800 transition">
//                     <td className="px-4 py-2">{leave.studentName}</td>
//                     <td className="px-4 py-2">{leave.class}</td>
//                     <td className="px-4 py-2">{leave.rollNo}</td>
//                     <td className="px-4 py-2">{leave.fromDate?.slice(0, 10)}</td>
//                     <td className="px-4 py-2">{leave.toDate?.slice(0, 10)}</td>
//                     <td className="px-4 py-2">{leave.reason}</td>
//                     <td className="px-4 py-2">
//                       <span className={`px-2 py-1 rounded text-sm ${
//                         leave.status === 'Approved'
//                           ? 'bg-green-700'
//                           : leave.status === 'Rejected'
//                           ? 'bg-red-600'
//                           : 'bg-yellow-600'
//                       }`}>
//                         {leave.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center text-gray-400 py-6">No leave applications found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
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

// Enable credentials globally
axios.defaults.withCredentials = true;

const TeacherLeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get('/api/leaves'); // ✅ Cookie-based auth
        setLeaves(res.data);
      } catch (error) {
        console.error('Error fetching leaves:', error.response?.data || error.message);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div className="flex bg-[#0f1117] min-h-screen text-white">
      <Sidebar role="teacher" />
      <div className="flex-1 p-6">
        <Header />
        <h2 className="text-2xl font-bold mb-6">Student Leave Applications</h2>

        <div className="overflow-x-auto rounded-lg shadow-md bg-gray-900">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-left">
              <tr>
                <th className="px-4 py-2">Student Name</th>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Roll No</th>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">To</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length > 0 ? (
                leaves.map((leave, index) => (
                  <tr key={index} className="border-t border-gray-700 hover:bg-gray-800 transition">
                    <td className="px-4 py-2">{leave.studentName}</td>
                    <td className="px-4 py-2">{leave.class}</td>
                    <td className="px-4 py-2">{leave.rollNo}</td>
                    <td className="px-4 py-2">{leave.fromDate?.slice(0, 10)}</td>
                    <td className="px-4 py-2">{leave.toDate?.slice(0, 10)}</td>
                    <td className="px-4 py-2">{leave.reason}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        leave.status === 'Approved'
                          ? 'bg-green-700'
                          : leave.status === 'Rejected'
                          ? 'bg-red-600'
                          : 'bg-yellow-600'
                      }`}>
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-400 py-6">
                    No leave applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherLeaveList;
