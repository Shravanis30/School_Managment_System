
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [className, setClassName] = useState('');

  useEffect(() => {
    const fetchStudentAndResources = async () => {
      try {
        // ✅ Get student data from protected route
        const studentRes = await axios.get('/api/students/me', {
          withCredentials: true,
        });

        const studentClass = studentRes.data.className;
        setClassName(studentClass);

        const [resourcesRes, subjectsRes] = await Promise.all([
          axios.get(`/api/resources/class/${studentClass}`),
          axios.get(`/api/resources/subjects/${studentClass}`),
        ]);

        setResources(resourcesRes.data);
        setSubjects(subjectsRes.data);
      } catch (err) {
        console.error('Failed to fetch resources or student data:', err);
      }
    };

    fetchStudentAndResources();
  }, []);

  const filteredResources = selectedSubject
    ? resources.filter((r) => r.subject === selectedSubject)
    : resources;

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar role="student" />
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">
          My Class Resources {className && `(${className})`}
        </h2>

        <div className="mb-4">
          <label className="mr-2">Filter by Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-gray-800 p-2 rounded"
          >
            <option value="">All</option>
            {subjects.map((sub, idx) => (
              <option key={idx} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div className="bg-gray-900 p-4 rounded space-y-3">
          {filteredResources.length > 0 ? (
            filteredResources.map((res, i) => (
              <div key={res._id} className="flex justify-between items-center bg-gray-800 p-3 rounded">
                <div>
                  <p className="text-sm text-gray-400">#{i + 1}</p>
                  <p className="font-semibold">{res.subject}</p>
                  <p className="text-sm text-gray-500">{res.title}</p>
                </div>
                <a
                  href={`http://localhost:5000${res.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Download
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No resources uploaded for your class.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewResources;
