// // import { Link, useLocation } from 'react-router-dom';

// // const Sidebar = ({ role }) => {
// //   const location = useLocation();
// //   const links = {
// //     admin: [
// //       { path: '/dashboard/admin', label: 'Overview' },
// //       { path: '/dashboard/admin/users', label: 'Manage Users' },
// //       { path: '/dashboard/admin/attendance', label: 'Attendance' },
// //     ],
// //     teacher: [
// //       { path: '/dashboard/teacher', label: 'My Classes' },
// //       { path: '/dashboard/teacher/attendance', label: 'Mark Attendance' },
// //       { path: '/dashboard/teacher/assignments', label: 'Assignments' },
// //     ],
// //     student: [
// //       { path: '/dashboard/student', label: 'My Dashboard' },
// //       { path: '/dashboard/student/attendance', label: 'My Attendance' },
// //       { path: '/dashboard/student/grades', label: 'My Grades' },
// //     ],
// //   };

// //   const roleLinks = links[role] || [];

// //   return (
// //     <aside className="bg-gray-900 text-white w-64 min-h-screen p-4 space-y-4">
// //       <h2 className="text-xl font-bold capitalize">{role} Dashboard</h2>
// //       <nav className="flex flex-col space-y-2">
// //         {roleLinks.map(link => (
// //           <Link
// //             key={link.path}
// //             to={link.path}
// //             className={`px-3 py-2 rounded hover:bg-gray-700 ${
// //               location.pathname === link.path ? 'bg-blue-600' : ''
// //             }`}
// //           >
// //             {link.label}
// //           </Link>
// //         ))}
// //       </nav>
// //     </aside>
// //   );
// // };

// // export default Sidebar;



// import { Link, useLocation } from 'react-router-dom';
// import {
//   FaChalkboard,
//   FaBook,
//   FaDollarSign,
//   FaUsers,
//   FaComments,
//   FaUserGraduate,
//   FaClipboardCheck,
//   FaSchool,
//   FaProjectDiagram,
//   FaCog,
//   FaSignOutAlt,
//   FaCalendarAlt,
// } from 'react-icons/fa';

// const Sidebar = ({ role }) => {
//   const location = useLocation();

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
//       { icon: <FaChalkboard />, path: '/dashboard/teacher', label: 'My Classes' },
//       { icon: <FaClipboardCheck />, path: '/dashboard/teacher/attendance', label: 'Attendance' },
//       { icon: <FaBook />, path: '/dashboard/teacher/assignments', label: 'Assignments' },
//       { icon: <FaProjectDiagram />, path: '/dashboard/teacher/projects', label: 'Projects' },
//     ],
//     student: [
//       { icon: <FaUserGraduate />, path: '/dashboard/student', label: 'My Dashboard' },
//       { icon: <FaClipboardCheck />, path: '/dashboard/student/attendance', label: 'Attendance' },
//       { icon: <FaBook />, path: '/dashboard/student/courses', label: 'Courses' },
//       { icon: <FaProjectDiagram />, path: '/dashboard/student/assignments', label: 'Assignments' },
//     ],
//   };

//   const items = navItems[role] || [];

//   return (
//     <aside className="bg-gray-900/70 m-4 text-white w-64 min-h-screen flex flex-col justify-between py-6 px-4">
//       {/* Top Logo */}
//       <div>
//         <h2 className="text-2xl font-bold mb-10 flex items-center gap-2 text-white">
//           <FaSchool className="text-3xl" /> ACA
//         </h2>
//         <nav className="space-y-4">
//           {items.map((item) => (
//             <Link
//               to={item.path}
//               key={item.path}
//               className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 ${location.pathname === item.path ? 'bg-gray-800' : ''
//                 }`}
//             >
//               {item.icon}
//               <span>{item.label}</span>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Bottom Links */}
//       <div className="space-y-2">
//         <Link
//           to={`/${role}/settings`}
//           className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800"
//         >
//           <FaCog />
//           Settings
//         </Link>
//         <Link
//           to="/logout"
//           className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800"
//         >
//           <FaSignOutAlt />
//           Logout
//         </Link>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;



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
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaBookOpen,
  FaThLarge,
  FaPoll,
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
      { icon: <FaChalkboard size={24} />, path: '/dashboard/admin', label: 'Dashboard' },
      { icon: <FaBook size={24} />, path: '/dashboard/admin/academics', label: 'Academics' },
      { icon: <FaDollarSign size={24} />, path: '/dashboard/admin/finance', label: 'Finance' },
      { icon: <FaUsers size={24} />, path: '/dashboard/admin/meeting', label: 'Meeting' },
      { icon: <FaComments size={24} />, path: '/dashboard/admin/complaints', label: 'Complaints' },
      { icon: <FaCalendarAlt size={24} />, path: '/dashboard/admin/events', label: 'Events' },
    ],
    teacher: [
      { icon: <FaChalkboard size={24} />, path: '/dashboard/teacher', label: 'Dashboard' },
      { icon: <FaUserGraduate size={24} />, path: '/dashboard/teacher/students', label: 'Students' },
      { icon: <FaClipboardCheck size={24} />, path: '/dashboard/teacher/assignments', label: 'Assignments' },
      { icon: <FaCalendarAlt size={24} />, path: '/dashboard/teacher/leaves', label: 'Leaves' },
      { icon: <FaBookOpen size={24} />, path: '/dashboard/teacher/resources', label: 'Resources' },
      { icon: <FaHandshake size={24} />, path: '/dashboard/teacher/meeting', label: 'Meeting' }
    ],
    student: [
      { icon: <FaThLarge size={24} />, path: '/dashboard/student', label: 'Dashboard' },
      { icon: <FaClipboardCheck size={24} />, path: '/dashboard/student/attendance', label: 'Attendance' },
      { icon: <FaBook size={24} />, path: '/dashboard/student/syllabus', label: 'Syllabus' },
      { icon: <FaClipboardCheck size={24} />, path: '/dashboard/student/assignments', label: 'Assignments' },
      { icon: <FaCalendarAlt size={24} />, path: '/dashboard/student/timetable', label: 'TimeTable' },
      { icon: <FaPoll size={24} />, path: '/dashboard/student/marks', label: 'Result' },
      { icon: <FaComments size={24} />, path: '/dashboard/student/complaints', label: 'Complaint Box' },
      { icon: <FaComments size={24} />, path: '/dashboard/student/fees', label: 'Fee Structure' },
    ],
  };

  const items = navItems[role] || [];

  return (
    <div className={`transition-all duration-500 ${isOpen ? 'w-64' : 'w-16'} m-4 top-4 left-4 bottom-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl text-white flex flex-col justify-between z-50`}>
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          {isOpen && (
            <div className="flex items-center gap-2">
              <FaSchool className="text-3xl" />
              <span className="text-2xl font-bold">ACA</span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-blue-300 text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3">
          {items.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              title={item.label}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 text-lg ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-blue-700/40 hover:text-white'
              }`}
            >
              {item.icon}
              {isOpen && <span className="text-lg font-semibold">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Settings + Logout */}
      <div className="p-4 flex flex-col gap-3">
        <Link
          to={`/${role}/settings`}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-blue-700/40 hover:text-white transition-all text-lg"
        >
          <FaCog size={24} />
          {isOpen && <span className="text-lg font-semibold">Settings</span>}
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600/40 hover:text-white transition-all text-lg"
        >
          <FaSignOutAlt size={24} />
          {isOpen && <span className="text-lg font-semibold">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
