
// // ✅ Enhanced AdminMeetingPage with Finance-style Glassmorphism & 3D Effects
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';

// const AdminMeetingPage = () => {
//   const [meetings, setMeetings] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [newMeeting, setNewMeeting] = useState({
//     title: '',
//     date: '',
//     time: '',
//     participants: [],
//     mode: '',
//     link: '',
//   });

//   useEffect(() => {
//     fetchMeetings();
//   }, []);

//   const fetchMeetings = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/meetings');
//       setMeetings(res.data);
//     } catch (err) {
//       console.error('Error fetching meetings:', err);
//     }
//   };

//   const handleAddMeeting = async () => {
//     try {
//       const meetingWithStatus = { ...newMeeting, status: 'Scheduled' };
//       await axios.post('http://localhost:5000/api/meetings/add', meetingWithStatus);
//       alert('Meeting created and emails sent');
//       setNewMeeting({ title: '', date: '', time: '', participants: [], mode: '', link: '' });
//       fetchMeetings();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to create meeting');
//     }
//   };

//   const handleParticipantsChange = (e) => {
//     const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
//     setNewMeeting({ ...newMeeting, participants: selected });
//   };

//   const handleMarkAsDone = (index) => {
//     const doneMeeting = meetings[index];
//     const updatedMeetings = [...meetings];
//     updatedMeetings.splice(index, 1);
//     setMeetings(updatedMeetings);

//     const summary = {
//       date: doneMeeting.date,
//       title: doneMeeting.title,
//       by: 'Admin',
//       summary: `${doneMeeting.title} meeting conducted.`,
//     };
//     setHistory([...history, summary]);
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative">
//       <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-gray-600/5 to-black/10 blur-xl -z-10" />
//       <Sidebar role="admin" />
//       <div className="flex-1 p-6 space-y-10">
//         <Header />

//         <h2 className="text-3xl font-bold mb-6">📅 Upcoming Meetings</h2>

//         {/* Meetings Table */}
//         <div className="rounded-xl backdrop-blur-md border border-white/10 bg-white/5 shadow-xl overflow-auto">
//           <table className="w-full text-left text-sm">
//             <thead className="bg-white/10">
//               <tr>
//                 <th className="p-3">Title</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Participants</th>
//                 <th>Mode</th>
//                 <th>Status</th>
//                 <th>Link</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {meetings.length > 0 ? meetings.map((m, i) => (
//                 <tr key={i} className="hover:bg-white/5 border-t border-white/10">
//                   <td className="p-3">{m.title}</td>
//                   <td>{m.date}</td>
//                   <td>{m.time}</td>
//                   <td>{Array.isArray(m.participants) ? m.participants.join(', ') : '-'}</td>
//                   <td>{m.mode}</td>
//                   <td>{m.status}</td>
//                   <td>{m.link ? <a href={m.link} target="_blank" rel="noreferrer" className="text-blue-400 underline">Join</a> : '-'}</td>
//                   <td>
//                     <button onClick={() => handleMarkAsDone(i)} className="text-green-400 underline hover:text-green-300 transition">Done</button>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr>
//                   <td colSpan="8" className="text-center py-4 text-gray-400">No meetings scheduled.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Add Meeting Form */}
//         <div className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
//           <h3 className="text-2xl font-bold mb-6">📌 Schedule New Meeting</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input type="text" placeholder="Title" value={newMeeting.title} onChange={e => setNewMeeting({ ...newMeeting, title: e.target.value })} className="bg-white/10 p-2 rounded placeholder:text-white/70" />
//             <input type="date" value={newMeeting.date} onChange={e => setNewMeeting({ ...newMeeting, date: e.target.value })} className="bg-white/10 p-2 rounded" />
//             <input type="time" value={newMeeting.time} onChange={e => setNewMeeting({ ...newMeeting, time: e.target.value })} className="bg-white/10 p-2 rounded" />
//             <select multiple value={newMeeting.participants} onChange={handleParticipantsChange} className="bg-white/10 p-2 rounded">
//               {['Student', 'Teacher', 'Parent'].map(role => (
//                 <option key={role} value={role}>{role}</option>
//               ))}
//             </select>
//             <select value={newMeeting.mode} onChange={e => setNewMeeting({ ...newMeeting, mode: e.target.value })} className="bg-white/10 p-2 rounded">
//               <option value="">Select Mode</option>
//               <option value="Online">Online</option>
//               <option value="Offline">Offline</option>
//             </select>
//             <input type="text" placeholder="Meeting Link (optional)" value={newMeeting.link} onChange={e => setNewMeeting({ ...newMeeting, link: e.target.value })} className="bg-white/10 p-2 rounded placeholder:text-white/70" />
//           </div>
//           <button onClick={handleAddMeeting} className="mt-6 bg-green-400 text-black hover:bg-green-300 px-6 py-2 rounded-full font-semibold transition shadow-lg">+ Add Meeting</button>
//         </div>

