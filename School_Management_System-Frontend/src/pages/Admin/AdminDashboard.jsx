// import React, { useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';

// import { FaBell } from 'react-icons/fa';


// const AdminDashboard = () => {
//   const [events, setEvents] = useState([
//     {
//       id: '1',
//       title: 'Cybersecurity Webinar',
//       date: '2024-06-26',
//       description: 'Webinar on cybersecurity safety for students.'
//     }
//   ]);

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

//   const [showForm, setShowForm] = useState(false);
//   const [newEvent, setNewEvent] = useState({ date: '', title: '', description: '' });
//   const [selectedDateEvents, setSelectedDateEvents] = useState([]);
//   const [showDateEvents, setShowDateEvents] = useState(false);

//   const handleDateClick = (arg) => {
//     const dateStr = arg.dateStr;
//     const matchedEvents = events.filter(event => event.date === dateStr);
//     if (matchedEvents.length > 0) {
//       setSelectedDateEvents(matchedEvents);
//       setShowDateEvents(true);
//     } else {
//       setNewEvent({ ...newEvent, date: dateStr });
//       setShowForm(true);
//     }
//   };

//   const handleAddEvent = () => {
//     if (newEvent.title && newEvent.date) {
//       const eventToAdd = {
//         ...newEvent,
//         id: Date.now().toString()
//       };
//       setEvents([...events, eventToAdd]);
//       setShowForm(false);
//       setNewEvent({ date: '', title: '', description: '' });
//     } else {
//       alert('Please fill all fields');
//     }
//   };

//   const handleDeleteEvent = (id) => {
//     setEvents(events.filter(event => event.id !== id));
//     setSelectedDateEvents(selectedDateEvents.filter(event => event.id !== id));
//   };

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

//         <div className="grid grid-cols-2 gap-6">
//           {/* Stats */}
//           <div className="grid grid-cols-2 gap-6 col-span-2">
//             <div className="bg-gray-800 p-6 rounded flex items-center gap-4">
//               <FaUserGraduate className="text-4xl text-blue-400" />
//               <div>
//                 <h3 className="text-lg">Total Students</h3>
//                 <p className="text-2xl font-bold">2500</p>
//               </div>
//             </div>
//             <div className="bg-gray-800 p-6 rounded flex items-center gap-4">
//               <FaChalkboardTeacher className="text-4xl text-green-400" />
//               <div>
//                 <h3 className="text-lg">Total Teachers</h3>
//                 <p className="text-2xl font-bold">100</p>
//               </div>
//             </div>
//             <div className="bg-gray-800 p-6 rounded flex items-center gap-4">
//               <FaUsers className="text-4xl text-yellow-400" />
//               <div>
//                 <h3 className="text-lg">Total Classes</h3>
//                 <p className="text-2xl font-bold">20</p>
//               </div>
//             </div>
//             <div className="bg-gray-800 p-6 rounded flex items-center gap-4">
//               <FaMoneyBillWave className="text-4xl text-pink-400" />
//               <div>
//                 <h3 className="text-lg">Fee Collection</h3>
//                 <p className="text-2xl font-bold">₹2,50,00,000</p>
//               </div>
//             </div>
//           </div>

//           {/* Notice Board */}
//           <div className="bg-gray-900 p-4 rounded mt-10 relative overflow-auto">
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

//           <div className="bg-black text-white rounded-lg p-4 w-full relative">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold">Event Calendar</h3>
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="bg-green-500 px-3 py-1 rounded text-black"
//               >
//                 + Add Event
//               </button>
//             </div>
//             <FullCalendar
//               plugins={[dayGridPlugin, interactionPlugin]}
//               initialView="dayGridMonth"
//               dateClick={handleDateClick}
//               events={events}
//               height={400}
//               eventDisplay="block"
//             />

