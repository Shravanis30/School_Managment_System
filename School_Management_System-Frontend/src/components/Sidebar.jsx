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



import { Link, useLocation } from 'react-router-dom';
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
  FaBookOpen
} from 'react-icons/fa';

const Sidebar = ({ role }) => {
  const location = useLocation();

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

    ],

    student: [
      { icon: <FaUserGraduate />, path: '/dashboard/student', label: 'My Dashboard' },
      { icon: <FaClipboardCheck />, path: '/dashboard/student/attendance', label: 'Attendance' },
      { icon: <FaBook />, path: '/dashboard/student/courses', label: 'Courses' },
      { icon: <FaProjectDiagram />, path: '/dashboard/student/assignments', label: 'Assignments' },
    ],
  };

  const items = navItems[role] || [];

  return (
    <aside className="bg-[#0f172a] w-64 min-h-screen flex flex-col justify-between p-6 shadow-xl">
      {/* Top Logo */}
      <div>
        <div className="flex items-center gap-2 text-white mb-10">
          <FaSchool className="text-3xl" />
          <span className="text-2xl font-bold">ACA</span>
        </div>

        <nav className="flex flex-col gap-3">
          {items.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              title={item.label}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Settings + Logout */}
      <div className="flex flex-col gap-3 mt-10">
        <Link
          to={`/${role}/settings`}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
        >
          <FaCog />
          <span className="text-sm">Settings</span>
        </Link>
        <Link
          to="/logout"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
        >
          <FaSignOutAlt />
          <span className="text-sm">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
