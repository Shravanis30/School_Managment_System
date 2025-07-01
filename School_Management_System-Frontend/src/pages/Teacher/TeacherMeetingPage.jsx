import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';

const TeacherMeetingPage = () => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const storedMeetings = JSON.parse(localStorage.getItem('meetings')) || [];
        setMeetings(storedMeetings);
    }, []);

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('meetingHistory')) || [];
        setHistory(stored);
    }, []);


    return (
        <div className="flex min-h-screen bg-black text-white">
            <Sidebar role="teacher" />
            <div className="flex-1 p-6">
                <h2 className="text-xl font-semibold mb-4">Upcoming Meetings Instructions</h2>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="p-2">Title</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Participants</th>
                            <th>Mode</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meetings.length > 0 ? meetings.map((m, i) => (
                            <tr key={i} className="bg-gray-700 text-center">
                                <td className="p-2">{m.title}</td>
                                <td>{m.date}</td>
                                <td>{m.time}</td>
                                <td>{m.participants}</td>
                                <td>{m.mode}</td>
                                <td>{m.link ? <a href={m.link} target="_blank" className="text-blue-400 underline">Join</a> : '-'}</td>
                            </tr>
                        )) : (
                            <tr><td colSpan="6" className="text-center py-4">No meetings available</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
           
        </div>
    );
};

export default TeacherMeetingPage;
