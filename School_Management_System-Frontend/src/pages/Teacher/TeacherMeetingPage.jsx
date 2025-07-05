import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import Header from '../../components/Header';

const TeacherMeetingPage = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get('/api/meetings', {
          withCredentials: true,
        });
        setMeetings(res.data || []);
      } catch (err) {
        console.error('Failed to fetch meetings:', err.response?.data || err.message);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="teacher" />
      <div className="flex-1 p-6">
        <Header />
        <h2 className="text-2xl font-bold mb-6">📅 Upcoming Staff Meetings</h2>

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
                    <td>{m.mode}</td>
                    <td>
                      {m.link ? (
                        <a
                          href={m.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline"
                        >
                          Join
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-white/70">
                    No upcoming meetings scheduled.
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
