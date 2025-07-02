
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';


const AdminEvents = () => {
  const [events, setEvents] = useState([

  ]);

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
        const token = localStorage.getItem('token');
        const res = await axios.post(
          'http://localhost:5000/api/events',
          newEvent,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEvents([...events, res.data]);
        setShowForm(false);
        setNewEvent({ date: '', title: '', description: '' });
      } catch (err) {
        alert("Error creating event", err);
      }
    } else {
      alert('Please fill all fields');
    }
  };


  const handleDeleteEvent = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter(event => event._id !== id));
      setSelectedDateEvents(selectedDateEvents.filter(event => event._id !== id));
    } catch (errr) {
      alert("Error deleting event", errr);
    }
  };


  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
    };
    fetchEvents();
  }, []);


  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header />

        {/* Header */}
        <div className="flex flex-col mt-10 md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-2 md:mb-0">Admin Event Calendar</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded text-black font-medium"
          >
            + Add Event
          </button>
        </div>

        {/* Calendar with Custom Style */}
        <div className="bg-gray-900 rounded-lg p-4 text-white shadow-md">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            events={events}
            height="auto"
            eventDisplay="block"
            dayHeaderClassNames="!text-white !bg-gray-800"
            dayCellClassNames="!border-gray-700 !text-white"
            eventClassNames="!bg-blue-600 !border-0 !text-white"
          />
        </div>

        {/* Add Event Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Add New Event</h3>
              <input
                type="date"
                className="w-full p-2 mb-2 border rounded"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="Event Title"
                className="w-full p-2 mb-2 border rounded"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <textarea
                placeholder="Event Description"
                className="w-full p-2 mb-4 border rounded"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded"
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

        {/* Date Events */}
        {showDateEvents && selectedDateEvents.length > 0 && (
          <div className="mt-8 bg-gray-800 p-5 rounded shadow-md">
            <h4 className="text-lg font-semibold mb-4">
              Events on {selectedDateEvents[0].date}
            </h4>
            {selectedDateEvents.map((event) => (
              <div key={event.id} className="bg-gray-700 p-4 mb-3 rounded">
                <p className="text-xl font-semibold">{event.title}</p>
                <p className="text-sm mb-2 text-gray-300">{event.description}</p>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
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
