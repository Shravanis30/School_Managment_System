// // // components/NoticeBoard.jsx
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { FaBell } from 'react-icons/fa';

// // const NoticeBoard = () => {
// //   const [notices, setNotices] = useState([]);

// //   useEffect(() => {
// //     const fetchNotices = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         const res = await axios.get('http://localhost:5000/api/notices', {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setNotices(res.data);
// //       } catch (err) {
// //         console.error('Error fetching notices:', err);
// //       }
// //     };

// //     fetchNotices();
// //   }, []);

// //   return (
// //     <div className="bg-[#1b2236] p-6 rounded-xl shadow-md mt-6">
// //       <div className="flex items-center gap-3 mb-5">
// //         <FaBell className="text-yellow-400 text-xl" />
// //         <h3 className="text-xl font-bold text-white">Notice Board</h3>
// //       </div>

// //       {notices.length === 0 ? (
// //         <p className="text-gray-400 text-sm">No notices available.</p>
// //       ) : (
// //         <div className="space-y-4">
// //           {notices.map((notice, index) => (
// //             <div
// //               key={notice._id}
// //               className="bg-[#2a3248] rounded-lg p-4 border border-gray-700 hover:shadow-lg transition"
// //             >
// //               <div className="flex items-center justify-between mb-2">
// //                 <span className="text-sm text-gray-400">#{index + 1}</span>
// //                 <span className="text-sm text-blue-400 font-medium">
// //                   {new Date(notice.date).toLocaleDateString()}
// //                 </span>
// //               </div>
// //               <h4 className="text-lg font-semibold text-white mb-1">
// //                 {notice.title}
// //               </h4>
// //               <p className="text-sm text-gray-300">{notice.details}</p>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default NoticeBoard;


// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { FaBell } from 'react-icons/fa';

// // const NoticeBoard = () => {
// //   const [notices, setNotices] = useState([]);

// //   useEffect(() => {
// //     const fetchNotices = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         const res = await axios.get('/api/notices', {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setNotices(res.data);
// //       } catch (err) {
// //         console.error('Error fetching notices:', err);
// //       }
// //     };

// //     fetchNotices();
// //   }, []);

// //   return (
// //     <div className="bg-[#1b2236] p-6 rounded-xl shadow-md mt-6">
// //       <div className="flex items-center gap-3 mb-5">
// //         <FaBell className="text-yellow-400 text-xl" />
// //         <h3 className="text-xl font-bold text-white">Notice Board</h3>
// //       </div>

// //       {notices.length === 0 ? (
// //         <p className="text-gray-400 text-sm">No notices available.</p>
// //       ) : (
// //         <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
// //           {notices.map((notice, index) => (
// //             <div
// //               key={notice._id}
// //               className="bg-[#2a3248] rounded-lg p-4 border border-gray-700 hover:shadow-lg transition"
// //             >
// //               <div className="flex items-center justify-between mb-2">
// //                 <span className="text-sm text-gray-400">#{index + 1}</span>
// //                 <span className="text-sm text-blue-400 font-medium">
// //                   {new Date(notice.date).toLocaleDateString()}
// //                 </span>
// //               </div>
// //               <h4 className="text-lg font-semibold text-white mb-1">
// //                 {notice.title}
// //               </h4>
// //               <p className="text-sm text-gray-300">{notice.details}</p>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default NoticeBoard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaBell } from 'react-icons/fa';

// const NoticeBoard = () => {
//   const [notices, setNotices] = useState([]);

//   useEffect(() => {
//     const fetchNotices = async () => {
//       try {
//         const res = await axios.get('/api/notices', {
//           withCredentials: true, // ✅ Ensures cookies (like accessToken) are sent
//         });
//         setNotices(res.data);
//       } catch (err) {
//         console.error('Error fetching notices:', err);
//       }
//     };

//     fetchNotices();
//   }, []);

//   return (
//     <div className="bg-[#1b2236] p-6 rounded-xl shadow-md mt-6">
//       <div className="flex items-center gap-3 mb-5">
//         <FaBell className="text-yellow-400 text-xl" />
//         <h3 className="text-xl font-bold text-white">Notice Board</h3>
//       </div>

