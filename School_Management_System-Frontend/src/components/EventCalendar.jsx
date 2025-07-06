// update new auth
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const EventCalendar = ({ role }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events`,
          {
            withCredentials: true, // ✅ Use cookie-based auth
          });

        setEvents(
          res.data.map(event => ({
            id: event._id,
            title: event.title,
            start: event.date,
            description: event.description,
          }))
        );
      } catch (err) {
        console.error('Error fetching events:', err.response?.data || err.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-[#1b2236] p-5 rounded-xl shadow-md">
      <h3 className="text-base font-semibold mb-4 text-white">
        {role === 'student' ? 'Student' : 'Teacher'} Event Calendar
      </h3>

      <div className="text-sm bg-gray-800 p-2 rounded-md mb-5 overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height={320}
          headerToolbar={{
            start: '',
            center: 'title',
            end: 'prev,next',
          }}
          eventDisplay="list-item"
          eventClassNames="!bg-blue-600 !text-white !text-xs !border-0"
          dayHeaderClassNames="!bg-gray-700 !text-gray-300"
          dayCellClassNames="!border-gray-600 !text-gray-200"
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-2">Upcoming Events</h4>
        <ul className="space-y-2">
          {events.length > 0 ? (
            events.slice(0, 5).map(event => (
              <li
                key={event.id}
                className="bg-[#2c334a] rounded-md px-3 py-2 text-sm text-white"
              >
                <p className="font-semibold">{event.title}</p>
                <p className="text-xs text-gray-400">{event.start}</p>
                {event.description && (
                  <p className="text-xs text-gray-500">{event.description}</p>
                )}
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-xs">No upcoming events.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default EventCalendar;
