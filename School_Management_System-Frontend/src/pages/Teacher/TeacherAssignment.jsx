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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(err => console.error('Error fetching classes:', err));
  }, []);

  useEffect(() => {
    if (form.classId) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/classes/${form.classId}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setSubjects(data.subjects || []));
    } else {
      setSubjects([]);
      setForm(prev => ({ ...prev, subject: '' }));
    }
  }, [form.classId]);

  useEffect(() => {
    if (filter.classId) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/classes/${filter.classId}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setSubjects(data.subjects || []));
    }
  }, [filter.classId]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/assignments/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
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
        alert(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong");
    }
  };

  const fetchSubmissions = async () => {
    if (filter.className && filter.subject) {
      try {
        const res = await fetch(
          `/api/assignments/submissions/${filter.className}/${filter.subject}`,
          { credentials: 'include' }
        );
        const data = await res.json();
        setSubmissions(data || []);
      } catch (err) {
        console.error("Fetch submissions error:", err);
      }
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);

  return (
    <div className="flex bg-gradient-to-br from-black via-gray-900 to-black text-white min-h-screen">
      <Sidebar role="teacher" />
      <div className="flex-1 p-6 space-y-10">
        <Header />

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Assignments</h2>
          <button
            onClick={() => setFormVisible(!formVisible)}
            className="bg-purple-600 px-4 py-2 rounded-full font-semibold shadow hover:bg-purple-700 transition"
          >
            {formVisible ? 'Close Form' : 'Add Assignment'}
          </button>
        </div>

        {/* Upload Form */}
        {formVisible && (
          <form
            onSubmit={handleUpload}
            className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md space-y-4 max-w-3xl"
          >
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
                className="bg-gray-900 border border-white/20 rounded px-4 py-2"
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
                className="bg-gray-900 border border-white/20 rounded px-4 py-2"
              >
                <option value="">Select Subject</option>
                {subjects.map((sub, i) => (
                  <option key={i} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <input
              type="text"
              placeholder="Assignment Title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-gray-900 border border-white/20 rounded px-4 py-2"
            />

            <textarea
              placeholder="Description"
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-gray-900 border border-white/20 rounded px-4 py-2"
              rows={4}
            ></textarea>

            <input
              type="date"
              required
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="bg-gray-900 border border-white/20 rounded px-4 py-2"
            />

            <button type="submit" className="bg-green-600 px-4 py-2 rounded font-semibold hover:bg-green-700 transition">
              Submit Assignment
            </button>
          </form>
        )}

        {/* Submission Viewer */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md space-y-6">
          <h3 className="text-xl font-semibold">View Submissions</h3>

          <div className="flex flex-wrap gap-4">
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
              className="bg-gray-900 border border-white/20 rounded px-4 py-2"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>{cls.name}</option>
              ))}
            </select>

            <select
              value={filter.subject}
              onChange={(e) => setFilter({ ...filter, subject: e.target.value })}
              className="bg-gray-900 border border-white/20 rounded px-4 py-2"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {submissions.length > 0 ? (
              submissions.map((s, i) => (
                <div key={i} className="p-4 rounded-lg bg-gray-800 border border-white/10 shadow-sm hover:bg-gray-700 transition">
                  <p><strong>Student:</strong> {s.studentId?.name || 'Unknown'}</p>
                  <p><strong>Assignment:</strong> {s.assignmentId?.title || 'Untitled'}</p>
                  <a
                    href={s.submittedFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline mt-1 inline-block"
                  >
                    View Submission
                  </a>
                </div>
              ))
            ) : (
              <p className="text-white/70">No submissions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignments;
