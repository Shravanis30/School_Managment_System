import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import EventCalendar from '../../components/EventCalendar';
import NoticeBoard from '../../components/NoticeBoard';

import {
  FaUserEdit,
  FaClipboardCheck,
  FaChalkboardTeacher
} from 'react-icons/fa';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      label: 'Upload Assignment',
      icon: <FaClipboardCheck className="text-3xl text-white" />,
      note: 'New submissions pending',
      link: '/dashboard/teacher/assignments'
    },
    {
      label: 'Add Marks',
      icon: <FaUserEdit className="text-3xl text-white" />,
      note: 'Update recent exams',
      link: '/dashboard/teacher/addmarks'
    },
    {
      label: 'Take Attendance',
      icon: <FaChalkboardTeacher className="text-3xl text-white" />,
      note: '3 classes today',
      link: '/dashboard/teacher/attendance'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="teacher" />

      <div className="flex-1 p-6 flex flex-col gap-10">
        {/* Header */}
        <Header />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              onClick={() => navigate(card.link)}
              className="bg-white/10 p-5 rounded-xl shadow hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-600 rounded-full">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{card.label}</h4>
                  <p className="text-sm text-white/70 mt-1">{card.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section - Notice Board and Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur">
            <NoticeBoard />
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur">
            <EventCalendar role="teacher" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
