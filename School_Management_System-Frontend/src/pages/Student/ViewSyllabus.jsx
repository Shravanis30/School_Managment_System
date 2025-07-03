import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const ViewSyllabus = ({ className = "10" }) => {
    const [syllabus, setSyllabus] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSyllabus = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`/api/syllabus/${className}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setSyllabus(data.subjects || []);
            } catch (err) {
                console.error("Error fetching syllabus", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSyllabus();
    }, [className]);

    return (
        <div className="flex bg-[#0f1117] min-h-screen text-white">
            <Sidebar role="student" />
            <div className="flex flex-col w-full">
                <div className="p-6">
                    <Header />

                    <h1 className="text-2xl font-bold mb-4">Class {className} Syllabus</h1>
                    {loading ? <p>Loading...</p> : (
                        <div className="space-y-4">
                            {syllabus.map((subject, i) => (
                                <div key={i} className="bg-gray-800 p-4 rounded">
                                    <h3 className="text-lg font-semibold text-blue-400">{subject.name}</h3>
                                    <p className="text-sm text-gray-300">{subject.syllabus}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewSyllabus;
