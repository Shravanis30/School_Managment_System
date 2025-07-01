// import React, { useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import { useNavigate } from 'react-router-dom';
// import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaMoneyBillWave, FaBell } from 'react-icons/fa';

// const AdminDashboard = () => {
//     const navigate = useNavigate();


//   const [notices, setNotices] = useState([
//     { title: 'Holiday', details: 'Christmas', date: '2024-12-25' }
//   ]);
//   const [newNotice, setNewNotice] = useState({ title: '', details: '', date: '' });
//   const [showNoticeForm, setShowNoticeForm] = useState(false);

//   const handleAddNotice = () => {
//     if (newNotice.title && newNotice.details && newNotice.date) {
//       setNotices([newNotice, ...notices]);
//       setNewNotice({ title: '', details: '', date: '' });
//       setShowNoticeForm(false);
//     }
//   };


//   const cardData = [
//     {
//       label: 'Total Students',
//       count: 2500,
//       icon: <FaUserGraduate className="text-4xl text-blue-400" />,
//       link: '/dashboard/admin/students'
//     },
//     {
//       label: 'Total Teachers',
//       count: 100,
//       icon: <FaChalkboardTeacher className="text-4xl text-green-400" />,
//       link: '/dashboard/admin/teachers'
//     },
//     {
//       label: 'Total Classes',
//       count: 20,
//       icon: <FaUsers className="text-4xl text-yellow-400" />,
//       link: '/dashboard/admin/classes'
//     },
//     {
//       label: 'Fee Collection',
//       count: '₹2,50,00,000',
//       icon: <FaMoneyBillWave className="text-4xl text-pink-400" />,
//       link: '/dashboard/admin/fees'
//     }
//   ];


//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <Sidebar role="admin" />
//       <div className="flex-1 p-6">
//         {/* Top bar */}
//         <div className="flex justify-between items-center mb-6">
//           <input
//             type="text"
//             placeholder="Search options, students etc.."
//             className="w-1/2 p-2 bg-gray-900 text-white rounded focus:outline-none"
//           />
//           <div className="flex items-center gap-4">
//             <span className="text-2xl text-white">
//               <FaBell />
//             </span>
//             <div className="text-sm text-right">
//               <p className="font-bold">Admin</p>
//               <p className="text-gray-400 text-xs">Principal Name</p>
//             </div>
//             <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
//           </div>
//         </div>

//           <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-black text-white ">
//             {cardData.map((card, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => navigate(card.link)}
//                 className="bg-gray-800 cursor-pointer p-6 rounded-lg flex items-center justify-between hover:shadow-xl transition-all"
//               >
//                 <div className="flex items-center gap-4">
//                   {card.icon}
//                   <div>
//                     <h3 className="text-lg font-semibold">{card.label}</h3>
//                     <p className="text-2xl font-bold">{card.count}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//                   <div className="grid grid-cols-2 gap-6">

