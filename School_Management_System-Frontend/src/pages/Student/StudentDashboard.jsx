
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import EventCalendar from '../../components/EventCalendar';
import NoticeBoard from '../../components/NoticeBoard';

const StudentDashboard = () => {
  const navigate = useNavigate();

  // Resource cards with navigation
  const resourceCards = [
    {
      title: "Study Resources",
      description: "Access course materials, books, and learning guides",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "blue",
      route: "/dashboard/student/resources"
    },
    {
      title: "Class Result",
      description: "Checkout your results",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "purple",
      route: "/dashboard/student/result"
    },
    {
      title: "Assignment Hub",
      description: "View and submit your assignments",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: "green",
      route: "/dashboard/student/assignments"
    },
    {
      title: "Attendance",
      description: "Track your class attendance records",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "yellow",
      route: "/dashboard/student/attendance"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-gray-900/60 to-black/30 blur-xl -z-10 animate-pulse" />
      <Sidebar role="student" />

      <div className="flex-1 p-6 space-y-10">
        <Header />

        {/* Top Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourceCards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.route)}
              className={`relative group bg-white/5 p-6 rounded-3xl overflow-hidden shadow-lg border border-white/10 hover:border-${card.color}-500 transition-all duration-300 hover:scale-[1.03] cursor-pointer backdrop-blur-md transform transition-transform hover:shadow-2xl`}
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-br from-${card.color}-500/20 to-${card.color}-700/10 opacity-30 rounded-3xl blur-xl group-hover:opacity-50 transition-all duration-300`} />
              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className="mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-gray-300 flex-grow">{card.description}</p>
                <div className="mt-4 flex items-center text-blue-300 group-hover:text-blue-200 transition-colors">
                  <span>Go to {card.title.split(' ')[0]}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice Board & Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notice Board */}
          <div className="bg-white/5 p-6 rounded-2xl shadow-md backdrop-blur-md border border-white/10 transition-all hover:border-blue-500 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-300">Latest Notices</h2>
              <button
                onClick={() => navigate('/student/notices')}
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <NoticeBoard />
          </div>

          {/* Event Calendar */}
          <div className="bg-white/5 p-6 rounded-2xl shadow-md backdrop-blur-md border border-white/10 transition-all hover:border-purple-500 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-purple-300">Academic Calendar</h2>
              <button
                onClick={() => navigate('/student/calendar')}
                className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
              >
                Full Calendar
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <EventCalendar role="student" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;