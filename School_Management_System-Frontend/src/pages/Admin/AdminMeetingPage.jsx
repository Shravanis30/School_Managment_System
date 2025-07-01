// // AdminMeetingPage.jsx
// import React, { useState } from 'react';
// import Sidebar from '../../components/Sidebar';

// const AdminMeetingPage = () => {
//     const [meetings, setMeetings] = useState(() => {
//         return JSON.parse(localStorage.getItem('meetings')) || [];
//     });


//     const [history, setHistory] = useState([
//     ]);

//     const [newMeeting, setNewMeeting] = useState({ title: '', date: '', time: '', participants: '', mode: '', link: '' });

//     const handleAddMeeting = () => {
//         const updatedMeetings = [...meetings, newMeeting];
//         setMeetings(updatedMeetings);
//         localStorage.setItem('meetings', JSON.stringify(updatedMeetings)); // Save to localStorage
//         setNewMeeting({ title: '', date: '', time: '', participants: '', mode: '', status: '', link: '' });
//     };


//     return (
//         <div className="flex min-h-screen bg-black text-white">
//             <Sidebar role="admin" />
//             <div className="flex-1 p-6">
//                 <h2 className="text-xl font-semibold mb-4">Upcoming Meetings Table</h2>
//                 <table className="w-full mb-6">
//                     <thead>
//                         <tr className="bg-gray-800">
//                             <th className="p-2">Title</th><th>Date</th><th>Time</th><th>Participants</th><th>Mode</th><th>Status</th><th>Link</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {meetings.map((m, i) => (
//                             <tr key={i} className="bg-gray-700 text-center">
//                                 <td className="p-2">{m.title}</td><td>{m.date}</td><td>{m.time}</td><td>{m.participants}</td><td>{m.mode}</td><td>{m.status}</td>
//                                 <td>{m.link ? <a href={m.link} target="_blank" className="text-blue-400 underline">Link</a> : '-'}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-2">Add Meeting</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                         {['title', 'date', 'time', 'participants', 'mode', 'link'].map(field => (
//                             <input
//                                 key={field}
//                                 placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                                 value={newMeeting[field]}
//                                 onChange={e => setNewMeeting({ ...newMeeting, [field]: e.target.value })}
//                                 className="bg-gray-700 p-2 rounded"
//                             />
//                         ))}
//                     </div>
//                     <button onClick={handleAddMeeting} className="mt-4 bg-green-500 px-4 py-2 rounded text-black">Add Meeting</button>
//                 </div>

//                 <h2 className="text-xl font-semibold mt-8 mb-4">Meeting History / Reports</h2>
//                 <table className="w-full">
//                     <thead>
//                         <tr className="bg-gray-800">
//                             <th className="p-2">Date</th><th>Title</th><th>Conducted By</th><th>Summary / Minutes</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {history.map((h, i) => (
//                             <tr key={i} className="bg-gray-700 text-center">
//                                 <td className="p-2">{h.date}</td><td>{h.title}</td><td>{h.by}</td><td>{h.summary}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AdminMeetingPage;


import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminMeetingPage = () => {
    const [meetings, setMeetings] = useState(() => {
        return JSON.parse(localStorage.getItem('meetings')) || [];
    });

    const [history, setHistory] = useState(() => {
        return JSON.parse(localStorage.getItem('meetingHistory')) || [];
    });

    const [newMeeting, setNewMeeting] = useState({
        title: '',
        date: '',
        time: '',
        participants: [],
        mode: '',
        link: ''
    });

    // Update localStorage when meetings or history change
    useEffect(() => {
        localStorage.setItem('meetings', JSON.stringify(meetings));
    }, [meetings]);

    useEffect(() => {
        localStorage.setItem('meetingHistory', JSON.stringify(history));
    }, [history]);

    const handleAddMeeting = () => {
        const meetingWithStatus = { ...newMeeting, status: 'Scheduled' };
        setMeetings([...meetings, meetingWithStatus]);
        setNewMeeting({ title: '', date: '', time: '', participants: [], mode: '', link: '' });
    };

    const handleParticipantsChange = (e) => {
        const options = Array.from(e.target.options);
        const selected = options.filter(opt => opt.selected).map(opt => opt.value);
        setNewMeeting({ ...newMeeting, participants: selected });
    };

    const handleMarkAsDone = (index) => {
        const doneMeeting = meetings[index];
        const updatedMeetings = [...meetings];
        updatedMeetings.splice(index, 1);
        setMeetings(updatedMeetings);

        const historyEntry = {
            date: doneMeeting.date,
            title: doneMeeting.title,
            by: 'Admin',
            summary: `${doneMeeting.title} meeting conducted successfully.`
        };
        setHistory([...history, historyEntry]);
    };

    return (
        <div className="flex min-h-screen bg-black text-white">
            <Sidebar role="admin" />
            <div className="flex-1 p-6">
                <Header />
                <h2 className="text-xl font-semibold mb-4">Upcoming Meetings Table</h2>
                <table className="w-full mb-6">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="p-2">Title</th>
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
                        {meetings.map((m, i) => (
                            <tr key={i} className="bg-gray-700 text-center">
                                <td className="p-2">{m.title}</td>
                                <td>{m.date}</td>
                                <td>{m.time}</td>
                                <td>{Array.isArray(m.participants) ? m.participants.join(', ') : m.participants}</td>
                                <td>{m.mode}</td>
                                <td>{m.status}</td>
                                <td>{m.link ? <a href={m.link} target="_blank" className="text-blue-400 underline">Link</a> : '-'}</td>
                                <td>
                                    <button onClick={() => handleMarkAsDone(i)} className="text-green-400 underline">Mark as Done</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add Meeting Form */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Add Meeting</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            placeholder="Title"
                            value={newMeeting.title}
                            onChange={e => setNewMeeting({ ...newMeeting, title: e.target.value })}
                            className="bg-gray-700 p-2 rounded"
                        />
                        <input
                            type="date"
                            value={newMeeting.date}
                            onChange={e => setNewMeeting({ ...newMeeting, date: e.target.value })}
                            className="bg-gray-700 p-2 rounded"
                        />
                        <input
                            type="time"
                            value={newMeeting.time}
                            onChange={e => setNewMeeting({ ...newMeeting, time: e.target.value })}
                            className="bg-gray-700 p-2 rounded"
                        />
                        <select
                            multiple
                            value={newMeeting.participants}
                            onChange={handleParticipantsChange}
                            className="bg-gray-700 p-2 rounded"
                        >
                            {['Student', 'Teacher', 'Parent'].map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                        <select
                            value={newMeeting.mode}
                            onChange={e => setNewMeeting({ ...newMeeting, mode: e.target.value })}
                            className="bg-gray-700 p-2 rounded"
                        >
                            <option value="">Select Mode</option>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>
                        <input
                            placeholder="Link (optional)"
                            value={newMeeting.link}
                            onChange={e => setNewMeeting({ ...newMeeting, link: e.target.value })}
                            className="bg-gray-700 p-2 rounded"
                        />
                    </div>
                    <button onClick={handleAddMeeting} className="mt-4 bg-green-500 px-4 py-2 rounded text-black">Add Meeting</button>
                </div>

                {/* Meeting History */}
                <h2 className="text-xl font-semibold mt-8 mb-4">Meeting History / Reports</h2>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="p-2">Date</th>
                            <th>Title</th>
                            <th>Conducted By</th>
                            <th>Summary / Minutes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((h, i) => (
                            <tr key={i} className="bg-gray-700 text-center">
                                <td className="p-2">{h.date}</td>
                                <td>{h.title}</td>
                                <td>{h.by}</td>
                                <td>{h.summary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminMeetingPage;
