import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ date: '', title: '', description: '' });
  const [showForm, setShowForm] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [showDateEvents, setShowDateEvents] = useState(false);

  const handleDateClick = (arg) => {
    const dateStr = arg.dateStr;
    const matchedEvents = events.filter(event => event.date === dateStr);
    if (matchedEvents.length > 0) {
      setSelectedDateEvents(matchedEvents);
      setShowDateEvents(true);
    } else {
      setNewEvent({ ...newEvent, date: dateStr });
      setShowForm(true);
    }
  };

  const handleAddEvent = async () => {
    if (newEvent.title && newEvent.date) {
      try {
        const res = await axios.post(
          '/api/events',
          newEvent,
          { withCredentials: true }
        );
        setEvents([...events, res.data]);
        setShowForm(false);
        setNewEvent({ date: '', title: '', description: '' });
      } catch (err) {
        alert("Error creating event");
        console.error(err.response?.data || err.message);
      }
    } else {
      alert('Please fill all fields');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`, {
        withCredentials: true,
      });
      setEvents(events.filter(event => event._id !== id));
      setSelectedDateEvents(selectedDateEvents.filter(event => event._id !== id));
    } catch (err) {
      alert("Error deleting event");
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events', {
          withCredentials: true,
        });
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch events', err.response?.data || err.message);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header />

        <div className="flex flex-col mt-10 md:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">🗓️ Admin Event Calendar</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 hover:bg-green-600 transition px-5 py-2 rounded text-black font-semibold shadow-lg"
          >
            + Add Event
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden p-4 bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            events={events}
            height="auto"
            eventDisplay="block"
            dayHeaderClassNames="!text-white !bg-gray-800"
            dayCellClassNames="!border-gray-700 !text-white"
            eventClassNames="!bg-blue-600 !border-0 !text-white !rounded-md !px-1"
          />
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50">
            <div className="bg-white text-black p-6 rounded-2xl shadow-2xl w-full max-w-md">
              <h3 className="text-2xl font-bold mb-4">➕ Add New Event</h3>
              <input
                type="date"
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="Event Title"
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <textarea
                placeholder="Event Description"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {showDateEvents && selectedDateEvents.length > 0 && (
          <div className="mt-10 bg-white/5 p-6 rounded-xl backdrop-blur-md text-white border border-white/10 shadow-md">
            <h4 className="text-xl font-bold mb-4">📅 Events on {selectedDateEvents[0].date}</h4>
            {selectedDateEvents.map((event) => (
              <div key={event._id} className="bg-white/10 p-4 mb-4 rounded-xl shadow hover:shadow-lg transition-all">
                <p className="text-xl font-semibold text-white/90">{event.title}</p>
                <p className="text-sm mb-2 text-white/70">{event.description}</p>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm mt-2"
                >
                  Delete Event
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
