// // import React from 'react';
// // import Sidebar from '../../components/Sidebar';
// // import Header from '../../components/Header';

// // const AdminFees = () => {
// //   const students = [
// //     {
// //       id: 1,
// //       name: 'Aarav Sharma',
// //       class: 'Class 1',
// //       totalFee: 20000,
// //       paidFee: 15000,
// //     },
// //     {
// //       id: 2,
// //       name: 'Isha Verma',
// //       class: 'Class 2',
// //       totalFee: 20000,
// //       paidFee: 20000,
// //     },
// //     {
// //       id: 3,
// //       name: 'Rohan Mehta',
// //       class: 'Class 3',
// //       totalFee: 20000,
// //       paidFee: 8000,
// //     },
// //   ];

// //   return (
// //     <div className="flex min-h-screen bg-black text-white">
// //       <Sidebar role="admin" />
// //       <div className="flex-1 p-6">
// //         <Header/>

// //         <div className="flex justify-between items-center mb-6">
// //           <h2 className="text-2xl mt-10 font-bold">Fee Collection</h2>
// //           <button className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded font-medium">
// //             Export Report
// //           </button>
// //         </div>

// //         <div className="overflow-auto bg-gray-900 rounded-lg shadow-lg">
// //           <table className="w-full table-auto text-left text-white">
// //             <thead className="bg-gray-800 text-sm">
// //               <tr>
// //                 <th className="px-4 py-3">Student Name</th>
// //                 <th className="px-4 py-3">Class</th>
// //                 <th className="px-4 py-3">Total Fee</th>
// //                 <th className="px-4 py-3">Paid Fee</th>
// //                 <th className="px-4 py-3">Due Fee</th>
// //                 <th className="px-4 py-3">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody className="text-sm">
// //               {students.map((student) => {
// //                 const due = student.totalFee - student.paidFee;
// //                 const status = due === 0 ? 'Paid' : 'Pending';
// //                 return (
// //                   <tr key={student.id} className="border-b border-gray-700">
// //                     <td className="px-4 py-2">{student.name}</td>
// //                     <td className="px-4 py-2">{student.class}</td>
// //                     <td className="px-4 py-2">₹{student.totalFee.toLocaleString()}</td>
// //                     <td className="px-4 py-2 text-green-400">₹{student.paidFee.toLocaleString()}</td>
// //                     <td className="px-4 py-2 text-red-400">₹{due.toLocaleString()}</td>
// //                     <td className="px-4 py-2">
// //                       <span
// //                         className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'Paid' ? 'bg-green-600' : 'bg-yellow-500 text-black'
// //                           }`}
// //                       >
// //                         {status}
// //                       </span>
// //                     </td>
// //                   </tr>
// //                 );
// //               })}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminFees;



// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import {
//   FaChalkboard, FaBook, FaDollarSign, FaUsers, FaComments,
//   FaUserGraduate, FaClipboardCheck, FaSchool, FaCog,
//   FaSignOutAlt, FaCalendarAlt, FaBookOpen, FaThLarge,
//   FaPoll, FaHandshake, FaTimes
// } from 'react-icons/fa';
// import axios from 'axios';

