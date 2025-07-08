// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import axios from 'axios';
// import Header from '../../components/Header';

// const TeacherMeetingPage = () => {
//   const [meetings, setMeetings] = useState([]);

//   useEffect(() => {
//     const fetchMeetings = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/meetings`, {
//           withCredentials: true,
//         });
//         setMeetings(res.data || []);
//       } catch (err) {
//         console.error('Failed to fetch meetings:', err.response?.data || err.message);
//       }
//     };

//     fetchMeetings();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="teacher" />
//       <div className="flex-1 p-6">
//         <Header />
//         <h2 className="text-2xl font-bold mb-6">📅 Upcoming Staff Meetings</h2>

//         <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead>
//               <tr className="bg-white/10 text-white uppercase tracking-wide">
//                 <th className="p-3">Title</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Participants</th>
//                 <th>Mode</th>
//                 <th>Link</th>
//               </tr>
//             </thead>
//             <tbody>
//               {meetings.length > 0 ? (
//                 meetings.map((m, i) => (
//                   <tr key={i} className="hover:bg-white/10 transition-all text-white/90 border-b border-white/10">
//                     <td className="p-3">{m.title}</td>
//                     <td>{m.date}</td>
//                     <td>{m.time}</td>
//                     <td>{m.participants.join(', ')}</td>
//                     <td>{m.mode}</td>
//                     <td>
//                       {m.link ? (
//                         <a
//                           href={m.link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-400 underline"
//                         >
//                           Join
//                         </a>
//                       ) : (
//                         "-"
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center py-4 text-white/70">
//                     No upcoming meetings scheduled.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherMeetingPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const TeacherMeetingPage = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/meetings`, {
          withCredentials: true,
        });
        setMeetings(res.data || []);
      } catch (err) {
        console.error('Failed to fetch meetings:', err.response?.data || err.message);
      }
    };

    fetchMeetings();
    
    // Refresh meetings every 30 minutes
    const interval = setInterval(fetchMeetings, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="teacher" />
      <div className="flex-1 p-6">
        <Header />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📅 Upcoming Staff Meetings</h2>
          <div className="text-sm text-white/60">
            {meetings.length} upcoming
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-white/10 text-white uppercase tracking-wide">
                <th className="p-3">Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Participants</th>
                <th>Mode</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {meetings.length > 0 ? (
                meetings.map((m, i) => (
                  <tr key={i} className="hover:bg-white/10 transition-all text-white/90 border-b border-white/10">
                    <td className="p-3">{m.title}</td>
                    <td>{m.date}</td>
                    <td>{m.time}</td>
                    <td>{m.participants.join(', ')}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        m.mode === 'Online' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
                      }`}>
                        {m.mode}
                      </span>
                    </td>
                    <td>
                      {m.link ? (
                        <a
                          href={m.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-600/30 hover:bg-blue-500/40 rounded-full text-sm font-medium transition-all"
                        >
                          Join
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-white/70">
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="bg-gray-800/50 p-6 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-lg">No upcoming meetings scheduled</p>
                      <p className="text-sm text-gray-400 mt-2">Check back later for scheduled meetings</p>
                    </div>
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

export default TeacherMeetingPage;