// import React, { useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import { useNavigate } from 'react-router-dom';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
//   import { useEffect } from 'react';
//   import axios from 'axios';


// const StudentAttendance = () => {
//   const navigate = useNavigate();
//   const [selectedDateEvents, setSelectedDateEvents] = useState([]);
//   const [showDateEvents, setShowDateEvents] = useState(false);

//   const handleDateClick = (arg) => {
//     const dateStr = arg.dateStr;
//     const matchedEvents = attendanceEvents.filter(event => event.date === dateStr);
//     if (matchedEvents.length > 0) {
//       setSelectedDateEvents(matchedEvents);
//       setShowDateEvents(true);
//     } else {
//       setSelectedDateEvents([]);
//       setShowDateEvents(false);
//     }
//   };


//   const [attendanceEvents, setAttendanceEvents] = useState([]);

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const studentId = localStorage.getItem('studentId'); // Replace with real auth

//         const res = await axios.get(`/api/attendance/student/${studentId}`, {
//           // headers: { Authorization: `Bearer ${token}` },
//         });

//         const records = res.data.records || [];

//         const formatted = records.map((rec, index) => ({
//           id: String(index),
//           title:
//             rec.status === 'present'
//               ? 'Present'
//               : rec.status === 'absent'
//                 ? 'Absent'
//                 : 'Late',
//           date: rec.date,
//           description: `You were marked ${rec.status} for ${rec.subject}`,
//           status: rec.status, // for color mapping
//         }));

//         setAttendanceEvents(formatted);
//       } catch (err) {
//         console.error("Failed to fetch attendance:", err);
//       }
//     };

//     fetchAttendance();
//   }, []);


//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <Sidebar role="student" />
//       <div className="flex-1 p-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold mb-3 md:mb-0">My Attendance Calendar</h2>
//           <button
//             onClick={() => navigate('/dashboard/student/leave')}
//             className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white transition duration-200"
//           >
//             + Request Leave
//           </button>
//         </div>

//         {/* Calendar */}
//         <div className="bg-gray-900 rounded-lg p-4 shadow-md">
//           <FullCalendar
//             plugins={[dayGridPlugin, interactionPlugin]}
//             initialView="dayGridMonth"
//             dateClick={handleDateClick}
//             events={attendanceEvents}
//             height="auto"
//             eventDisplay="block"
//             dayHeaderClassNames="!text-white !bg-gray-800"
//             dayCellClassNames="!border-gray-700 !text-white"
//             eventClassNames={(arg) => {
//               const status = arg.event.extendedProps.status;
//               if (status === 'absent') return '!bg-red-600 !border-0 !text-white';
//               if (status === 'present') return '!bg-blue-600 !border-0 !text-white';
//               if (status === 'late') return '!bg-yellow-500 !border-0 !text-black';
//               return '!bg-gray-500';
//             }}

//           />
//         </div>

//         {/* Selected Date Attendance Info */}
//         {showDateEvents && selectedDateEvents.length > 0 && (
//           <div className="mt-8 bg-gray-800 p-5 rounded shadow-md">
//             <h4 className="text-lg font-semibold mb-4">
//               Attendance on {selectedDateEvents[0].date}
//             </h4>
//             {selectedDateEvents.map((event) => (
//               <div key={event.id} className="bg-gray-700 p-4 mb-3 rounded">
//                 <p className="text-xl font-semibold">{event.title}</p>
//                 <p className="text-sm mb-2 text-gray-300">{event.description}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentAttendance;

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const StudentAttendance = () => {
  const navigate = useNavigate();
  const [attendanceEvents, setAttendanceEvents] = useState([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [showDateEvents, setShowDateEvents] = useState(false);

  // ✅ Fetch student profile first (to get _id)
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // Step 1: Get the currently logged-in student's profile
        const profileRes = await axios.get('/api/user/profile', {
          withCredentials: true, // ✅ Required for cookie auth
        });

        const studentId = profileRes.data.id; // ✅ Use .id from profile response

        // Step 2: Fetch attendance using that ID
        const res = await axios.get(`/api/attendance/student/${studentId}`, {
          withCredentials: true,
        });

        const records = res.data.records || [];

        const formatted = records.map((rec, index) => ({
          id: String(index),
          title:
            rec.status === 'present'
              ? 'Present'
              : rec.status === 'absent'
              ? 'Absent'
              : 'Late',
          date: rec.date,
          description: `You were marked ${rec.status} for ${rec.subject}`,
          status: rec.status, // used for color
        }));

        setAttendanceEvents(formatted);
      } catch (err) {
        console.error('Failed to fetch attendance:', err);
      }
    };

    fetchAttendance();
  }, []);

  const handleDateClick = (arg) => {
    const dateStr = arg.dateStr;
    const matchedEvents = attendanceEvents.filter(event => event.date === dateStr);
    if (matchedEvents.length > 0) {
      setSelectedDateEvents(matchedEvents);
      setShowDateEvents(true);
    } else {
      setSelectedDateEvents([]);
      setShowDateEvents(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar role="student" />
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-3 md:mb-0">My Attendance Calendar</h2>
          <button
            onClick={() => navigate('/dashboard/student/leave')}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white transition duration-200"
          >
            + Request Leave
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-gray-900 rounded-lg p-4 shadow-md">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            events={attendanceEvents}
            height="auto"
            eventDisplay="block"
            dayHeaderClassNames="!text-white !bg-gray-800"
            dayCellClassNames="!border-gray-700 !text-white"
            eventClassNames={(arg) => {
              const status = arg.event.extendedProps.status;
              if (status === 'absent') return '!bg-red-600 !border-0 !text-white';
              if (status === 'present') return '!bg-blue-600 !border-0 !text-white';
              if (status === 'late') return '!bg-yellow-500 !border-0 !text-black';
              return '!bg-gray-500';
            }}
          />
        </div>

        {/* Selected Date Attendance Info */}
        {showDateEvents && selectedDateEvents.length > 0 && (
          <div className="mt-8 bg-gray-800 p-5 rounded shadow-md">
            <h4 className="text-lg font-semibold mb-4">
              Attendance on {selectedDateEvents[0].date}
            </h4>
            {selectedDateEvents.map((event) => (
              <div key={event.id} className="bg-gray-700 p-4 mb-3 rounded">
                <p className="text-xl font-semibold">{event.title}</p>
                <p className="text-sm mb-2 text-gray-300">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAttendance;
