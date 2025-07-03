import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import EventCalendar from '../../components/EventCalendar';

// Icons
import {
  FaUserEdit,
  FaClipboardCheck,
  FaEnvelopeOpenText,
  FaChalkboardTeacher,
  FaCalendarAlt
} from 'react-icons/fa';
import NoticeBoard from '../../components/NoticeBoard';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      label: 'Upload Assignment',
      icon: <FaClipboardCheck className="text-4xl text-white" />,
      note: 'New submissions pending',
      link: '/dashboard/teacher/assignments'
    },
    {
      label: 'Add Marks',
      icon: <FaUserEdit className="text-4xl text-white" />,
      note: 'Update recent exams',
      link: '/dashboard/teacher/marks'
    },
    {
      label: 'Message Parents',
      icon: <FaEnvelopeOpenText className="text-4xl text-white" />,
      note: '2 unread replies',
      link: '/dashboard/teacher/mail'
    },
    {
      label: 'Take Atendance',
      icon: <FaChalkboardTeacher className="text-4xl text-white" />,
      note: '3 classes today',
      link: '/dashboard/teacher/attendance'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Sidebar role="teacher" />

      <div className="flex-1 p-6 space-y-10">
        <Header />

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              onClick={() => navigate(card.link)}
              className="bg-gradient-to-r from-indigo-700 to-indigo-900 p-5 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-600 rounded-full">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{card.label}</h4>
                  <p className="text-sm text-gray-300 mt-1">{card.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice Board & Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notice Board */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <NoticeBoard />
          </div>

          {/* Calendar */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <EventCalendar role="teacher" />

          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;
