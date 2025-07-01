<<<<<<< HEAD
import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
=======
import React, { useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏡' },
  { id: 'academics', label: 'Academics', icon: '📘' },
  { id: 'finance', label: 'Finance', icon: '💰' },
  { id: 'meeting', label: 'Meeting', icon: '🧑‍💼' },
  { id: 'complaints', label: 'Complaints', icon: '💬' },
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'adminProfile', label: 'Admin Profile', icon: '👨‍💼' },
  { id: 'teacherProfile', label: 'Teacher Profile', icon: '👨‍🏫' },
  { id: 'studentProfile', label: 'Student Profile', icon: '🎓' },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
>>>>>>> 6e68262 (Add assignment page)

  return (
<<<<<<< HEAD
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
=======
    <div className="flex min-h-screen bg-slate-900 text-white font-inter">
      <aside className="w-60 bg-slate-900 p-5 flex flex-col justify-between shadow-lg">
        <div>
          <h2 className="text-2xl font-bold mb-6">🏠 ACA</h2>
          {navItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="flex items-center gap-3 py-3 px-4 mb-2 rounded-lg text-slate-200 hover:bg-slate-800 hover:translate-x-1 transition cursor-pointer"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center gap-3 py-3 px-4 mb-2 rounded-lg text-slate-200 hover:bg-slate-800 cursor-pointer">
            <span>⚙</span> <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 py-3 px-4 rounded-lg text-slate-200 hover:bg-slate-800 cursor-pointer">
            <span>📤</span> <span>Logout</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 ml-60">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            className="flex-1 p-3 rounded-lg outline-none mr-4 text-black"
            placeholder="Search options, students etc.."
          />
          <div className="flex items-center gap-4">
            <span>🔔</span>
            <div>
              <p className="font-bold">Admin</p>
              <p className="text-sm text-slate-300">Principal Name</p>
            </div>
            <div className="bg-slate-800 p-2 rounded-full">👤</div>
          </div>
        </div>

        {activeSection === 'dashboard' && (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-900 rounded-xl p-5 shadow-lg">
                <p>Total Students</p>
                <h2 className="text-2xl font-semibold">🎓 2500</h2>
                <small>+5% this month</small>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-900 rounded-xl p-5 shadow-lg">
                <p>Total Teachers</p>
                <h2 className="text-2xl font-semibold">🧑‍🏫 100</h2>
                <small>Stable</small>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-900 rounded-xl p-5 shadow-lg">
                <p>Total Classes</p>
                <h2 className="text-2xl font-semibold">📘 20</h2>
                <small>New: 2</small>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-900 rounded-xl p-5 shadow-lg">
                <p>Fee Collection</p>
                <h2 className="text-2xl font-semibold">💰 ₹2,50,00,000</h2>
                <small>+10% revenue</small>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Notice Board</h3>
                <button className="bg-emerald-500 text-white px-4 py-2 rounded-md">Add Notice +</button>
              </div>
              <table className="w-full text-left rounded-lg overflow-hidden">
                <thead className="bg-slate-300 text-black">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">Details</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-black">
                  <tr>
                    <td className="p-3">Holiday</td>
                    <td className="p-3">Christmas</td>
                    <td className="p-3">2024-12-25</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <footer className="mt-6 text-sm text-center text-slate-400">
              © 2025 Admin Dashboard. Designed with ❤ by ACA Team.
            </footer>
          </section>
        )}
      </main>
>>>>>>> 6e68262 (Add assignment page)
    </div>
  );
}