//           {/* Notice Board */}
//           <div className="bg-gray-900 p-4 rounded mt-10 relative overflow-auto col-span-2">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Notice Board</h3>
//               <button
//                 className="bg-green-500 px-3 py-1 rounded text-black"
//                 onClick={() => setShowNoticeForm(true)}
//               >
//                 Add Notice +
//               </button>
//             </div>
//             <table className="w-full text-sm">
//               <thead className="bg-black text-white">
//                 <tr>
//                   <th className="text-left px-2 py-1">Title</th>
//                   <th className="text-left px-2 py-1">Details</th>
//                   <th className="text-left px-2 py-1">Date</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-gray-100 text-black">
//                 {notices.map((n, i) => (
//                   <tr key={i}>
//                     <td className="px-2 py-1">{n.title}</td>
//                     <td className="px-2 py-1">{n.details}</td>
//                     <td className="px-2 py-1">{n.date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {showNoticeForm && (
//               <div className="absolute top-10 right-10 bg-white text-black p-4 rounded shadow-lg w-80 z-10">
//                 <h3 className="text-lg font-semibold mb-2">Add New Notice</h3>
//                 <input
//                   type="text"
//                   className="w-full p-2 mb-2 border rounded"
//                   placeholder="Title"
//                   value={newNotice.title}
//                   onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   className="w-full p-2 mb-2 border rounded"
//                   placeholder="Details"
//                   value={newNotice.details}
//                   onChange={(e) => setNewNotice({ ...newNotice, details: e.target.value })}
//                 />
//                 <input
//                   type="date"
//                   className="w-full p-2 mb-2 border rounded"
//                   value={newNotice.date}
//                   onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
//                 />
//                 <div className="flex justify-end gap-2">
//                   <button
//                     className="bg-gray-500 text-white px-3 py-1 rounded"
//                     onClick={() => setShowNoticeForm(false)}
//                   >Cancel</button>
//                   <button
//                     className="bg-blue-600 text-white px-3 py-1 rounded"
//                     onClick={handleAddNotice}
//                   >Add</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaMoneyBillWave,
  FaBell
} from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [notices, setNotices] = useState([
    { title: 'Holiday', details: 'Christmas', date: '2024-12-25' }
  ]);
  const [newNotice, setNewNotice] = useState({ title: '', details: '', date: '' });
  const [showNoticeForm, setShowNoticeForm] = useState(false);

  const handleAddNotice = () => {
    if (newNotice.title && newNotice.details && newNotice.date) {
      setNotices([newNotice, ...notices]);
      setNewNotice({ title: '', details: '', date: '' });
      setShowNoticeForm(false);
    }
  };

  const cardData = [
    {
      label: 'Total Students',
      count: 2500,
      icon: <FaUserGraduate className="text-4xl text-white" />,
      note: '+5% this month',
      link: '/dashboard/admin/students'
    },
    {
      label: 'Total Teachers',
      count: 100,
      icon: <FaChalkboardTeacher className="text-4xl text-white" />,
      note: 'Stable',
      link: '/dashboard/admin/teachers'
    },
    {
      label: 'Total Classes',
      count: 20,
      icon: <FaUsers className="text-4xl text-white" />,
      note: 'New: 2',
      link: '/dashboard/admin/classes'
    },
    {
      label: 'Fee Collection',
      count: '₹2,50,00,000',
      icon: <FaMoneyBillWave className="text-4xl text-white" />,
      note: '+10% revenue',
      link: '/dashboard/admin/fees'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6 space-y-8">
        <Header />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              onClick={() => navigate(card.link)}
              className="bg-gradient-to-r from-blue-800 to-indigo-800 p-5 rounded-lg shadow-md hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                {card.icon}
                <div className="text-right">
                  <h4 className="text-lg font-semibold">{card.label}</h4>
                  <p className="text-2xl font-bold">{card.count}</p>
                  <p className="text-xs text-gray-300">{card.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice Board */}
        <div className="bg-gray-900 p-6 rounded-lg relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Notice Board</h3>
            <button
              className="bg-green-500 px-4 py-1 rounded text-black font-semibold"
              onClick={() => setShowNoticeForm(true)}
            >
              Add Notice +
            </button>
          </div>
          <table className="w-full text-sm text-white">
            <thead className="bg-gray-800">
              <tr>
                <th className="text-left px-3 py-2">Title</th>
                <th className="text-left px-3 py-2">Details</th>
                <th className="text-left px-3 py-2">Date</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              {notices.map((n, i) => (
                <tr key={i} className="border-b border-gray-600">
                  <td className="px-3 py-2">{n.title}</td>
                  <td className="px-3 py-2">{n.details}</td>
                  <td className="px-3 py-2">{n.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Popup Form */}
          {showNoticeForm && (
            <div className="absolute top-10 right-10 bg-white text-black p-5 rounded shadow-lg w-80 z-20">
              <h3 className="text-lg font-semibold mb-3">Add New Notice</h3>
              <input
                type="text"
                className="w-full p-2 mb-2 border rounded"
                placeholder="Title"
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
              />
              <input
                type="text"
                className="w-full p-2 mb-2 border rounded"
                placeholder="Details"
                value={newNotice.details}
                onChange={(e) => setNewNotice({ ...newNotice, details: e.target.value })}
              />
              <input
                type="date"
                className="w-full p-2 mb-2 border rounded"
                value={newNotice.date}
                onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
              />
              <div className="flex justify-end gap-2">
                <button
                  className="bg-gray-400 text-black px-3 py-1 rounded"
                  onClick={() => setShowNoticeForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-700 text-white px-3 py-1 rounded"
                  onClick={handleAddNotice}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

    
      </div>
    </div>
  );
};

export default AdminDashboard;