//       {notices.length === 0 ? (
//         <p className="text-gray-400 text-sm">No notices available.</p>
//       ) : (
//         <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
//           {notices.map((notice, index) => (
//             <div
//               key={notice._id}
//               className="bg-[#2a3248] rounded-lg p-4 border border-gray-700 hover:shadow-lg transition"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm text-gray-400">#{index + 1}</span>
//                 <span className="text-sm text-blue-400 font-medium">
//                   {new Date(notice.date).toLocaleDateString()}
//                 </span>
//               </div>
//               <h4 className="text-lg font-semibold text-white mb-1">
//                 {notice.title}
//               </h4>
//               <p className="text-sm text-gray-300">{notice.details}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoticeBoard;



import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaChalkboard,
  FaBook,
  FaDollarSign,
  FaUsers,
  FaComments,
  FaUserGraduate,
  FaClipboardCheck,
  FaSchool,
  FaProjectDiagram,
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaBookOpen,
  FaThLarge,
  FaPoll,
  FaCalendarCheck,
  FaHandshake,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';

const Sidebar = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await axios.post('/api/user/logout', {}, { withCredentials: true });
      navigate('/select-role');
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  const navItems = {
    admin: [
      { icon: <FaChalkboard />, path: '/dashboard/admin', label: 'Dashboard' },
      { icon: <FaBook />, path: '/dashboard/admin/academics', label: 'Academics' },
      { icon: <FaDollarSign />, path: '/dashboard/admin/finance', label: 'Finance' },
      { icon: <FaUsers />, path: '/dashboard/admin/meeting', label: 'Meeting' },
      { icon: <FaComments />, path: '/dashboard/admin/complaints', label: 'Complaints' },
      { icon: <FaCalendarAlt />, path: '/dashboard/admin/events', label: 'Events' },
    ],
    teacher: [
      { icon: <FaChalkboard />, path: '/dashboard/teacher', label: 'Dashboard' },
      { icon: <FaUserGraduate />, path: '/dashboard/teacher/students', label: 'Students' },
      { icon: <FaClipboardCheck />, path: '/dashboard/teacher/assignments', label: 'Assignments' },
      { icon: <FaCalendarAlt />, path: '/dashboard/teacher/leaves', label: 'Leaves' },
      { icon: <FaBookOpen />, path: '/dashboard/teacher/resources', label: 'Resources' },
      { icon: <FaHandshake />, path: '/dashboard/teacher/meeting', label: 'Meeting' }
    ],
    student: [
      { icon: <FaThLarge />, path: '/dashboard/student', label: 'Dashboard' },
      { icon: <FaClipboardCheck />, path: '/dashboard/student/attendance', label: 'Attendance' },
      { icon: <FaBook />, path: '/dashboard/student/syllabus', label: 'Syllabus' },
      { icon: <FaClipboardCheck />, path: '/dashboard/student/assignments', label: 'Assignments' },
      { icon: <FaCalendarAlt />, path: '/dashboard/student/timetable', label: 'TimeTable' },
      { icon: <FaPoll />, path: '/dashboard/student/result', label: 'Result' },
      { icon: <FaComments />, path: '/dashboard/student/complaints', label: 'Complaint Box' },
    ],
  };

  const items = navItems[role] || [];

  return (
    <div className={`transition-all duration-500 ${isOpen ? 'w-64' : 'w-16'} m-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg text-white flex flex-col justify-between min-h-screen`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FaSchool className="text-2xl" />
            {isOpen && <span className="text-xl font-bold">ACA</span>}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-blue-300 text-xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {items.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              title={item.label}
              className={`flex items-center gap-4 px-3 py-2 rounded-lg transition-all duration-300 ${location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-blue-700/40 hover:text-white'}`}
            >
              {item.icon}
              {isOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <Link
          to={`/${role}/settings`}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-blue-700/40 hover:text-white transition-all"
        >
          <FaCog />
          {isOpen && <span className="text-sm">Settings</span>}
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-red-600/40 hover:text-white transition-all"
        >
          <FaSignOutAlt />
          {isOpen && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