//             {showForm && (
//               <div className="absolute top-10 right-10 bg-white text-black p-5 rounded shadow-lg w-80 z-10">
//                 <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
//                 <input
//                   type="date"
//                   className="w-full p-2 mb-2 border rounded"
//                   value={newEvent.date}
//                   onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Event Title"
//                   className="w-full p-2 mb-2 border rounded"
//                   value={newEvent.title}
//                   onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//                 />
//                 <textarea
//                   placeholder="Event Description"
//                   className="w-full p-2 mb-2 border rounded"
//                   value={newEvent.description}
//                   onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
//                 ></textarea>
//                 <div className="flex justify-between">
//                   <button
//                     onClick={() => setShowForm(false)}
//                     className="bg-gray-600 text-white px-3 py-1 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleAddEvent}
//                     className="bg-blue-600 text-white px-3 py-1 rounded"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             )}

//             {showDateEvents && selectedDateEvents.length > 0 && (
//               <div className="bg-gray-800 mt-6 p-4 rounded">
//                 <h4 className="text-lg font-semibold mb-2">Events on {selectedDateEvents[0].date}</h4>
//                 {selectedDateEvents.map((event) => (
//                   <div key={event.id} className="bg-gray-700 p-3 rounded mb-2">
//                     <p className="text-lg font-bold">{event.title}</p>
//                     <p className="text-sm">{event.description}</p>
//                     <button
//                       onClick={() => handleDeleteEvent(event.id)}
//                       className="mt-2 bg-red-600 text-white px-2 py-1 rounded text-sm"
//                     >
//                       Delete Event
//                     </button>
//                   </div>
//                 ))}
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
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaMoneyBillWave, FaBell } from 'react-icons/fa';

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
      icon: <FaUserGraduate className="text-4xl text-blue-400" />,
      link: '/dashboard/admin/students'
    },
    {
      label: 'Total Teachers',
      count: 100,
      icon: <FaChalkboardTeacher className="text-4xl text-green-400" />,
      link: '/dashboard/admin/teachers'
    },
    {
      label: 'Total Classes',
      count: 20,
      icon: <FaUsers className="text-4xl text-yellow-400" />,
      link: '/dashboard/admin/classes'
    },
    {
      label: 'Fee Collection',
      count: '₹2,50,00,000',
      icon: <FaMoneyBillWave className="text-4xl text-pink-400" />,
      link: '/dashboard/admin/fees'
    }
  ];


  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search options, students etc.."
            className="w-1/2 p-2 bg-gray-900 text-white rounded focus:outline-none"
          />
          <div className="flex items-center gap-4">
            <span className="text-2xl text-white">
              <FaBell />
            </span>
            <div className="text-sm text-right">
              <p className="font-bold">Admin</p>
              <p className="text-gray-400 text-xs">Principal Name</p>
            </div>
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          </div>
        </div>

          <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-black text-white ">
            {cardData.map((card, idx) => (
              <div
                key={idx}
                onClick={() => navigate(card.link)}
                className="bg-gray-800 cursor-pointer p-6 rounded-lg flex items-center justify-between hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4">
                  {card.icon}
                  <div>
                    <h3 className="text-lg font-semibold">{card.label}</h3>
                    <p className="text-2xl font-bold">{card.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
                  <div className="grid grid-cols-2 gap-6">

          {/* Notice Board */}
          <div className="bg-gray-900 p-4 rounded mt-10 relative overflow-auto col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Notice Board</h3>
              <button
                className="bg-green-500 px-3 py-1 rounded text-black"
                onClick={() => setShowNoticeForm(true)}
              >
                Add Notice +
              </button>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="text-left px-2 py-1">Title</th>
                  <th className="text-left px-2 py-1">Details</th>
                  <th className="text-left px-2 py-1">Date</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 text-black">
                {notices.map((n, i) => (
                  <tr key={i}>
                    <td className="px-2 py-1">{n.title}</td>
                    <td className="px-2 py-1">{n.details}</td>
                    <td className="px-2 py-1">{n.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showNoticeForm && (
              <div className="absolute top-10 right-10 bg-white text-black p-4 rounded shadow-lg w-80 z-10">
                <h3 className="text-lg font-semibold mb-2">Add New Notice</h3>
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
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                    onClick={() => setShowNoticeForm(false)}
                  >Cancel</button>
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={handleAddNotice}
                  >Add</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;





