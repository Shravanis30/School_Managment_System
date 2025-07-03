// // components/NoticeBoard.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaBell } from 'react-icons/fa';

// const NoticeBoard = () => {
//   const [notices, setNotices] = useState([]);

//   useEffect(() => {
//     const fetchNotices = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5000/api/notices', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setNotices(res.data);
//       } catch (err) {
//         console.error('Error fetching notices:', err);
//       }
//     };

//     fetchNotices();
//   }, []);

//   return (
//     <div className="bg-[#1b2236] p-6 rounded-xl shadow-md mt-6">
//       <div className="flex items-center gap-3 mb-5">
//         <FaBell className="text-yellow-400 text-xl" />
//         <h3 className="text-xl font-bold text-white">Notice Board</h3>
//       </div>

//       {notices.length === 0 ? (
//         <p className="text-gray-400 text-sm">No notices available.</p>
//       ) : (
//         <div className="space-y-4">
//           {notices.map((notice, index) => (
//             <div
//               key={notice._id}
//               className="bg-[#2a3248] rounded-lg p-4 border border-gray-700 hover:shadow-lg transition"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm text-gray-400">#{index + 1}</span>
//                 <span className="text-sm text-blue-400 font-medium">
//                   {new Date(notice.date).toLocaleDateString()}
//                 </span>
//               </div>
//               <h4 className="text-lg font-semibold text-white mb-1">
//                 {notice.title}
//               </h4>
//               <p className="text-sm text-gray-300">{notice.details}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoticeBoard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaBell } from 'react-icons/fa';

// const NoticeBoard = () => {
//   const [notices, setNotices] = useState([]);

//   useEffect(() => {
//     const fetchNotices = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('/api/notices', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setNotices(res.data);
//       } catch (err) {
//         console.error('Error fetching notices:', err);
//       }
//     };

//     fetchNotices();
//   }, []);

//   return (
//     <div className="bg-[#1b2236] p-6 rounded-xl shadow-md mt-6">
//       <div className="flex items-center gap-3 mb-5">
//         <FaBell className="text-yellow-400 text-xl" />
//         <h3 className="text-xl font-bold text-white">Notice Board</h3>
//       </div>

//       {notices.length === 0 ? (
//         <p className="text-gray-400 text-sm">No notices available.</p>
//       ) : (
//         <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
//           {notices.map((notice, index) => (
//             <div
//               key={notice._id}
//               className="bg-[#2a3248] rounded-lg p-4 border border-gray-700 hover:shadow-lg transition"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-sm text-gray-400">#{index + 1}</span>
//                 <span className="text-sm text-blue-400 font-medium">
//                   {new Date(notice.date).toLocaleDateString()}
//                 </span>
//               </div>
//               <h4 className="text-lg font-semibold text-white mb-1">
//                 {notice.title}
//               </h4>
//               <p className="text-sm text-gray-300">{notice.details}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoticeBoard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get('/api/notices', {
          withCredentials: true, // ✅ Ensures cookies (like accessToken) are sent
        });
        setNotices(res.data);
      } catch (err) {
        console.error('Error fetching notices:', err);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="bg-[#1b2236] p-6 rounded-xl shadow-md mt-6">
      <div className="flex items-center gap-3 mb-5">
        <FaBell className="text-yellow-400 text-xl" />
        <h3 className="text-xl font-bold text-white">Notice Board</h3>
      </div>

      {notices.length === 0 ? (
        <p className="text-gray-400 text-sm">No notices available.</p>
      ) : (
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {notices.map((notice, index) => (
            <div
              key={notice._id}
              className="bg-[#2a3248] rounded-lg p-4 border border-gray-700 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">#{index + 1}</span>
                <span className="text-sm text-blue-400 font-medium">
                  {new Date(notice.date).toLocaleDateString()}
                </span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-1">
                {notice.title}
              </h4>
              <p className="text-sm text-gray-300">{notice.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
