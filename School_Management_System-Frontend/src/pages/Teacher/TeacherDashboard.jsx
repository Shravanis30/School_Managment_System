import React from 'react';
import { FaBell, FaChalkboardTeacher, FaClipboardList, FaUserGraduate, FaBook, FaCog, FaSignOutAlt, FaEnvelope, FaCalendarAlt, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const TeacherDashboard = () => {
  const navigate = useNavigate();



  return (
    <div className="flex min-h-screen bg-[#0B1120] text-white">
      {/* Sidebar */}
      <Sidebar role="teacher" />


      {/* Main Content */}
      <main className="flex-1 p-6 bg-[#1F2937] overflow-y-auto">
        {/* Header */}
        <Header />

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Group Chat */}
          <div className="bg-[#111827] p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Group chat</h3>
            {['10th A Class Group', 'Teacher Group', '9th B Class Group'].map((group, idx) => (
              <div
                key={idx}
                className="bg-gray-300 text-black px-4 py-2 rounded mb-3 flex justify-between items-center"
              >
                {group} <FaComments />
              </div>
            ))}
          </div>

          {/* Attendance & Mail */}
          <div className="flex flex-col gap-4">
            <button className="bg-[#374151] text-white py-4 rounded-lg flex items-center justify-center gap-2 text-lg">
              <FaClipboardList /> Take Attendance
            </button>
            <button className="bg-[#374151] text-white py-4 rounded-lg flex items-center justify-center gap-2 text-lg">
              <FaEnvelope /> Send Mail to Parents
            </button>

            {/* Event Calendar */}
            <div className="bg-[#1E293B] text-white p-4 rounded-lg">
              <h4 className="text-md font-bold mb-2">Event Calendar</h4>
              <div className="bg-purple-800 p-3 rounded mb-3">
                <h5 className="font-bold">26 Jun 2024</h5>
                <p className="text-sm">There will be webinar on the cybersecurity to guide students towards the safety over the internet</p>
              </div>
              <div className="text-sm text-gray-300">
                <div className="flex justify-between mb-1">
                  <span>June 2024</span>
                  <FaCalendarAlt />
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className={`p-1 rounded ${i === 25 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Student Progress & Upcoming Classes */}
          <div className="space-y-6">
            <div className="bg-[#111827] p-4 rounded-lg min-h-[150px]">
              <h3 className="text-lg font-semibold">Student Progress</h3>
              {/* Add student progress content here */}
            </div>
            <div className="bg-[#111827] p-4 rounded-lg min-h-[150px]">
              <h3 className="text-lg font-semibold">Upcoming Classes</h3>
              {/* Add upcoming classes content here */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
