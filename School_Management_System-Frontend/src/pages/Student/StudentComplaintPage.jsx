// StudentComplaintPage.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

const StudentComplaintPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        class: '',
        rollNo: '',
        complaint: '',
        priority: '',
    });
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            const res = await fetch('/api/classes');
            const data = await res.json();
            setClassList(data);
        };
        fetchClasses();
    }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/complaints', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Failed to submit complaint');
            }

            alert('Complaint submitted successfully!');
            setFormData({ name: '', class: '', rollNo: '', complaint: '', priority: '' });
        } catch (err) {
            console.error(err.message);
            alert('Failed to submit complaint.');
        }
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
                            {classList.map((cls, idx) => (
                                <option key={idx} value={cls.name}>
                                    {cls.name}
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