
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const TeacherAssignments = () => {
  const [classes, setClasses] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    classId: '',
    className: '',
    subject: '',
    title: '',
    description: '',
    dueDate: '',
  });

  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState({ classId: '', className: '', subject: '' });
  const [subjects, setSubjects] = useState([]);

  // ✅ Fetch all classes (with credentials)
  useEffect(() => {
    fetch('/api/classes', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(err => console.error('Error fetching classes:', err));
  }, []);

  // ✅ Fetch subjects for selected form classId
  useEffect(() => {
    if (form.classId) {
      fetch(`/api/classes/${form.classId}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => setSubjects(data.subjects || []));
    } else {
      setSubjects([]);
      setForm(prev => ({ ...prev, subject: '' }));
    }
  }, [form.classId]);

  // ✅ Fetch subjects for selected filter classId
  useEffect(() => {
    if (filter.classId) {
      fetch(`/api/classes/${filter.classId}`, {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => setSubjects(data.subjects || []));
    }
  }, [filter.classId]);

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/assignments/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Send cookie
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Assignment uploaded');
        setForm({
          classId: '',
          className: '',
          subject: '',
          title: '',
          description: '',
          dueDate: ''
        });
        setFormVisible(false);
      } else {
        alert(data.message || 'Failed to upload assignment');
      }
    } catch (err) {
      console.error("Error uploading assignment:", err);
      alert("Something went wrong");
    }
  };

  const fetchSubmissions = async () => {
    if (filter.className && filter.subject) {
      try {
        const response = await fetch(
          `/api/assignments/submissions/${filter.className}/${filter.subject}`,
          {
            credentials: 'include', // ✅ Send cookie
          }
        );

        const data = await response.json();
        setSubmissions(data || []);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      }
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);

  return (
    <div className="flex bg-[#0f1117] text-white min-h-screen">
      <Sidebar role="teacher" />
      <div className="flex flex-col w-full p-6">
        <Header />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Assignments</h2>
          <button
            onClick={() => setFormVisible(!formVisible)}
            className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            {formVisible ? 'Close Form' : 'Add Assignment'}
          </button>
        </div>

        {formVisible && (
          <form onSubmit={handleUpload} className="bg-gray-800 p-6 rounded-lg space-y-4 max-w-2xl mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                required
                value={form.classId}
                onChange={(e) => {
                  const selectedClass = classes.find(cls => cls._id === e.target.value);
                  setForm({
                    ...form,
                    classId: selectedClass._id,
                    className: selectedClass.name
                  });
                }}
                className="p-2 rounded bg-gray-900 border border-gray-600"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>{cls.name}</option>
                ))}
              </select>

              <select
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="p-2 rounded bg-gray-900 border border-gray-600"
              >
                <option value="">Select Subject</option>
                {subjects.map((sub, i) => (
                  <option key={i} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <input
              type="text"
              placeholder="Title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 bg-gray-900 rounded border border-gray-600"
            />

            <textarea
              placeholder="Description"
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2 bg-gray-900 rounded border border-gray-600"
              rows={4}
            ></textarea>

            <input
              type="date"
              required
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="p-2 bg-gray-900 rounded border border-gray-600"
            />

            <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Submit</button>
          </form>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-4">View Submissions</h3>
          <div className="flex gap-4 mb-4">
            <select
              value={filter.classId}
              onChange={(e) => {
                const selectedClass = classes.find(cls => cls._id === e.target.value);
                setFilter({
                  ...filter,
                  classId: selectedClass._id,
                  className: selectedClass.name,
                });
              }}
              className="p-2 bg-gray-900 rounded border border-gray-600"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>{cls.name}</option>
              ))}
            </select>

            <select
              value={filter.subject}
              onChange={(e) => setFilter({ ...filter, subject: e.target.value })}
              className="p-2 bg-gray-900 rounded border border-gray-600"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            {submissions.length > 0 ? (
              submissions.map((s, i) => (
                <div key={i} className="border-b border-gray-700 py-2">
                  <p><strong>Student:</strong> {s.studentId?.name || 'Unknown'}</p>
                  <p><strong>Assignment:</strong> {s.assignmentId?.title || 'Untitled'}</p>
                  <a href={s.submittedFile} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    View Submission
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No submissions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignments;
