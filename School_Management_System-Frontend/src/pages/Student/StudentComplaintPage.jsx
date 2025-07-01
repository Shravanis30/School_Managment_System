// StudentComplaintPage.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const StudentComplaintPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        class: '',
        rollNo: '',
        complaint: '',
        priority: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing complaints from localStorage
    const existingComplaints = JSON.parse(localStorage.getItem('complaints')) || [];

    // Add new complaint
    const updatedComplaints = [...existingComplaints, formData];

    // Save back to localStorage
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));

    alert('Complaint submitted successfully!');
    setFormData({ name: '', class: '', rollNo: '', complaint: '', priority: '' });
};


    return (
        <div className="flex min-h-screen bg-black text-white">
            <Sidebar role="student" />
            <div className="flex-1 p-10">
                <h1 className="text-center text-xl mt-15 font-bold mb-6">RAISE A COMPLAINT</h1>
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 max-w-lg mx-auto p-6 rounded space-y-4"
                >
                    <div>
                        <label className="block font-semibold">Student Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-700 p-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Class:</label>
                        <select
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            className="w-full bg-gray-700 p-2 rounded"
                            required
                        >
                            <option value="">Select class</option>
                            {Array.from({ length: 10 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold">Roll No:</label>
                        <input
                            type="text"
                            name="rollNo"
                            value={formData.rollNo}
                            onChange={handleChange}
                            className="w-full bg-gray-700 p-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Complaint:</label>
                        <textarea
                            name="complaint"
                            value={formData.complaint}
                            onChange={handleChange}
                            className="w-full bg-gray-700 p-2 rounded"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-semibold">Priority:</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full bg-gray-700 p-2 rounded"
                            required
                        >
                            <option value="">Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <button type="submit" className="bg-gray-600 px-4 py-2 rounded w-full">
                        Submit Complaint
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentComplaintPage;