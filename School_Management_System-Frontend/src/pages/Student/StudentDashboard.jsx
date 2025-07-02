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

  return (
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
    </div>
  );
}