//         {/* History */}
//         <div className="rounded-xl p-6 bg-white/5 border border-white/10 shadow-xl backdrop-blur-md">
//           <h2 className="text-2xl font-bold mb-4">📖 Meeting History</h2>
//           <table className="w-full text-left text-sm">
//             <thead className="bg-white/10">
//               <tr>
//                 <th className="p-2">Date</th>
//                 <th>Title</th>
//                 <th>By</th>
//                 <th>Summary</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.length > 0 ? history.map((h, i) => (
//                 <tr key={i} className="hover:bg-white/5 border-t border-white/10">
//                   <td className="p-2">{h.date}</td>
//                   <td>{h.title}</td>
//                   <td>{h.by}</td>
//                   <td>{h.summary}</td>
//                 </tr>
//               )) : (
//                 <tr>
//                   <td colSpan="4" className="text-center py-4 text-gray-400">No meeting history yet.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminMeetingPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminMeetingPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [history, setHistory] = useState([]);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    participants: [],
    mode: '',
    link: '',
  });

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get('/api/meetings', {
        withCredentials: true,
      });
      setMeetings(res.data);
    } catch (err) {
      console.error('Error fetching meetings:', err.response?.data || err.message);
    }
  };

  const handleAddMeeting = async () => {
    try {
      const meetingWithStatus = { ...newMeeting, status: 'Scheduled' };
      await axios.post('/api/meetings/add', meetingWithStatus, {
        withCredentials: true,
      });
      alert('Meeting created and emails sent');
      setNewMeeting({
        title: '',
        date: '',
        time: '',
        participants: [],
        mode: '',
        link: '',
      });
      fetchMeetings();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to create meeting');
    }
  };

  const handleParticipantsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setNewMeeting({ ...newMeeting, participants: selected });
  };

  const handleMarkAsDone = (index) => {
    const doneMeeting = meetings[index];
    const updatedMeetings = [...meetings];
    updatedMeetings.splice(index, 1);
    setMeetings(updatedMeetings);

    const summary = {
      date: doneMeeting.date,
      title: doneMeeting.title,
      by: 'Admin',
      summary: `${doneMeeting.title} meeting conducted.`,
    };
    setHistory([...history, summary]);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-gray-600/5 to-black/10 blur-xl -z-10" />
      <Sidebar role="admin" />
      <div className="flex-1 p-6 space-y-10">
        <Header />

        <h2 className="text-3xl font-bold mb-6">📅 Upcoming Meetings</h2>

        {/* Meetings Table */}
        <div className="rounded-xl backdrop-blur-md border border-white/10 bg-white/5 shadow-xl overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="p-3">Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Participants</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Link</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {meetings.length > 0 ? (
                meetings.map((m, i) => (
                  <tr key={i} className="hover:bg-white/5 border-t border-white/10">
                    <td className="p-3">{m.title}</td>
                    <td>{m.date}</td>
                    <td>{m.time}</td>
                    <td>{Array.isArray(m.participants) ? m.participants.join(', ') : '-'}</td>
                    <td>{m.mode}</td>
                    <td>{m.status}</td>
                    <td>
                      {m.link ? (
                        <a
                          href={m.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 underline"
                        >
                          Join
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleMarkAsDone(i)}
                        className="text-green-400 underline hover:text-green-300 transition"
                      >
                        Done
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-400">
                    No meetings scheduled.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add Meeting Form */}
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-md">
          <h3 className="text-2xl font-bold mb-6">📌 Schedule New Meeting</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
              className="bg-white/10 p-2 rounded placeholder:text-white/70"
            />
            <input
              type="date"
              value={newMeeting.date}
              onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
              className="bg-white/10 p-2 rounded"
            />
            <input
              type="time"
              value={newMeeting.time}
              onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
              className="bg-white/10 p-2 rounded"
            />
            <select
              multiple
              value={newMeeting.participants}
              onChange={handleParticipantsChange}
              className="bg-white/10 p-2 rounded"
            >
              {['Student', 'Teacher', 'Parent'].map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <select
              value={newMeeting.mode}
              onChange={(e) => setNewMeeting({ ...newMeeting, mode: e.target.value })}
              className="bg-white/10 p-2 rounded"
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            <input
              type="text"
              placeholder="Meeting Link (optional)"
              value={newMeeting.link}
              onChange={(e) => setNewMeeting({ ...newMeeting, link: e.target.value })}
              className="bg-white/10 p-2 rounded placeholder:text-white/70"
            />
          </div>
          <button
            onClick={handleAddMeeting}
            className="mt-6 bg-green-400 text-black hover:bg-green-300 px-6 py-2 rounded-full font-semibold transition shadow-lg"
          >
            + Add Meeting
          </button>
        </div>

        {/* History */}
        <div className="rounded-xl p-6 bg-white/5 border border-white/10 shadow-xl backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-4">📖 Meeting History</h2>
          <table className="w-full text-left text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="p-2">Date</th>
                <th>Title</th>
                <th>By</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((h, i) => (
                  <tr key={i} className="hover:bg-white/5 border-t border-white/10">
                    <td className="p-2">{h.date}</td>
                    <td>{h.title}</td>
                    <td>{h.by}</td>
                    <td>{h.summary}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400">
                    No meeting history yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMeetingPage;
