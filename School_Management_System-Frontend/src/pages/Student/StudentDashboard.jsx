import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-[#0b0f1a] text-white">
      <Sidebar role="student" />

      <div className="flex flex-col flex-1 m-5 mt-10 overflow-y-auto">
        <Header />

        <main className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Attendance */}
          <div className="bg-[#1b2236] p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold">Attendance</h3>
            <p className="text-4xl mt-2 font-bold text-blue-400">75%</p>
            <p className="text-sm text-gray-400">Month - Jan</p>
          </div>

          {/* Rank */}
          <div className="bg-[#1b2236] p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold">Current Rank</h3>
            <p className="text-4xl mt-4 font-bold text-green-400">7th</p>
          </div>

          {/* Assignment Status */}
          <div className="bg-[#1b2236] p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold">Assignment Status</h3>
            <div className="mt-4">
              <div className="text-3xl font-bold text-red-500">60%</div>
              <p className="text-sm mt-2 text-gray-400">03/10 Completed</p>
              <p className="text-xs mt-1 text-gray-500">Updated 2 hrs ago</p>
            </div>
          </div>

          {/* Internal Score */}
          <div className="bg-[#1b2236] p-6 rounded-2xl shadow-lg col-span-1 md:col-span-2 xl:col-span-1">
            <h3 className="text-lg font-semibold mb-2">Internal Score</h3>
            <ul className="text-base">
              <li className="flex justify-between border-b py-2">
                <span>English</span> <span>70/100</span>
              </li>
              <li className="flex justify-between border-b py-2">
                <span>Hindi</span> <span>80/100</span>
              </li>
              <li className="flex justify-between py-2">
                <span>Maths</span> <span>100/100</span>
              </li>
            </ul>
          </div>

          {/* Group Notification */}
          <div className="bg-[#1b2236] p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold">Group</h3>
            <p className="text-sm mt-2 text-gray-400">New notifications</p>
            <div className="mt-3 p-3 bg-gray-700 rounded-lg">
              <p className="text-sm">10th class:</p>
              <p className="text-sm">student1: tomorrow assignment submission</p>
            </div>
          </div>

          {/* Notice Board */}
          <div className="bg-[#1b2236] p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Notice Board</h3>
            <ul className="space-y-2">
              <li className="p-3 bg-gray-700 rounded-lg"></li>
              <li className="p-3 bg-gray-700 rounded-lg"></li>
              <li className="p-3 bg-gray-700 rounded-lg"></li>
            </ul>
          </div>

          {/* Event Calendar */}
          <div className="bg-[#1b2236] p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Event Calendar</h3>
            <div className="text-sm mb-3 bg-[#432e65] p-3 rounded-lg">
              <strong>26 Jun 2024</strong>
              <p className="mt-1">Webinar on cybersecurity to guide students toward internet safety.</p>
            </div>
            <div className="text-gray-400">[Calendar Component Placeholder]</div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
