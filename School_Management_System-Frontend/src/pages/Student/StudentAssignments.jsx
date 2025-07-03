import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [studentClass, setStudentClass] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchStudentAndAssignments = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch student info
        const studentRes = await fetch('http://localhost:5000/api/students/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!studentRes.ok) throw new Error("Unauthorized or invalid student fetch");

        const student = await studentRes.json();

        const className = student.className; // ⚠️ must match stored string in assignment.className
        setStudentClass(className);

        // Fetch assignments using className as string
        const assignmentsRes = await fetch(`http://localhost:5000/api/assignments/${className}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const assignmentsData = await assignmentsRes.json();

        if (Array.isArray(assignmentsData)) {
          setAssignments(assignmentsData);
        } else {
          setAssignments([]);
        }
      } catch (error) {
        console.error('Error fetching assignments:', error.message);
      }
    };

    fetchStudentAndAssignments();
  }, []);


  const handleSubmit = async () => {
    if (!selectedId || !file) return alert('Please select assignment and file');

    const formData = new FormData();
    formData.append('assignmentId', selectedId);
    formData.append('file', file);

    const res = await fetch('http://localhost:5000/api/assignments/submit', {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
    setSelectedId('');
    setFile(null);
  };

  return (
    <div className="flex bg-[#0f1117] text-white min-h-screen">
      <Sidebar role="student" />
      <div className="flex-1 p-6">
        <Header />
        <h2 className="text-2xl font-bold mb-4">Available Assignments for {studentClass}</h2>
        <div className="space-y-4">
          {assignments.length > 0 ? (
            assignments.map((a) => (
              <div key={a._id} className="bg-gray-800 p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{a.title}</h3>
                <p className="text-sm">{a.description}</p>
                <p className="text-sm text-gray-400">Due: {new Date(a.dueDate).toLocaleDateString()}</p>

                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="file"
                    onChange={(e) => {
                      setSelectedId(a._id);
                      setFile(e.target.files[0]);
                    }}
                    className="bg-gray-900 p-2 rounded"
                  />
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                  >
                    Submit Assignment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No assignments available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;