// const Sidebar = ({ role, isSidebarOpen, toggleSidebar }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post('/api/user/logout', {}, { withCredentials: true });
//       navigate('/select-role');
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   const navItems = {
//     admin: [
//       { icon: <FaChalkboard />, path: '/dashboard/admin', label: 'Dashboard' },
//       { icon: <FaBook />, path: '/dashboard/admin/academics', label: 'Academics' },
//       { icon: <FaDollarSign />, path: '/dashboard/admin/finance', label: 'Finance' },
//       { icon: <FaUsers />, path: '/dashboard/admin/meeting', label: 'Meeting' },
//       { icon: <FaComments />, path: '/dashboard/admin/complaints', label: 'Complaints' },
//       { icon: <FaCalendarAlt />, path: '/dashboard/admin/events', label: 'Events' },
//     ],
//     teacher: [
//       { icon: <FaChalkboard />, path: '/dashboard/teacher', label: 'Dashboard' },
//       { icon: <FaUserGraduate />, path: '/dashboard/teacher/students', label: 'Students' },
//       { icon: <FaClipboardCheck />, path: '/dashboard/teacher/assignments', label: 'Assignments' },
//       { icon: <FaCalendarAlt />, path: '/dashboard/teacher/leaves', label: 'Leaves' },
//       { icon: <FaBookOpen />, path: '/dashboard/teacher/resources', label: 'Resources' },
//       { icon: <FaHandshake />, path: '/dashboard/teacher/meeting', label: 'Meeting' }
//     ],
//     student: [
//       { icon: <FaThLarge />, path: '/dashboard/student', label: 'Dashboard' },
//       { icon: <FaClipboardCheck />, path: '/dashboard/student/attendance', label: 'Attendance' },
//       { icon: <FaBook />, path: '/dashboard/student/syllabus', label: 'Syllabus' },
//       { icon: <FaClipboardCheck />, path: '/dashboard/student/assignments', label: 'Assignments' },
//       { icon: <FaCalendarAlt />, path: '/dashboard/student/timetable', label: 'TimeTable' },
//       { icon: <FaPoll />, path: '/dashboard/student/result', label: 'Result' },
//       { icon: <FaComments />, path: '/dashboard/student/complaints', label: 'Complaint Box' },
//     ],
//   };

//   const items = navItems[role] || [];

//   return (
//     <>
//       {/* Mobile backdrop */}
//       <div
//         className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
//           isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//         }`}
//         onClick={toggleSidebar}
//       />

//       <aside
//         className={`
//           fixed z-50 top-0 left-0 h-full w-64 md:static md:translate-x-0 transform 
//           ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
//           transition-transform duration-300 ease-in-out

//           bg-gradient-to-b from-[#0f172a]/70 via-[#1e293b]/70 to-[#0f172a]/70
//           backdrop-blur-xl shadow-2xl border-r border-white/10 
//           flex flex-col justify-between
//         `}
//       >
//         {/* Top Section */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
//           <div className="flex items-center gap-2 text-white">
//             <FaSchool className="text-2xl" />
//             <span className="text-xl font-bold">ACA</span>
//           </div>
//           <button onClick={toggleSidebar} className="md:hidden text-white text-xl">
//             <FaTimes />
//           </button>
//         </div>

//         {/* Nav Items */}
//         <nav className="flex flex-col gap-2 p-4">
//           {items.map((item) => (
//             <Link
//               to={item.path}
//               key={item.path}
//               className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//                 location.pathname === item.path
//                   ? 'bg-blue-600 text-white shadow-md'
//                   : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//               } text-sm`}
//               onClick={toggleSidebar}
//             >
//               {item.icon}
//               <span>{item.label}</span>
//             </Link>
//           ))}
//         </nav>

//         {/* Bottom Settings + Logout */}
//         <div className="px-4 pb-6 flex flex-col gap-2">
//           <Link
//             to={`/${role}/settings`}
//             className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all text-sm"
//           >
//             <FaCog />
//             <span>Settings</span>
//           </Link>

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all text-sm"
//           >
//             <FaSignOutAlt />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;


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
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* <Sidebar role="admin" /> */}
      <div className="flex-1 p-6">
        {/* <Header /> */}

        <div className="flex justify-between items-center mb-6 mt-10">
          <h2 className="text-3xl font-extrabold tracking-wide text-white drop-shadow-lg">📊 Fee Collection</h2>
          <button className="bg-green-500 hover:bg-green-600 text-black px-5 py-2 rounded-lg font-semibold shadow-md transition duration-300">
            Export Report
          </button>
        </div>

        <div className="overflow-auto rounded-xl shadow-2xl backdrop-blur-xl bg-white/5 border border-white/10">
          <table className="w-full table-auto text-left">
            <thead className="bg-white/10 text-sm text-gray-300">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Total Fee</th>
                <th className="px-6 py-4">Paid Fee</th>
                <th className="px-6 py-4">Due Fee</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-white">
              {students.map((student) => {
                const due = student.totalFee - student.paidFee;
                const status = due === 0 ? 'Paid' : 'Pending';
                return (
                  <tr key={student.id} className="border-b border-white/10 hover:bg-white/5 transition-all">
                    <td className="px-6 py-3 font-medium">{student.name}</td>
                    <td className="px-6 py-3">{student.class}</td>
                    <td className="px-6 py-3">₹{student.totalFee.toLocaleString()}</td>
                    <td className="px-6 py-3 text-green-400">₹{student.paidFee.toLocaleString()}</td>
                    <td className="px-6 py-3 text-red-400">₹{due.toLocaleString()}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'Paid' ? 'bg-green-600 text-white' : 'bg-yellow-400 text-black'}`}
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
