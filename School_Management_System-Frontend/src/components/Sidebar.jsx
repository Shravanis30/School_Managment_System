
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
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`, {}, { withCredentials: true });
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
      { icon: <FaPoll size={24} />, path: '/dashboard/student/result', label: 'Result' },
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
              <span className="text-2xl font-bold">ERP - School</span>
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
        {/* <Link
          to={`/${role}/settings`}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-blue-700/40 hover:text-white transition-all text-lg"
        >
          <FaCog size={24} />
          {isOpen && <span className="text-lg font-semibold">Settings</span>}
        </Link> */}

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
