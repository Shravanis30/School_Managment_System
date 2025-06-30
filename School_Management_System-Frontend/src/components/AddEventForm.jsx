// components/AddEventForm.jsx
import React, { useState } from 'react';

const AddEventForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Event created:\nTitle: ${title}\nDate: ${date}\nTime: ${time}`);
    onClose();
  };

  return (
    <div className="absolute top-10 right-10 bg-white text-black p-5 rounded-lg shadow-lg w-80 z-50">
      <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEventForm;
