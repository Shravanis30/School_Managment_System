import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import {

  FaBell
} from 'react-icons/fa';



const sampleStudents = {
  '1': ['Aarav Singh', 'Diya Mehta'],
  '2': ['Krish Patel', 'Ananya Sharma'],
  '10': ['Rohan Desai', 'Priya Kapoor', 'Arjun Verma'],
};

const resultCategories = ['Mid Term', 'Final Term', 'Unit Test'];

const classWiseSubjects = {
  '1': [
    { code: 'ENG101', name: 'English', teacher: 'Ms. A', type: 'Theory', marks: 100 },
    { code: 'MTH101', name: 'Math', teacher: 'Mr. B', type: 'Theory', marks: 100 },
  ],
  '10': [
    { code: 'ENG101', name: 'English Literature', teacher: 'Ms. Shreya Patil', type: 'Theory', marks: 100 },
    { code: 'MTH101', name: 'Mathematics', teacher: 'Mr. Ajay Kulkarni', type: 'Theory', marks: 100 },
    { code: 'SCI101', name: 'Science', teacher: 'Ms. Neha Rathi', type: 'Theory+Lab', marks: 100 },
    { code: 'SST101', name: 'Social Science', teacher: 'Mr. Ramesh Yadav', type: 'Theory', marks: 100 },
    { code: 'HIN101', name: 'Hindi', teacher: 'Ms. Aarti Mishra', type: 'Theory', marks: 100 },
    { code: 'CSC101', name: 'Computer Science', teacher: 'Mr. Rahul Verma', type: 'Practical', marks: 50 },
    { code: 'ART101', name: 'Art & Drawing', teacher: 'Ms. Shalini Desai', type: 'Activity', marks: 50 },
    { code: 'PHY201', name: 'Physics', teacher: 'Mr. Pranav Joshi', type: 'Theory+Lab', marks: 100 },
    { code: 'CHM201', name: 'Chemistry', teacher: 'Ms. Isha Shetty', type: 'Theory+Lab', marks: 100 },
    { code: 'BIO201', name: 'Biology', teacher: 'Mr. Sameer Khan', type: 'Theory+Lab', marks: 100 },
  ]
};

const tabs = ['Subject', 'Classes', 'Syllabus', 'Time-Table', 'Result'];

const AdminAcademics = () => {

  const [assignedTeachers, setAssignedTeachers] = useState({});
  const [uploadedSyllabus, setUploadedSyllabus] = useState(() => JSON.parse(localStorage.getItem('syllabus')) || {});
  const [newTeacher, setNewTeacher] = useState({ class: '', teacher: '' });
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSyllabusClass, setActiveSyllabusClass] = useState('');

  const [uploadedTimetables, setUploadedTimetables] = useState(() => JSON.parse(localStorage.getItem('timetable')) || {});
  const [newTimetableEntries, setNewTimetableEntries] = useState([
    { day: 'Monday', periods: ['', '', '', '', '', ''] },
    { day: 'Tuesday', periods: ['', '', '', '', '', ''] },
    { day: 'Wednesday', periods: ['', '', '', '', '', ''] },
    { day: 'Thursday', periods: ['', '', '', '', '', ''] },
    { day: 'Friday', periods: ['', '', '', '', '', ''] },
    { day: 'Saturday', periods: ['', '', '', '', '', ''] }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalClass, setModalClass] = useState('');
   const [classOptions, setClassOptions] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/classes');
        const data = await response.json();

        // Assuming backend returns: [{ _id, name, subjects }]
        const classNames = data.map(cls => cls.name);
        setClassOptions(classNames);
      } catch (error) {
        console.error("Failed to fetch class list", error);
      }
    };

    fetchClasses();
  }, []);




  const [selectedClass, setSelectedClass] = useState('10');
  const [activeTab, setActiveTab] = useState('Subject');
  const [results, setResults] = useState(() => JSON.parse(localStorage.getItem('studentResults')) || {});
  const [newResults, setNewResults] = useState({});
  const academicData = classWiseSubjects[selectedClass] || [];



  const handleAssignTeacher = () => {
    if (newTeacher.class && newTeacher.teacher) {
      setAssignedTeachers({ ...assignedTeachers, [newTeacher.class]: newTeacher.teacher });
      setNewTeacher({ class: '', teacher: '' });
    }
  };

  const handleSyllabusUpload = async () => {
    if (syllabusFile) {
      const fileURL = URL.createObjectURL(syllabusFile); // For preview only

      // Simulate upload to Cloudinary / Firebase (replace this part with real upload logic)
      const payload = {
        class: selectedClass,
        syllabusURL: fileURL
      };

      try {
        const res = await fetch("http://localhost:5000/api/syllabus", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const updated = { ...uploadedSyllabus, [selectedClass]: { name: syllabusFile.name, url: fileURL } };
          setUploadedSyllabus(updated);
          setSyllabusFile(null);
        }
      } catch (err) {
        console.error("Syllabus upload error", err);
      }
    }
  };



  const handleTimetableInput = (dayIndex, periodIndex, value) => {
    const updatedEntries = [...newTimetableEntries];
    updatedEntries[dayIndex].periods[periodIndex] = value;
    setNewTimetableEntries(updatedEntries);
  };

  const handleTimetableSubmit = async () => {
    const payload = {
      class: selectedClass,
      entries: newTimetableEntries,
    };

    try {
      const res = await fetch("http://localhost:5000/api/timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const updated = { ...uploadedTimetables, [selectedClass]: newTimetableEntries };
        setUploadedTimetables(updated);
        setNewTimetableEntries([
          { day: 'Monday', periods: ['', '', '', '', '', ''] },
          { day: 'Tuesday', periods: ['', '', '', '', '', ''] },
          { day: 'Wednesday', periods: ['', '', '', '', '', ''] },
          { day: 'Thursday', periods: ['', '', '', '', '', ''] },
          { day: 'Friday', periods: ['', '', '', '', '', ''] },
          { day: 'Saturday', periods: ['', '', '', '', '', ''] }
        ]);
      }
    } catch (err) {
      console.error("Timetable upload error", err);
    }
  };

  const handleDeleteTimetable = async (cls) => {
    try {
      const res = await fetch(`http://localhost:5000/api/timetable/${cls}`, {
        method: "DELETE"
      });
      if (res.ok) {
        const updated = { ...uploadedTimetables };
        delete updated[cls];
        setUploadedTimetables(updated);
        alert(`Timetable for Class ${cls} deleted.`);
      } else {
        alert("Failed to delete timetable.");
      }
    } catch (err) {
      console.error("Delete timetable error", err);
    }
  };



  useEffect(() => {
    const initial = {};
    (sampleStudents[selectedClass] || []).forEach((name) => {
      initial[name] = resultCategories.reduce((acc, cat) => {
        acc[cat] = '';
        return acc;
      }, {});
    });
    setNewResults(initial);
  }, [selectedClass]);

  const handleResultChange = (student, category, value) => {
    setNewResults((prev) => ({
      ...prev,
      [student]: {
        ...prev[student],
        [category]: value,
      },
    }));
  };

  const handleSaveResults = () => {
    const updated = { ...results, [selectedClass]: newResults };
    setResults(updated);
    localStorage.setItem('studentResults', JSON.stringify(updated));
  };



  const openSyllabusModal = (cls) => {
    if (uploadedSyllabus[cls]) {
      setActiveSyllabusClass(cls);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveSyllabusClass('');
  };

  const openTimetableModal = (cls) => {
    setModalClass(cls);
    setModalOpen(true);
  };

  const closeModal1 = () => {
    setModalOpen(false);
    setModalClass('');
  };

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/syllabus/${selectedClass}`);
        const data = await res.json();
        if (res.ok) {
          setUploadedSyllabus(prev => ({ ...prev, [selectedClass]: { url: data.syllabusURL } }));
        }
      } catch (err) {
        console.error("Fetch syllabus error", err);
      }
    };

    const fetchTimetable = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/timetable/${selectedClass}`);
        const data = await res.json();
        if (res.ok) {
          setUploadedTimetables(prev => ({ ...prev, [selectedClass]: data.entries }));
        }
      } catch (err) {
        console.error("Fetch timetable error", err);
      }
    };

    fetchSyllabus();
    fetchTimetable();
  }, [selectedClass]);



  const renderTabContent = () => {
    switch (activeTab) {
      case 'Subject':
        return (
          <div className="overflow-x-auto bg-gray-900 p-4 rounded shadow">
            <table className="table-auto w-full text-sm text-left">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2">SubjectCode</th>
                  <th className="px-4 py-2">SubjectName</th>
                  <th className="px-4 py-2">Assigned Teacher</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Max Marks</th>
                </tr>
              </thead>
              <tbody>
                {academicData.map((subject) => (
                  <tr key={subject.code} className="border-b border-gray-700">
                    <td className="px-4 py-2">{subject.code}</td>
                    <td className="px-4 py-2">{subject.name}</td>
                    <td className="px-4 py-2">{subject.teacher}</td>
                    <td className="px-4 py-2">{subject.type}</td>
                    <td className="px-4 py-2">{subject.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'Classes':
        return (
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">Assign Class Teacher</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  className="p-2 bg-gray-900 text-white rounded"
                  value={newTeacher.class}
                  onChange={(e) => setNewTeacher({ ...newTeacher, class: e.target.value })}
                >
                  <option value="">Select Class</option>
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>Class {cls}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Teacher Name"
                  className="p-2 bg-gray-900 text-white rounded"
                  value={newTeacher.teacher}
                  onChange={(e) => setNewTeacher({ ...newTeacher, teacher: e.target.value })}
                />
                <button
                  onClick={handleAssignTeacher}
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                  Assign
                </button>
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded">
              <h3 className="text-lg font-semibold mb-3">Classes & Class Teachers</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classOptions.map((cls) => (
                  <li key={cls} className="bg-gray-800 p-4 rounded">
                    <strong>Class {cls}</strong><br />
                    Teacher: {assignedTeachers[cls] || 'Not Assigned'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'Syllabus':
        return (
          <div className="bg-gray-900 p-4 rounded relative">
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-3 text-black text-xl font-bold hover:text-red-600"
                  >
                    &times;
                  </button>
                  <h4 className="text-lg font-semibold text-black mb-4">Class {activeSyllabusClass} Syllabus</h4>
                  <iframe
                    src={uploadedSyllabus[activeSyllabusClass]?.url}
                    title="Syllabus PDF"
                    className="w-full h-[500px] border rounded"
                  />
                </div>
              </div>
            )}
            <h3 className="text-lg font-semibold mb-4">Upload Syllabus PDF for Class {selectedClass}</h3>
            <input
              type="file"
              onChange={(e) => setSyllabusFile(e.target.files[0])}
              accept="application/pdf"
              className="mb-2"
            />
            <button
              onClick={handleSyllabusUpload}
              className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
            >
              Upload
            </button>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Syllabus Upload Status</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {classOptions.map((cls) => (
                  <div
                    key={cls}
                    className="bg-gray-800 p-4 rounded text-center cursor-pointer hover:bg-gray-700"
                    onClick={() => openSyllabusModal(cls)}
                  >
                    <h5 className="font-bold mb-2">Class {cls}</h5>
                    {uploadedSyllabus[cls] ? (
                      <span className="text-green-400 underline">View Syllabus</span>
                    ) : (
                      <span className="text-gray-400">Not Uploaded</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Time-Table':
        return (
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">Enter Time-Table for Class {selectedClass}</h3>
            {newTimetableEntries.map((entry, dayIdx) => (
              <div key={entry.day} className="mb-4">
                <h4 className="mb-2 font-semibold">{entry.day}</h4>
                <div className="grid grid-cols-6 gap-2">
                  {entry.periods.map((period, periodIdx) => (
                    <input
                      key={periodIdx}
                      type="text"
                      placeholder={`P${periodIdx + 1}`}
                      value={period}
                      onChange={(e) => handleTimetableInput(dayIdx, periodIdx, e.target.value)}
                      className="p-2 rounded bg-gray-800 text-white"
                    />
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleTimetableSubmit} className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700">Save Time-Table</button>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Class-wise Time-Table View</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {classOptions.map((cls) => (
                  <div
                    key={cls}
                    onClick={() => openTimetableModal(cls)}
                    className="bg-gray-800 p-4 rounded text-center cursor-pointer hover:bg-gray-700"
                  >
                    <h5 className="font-bold mb-2">Class {cls}</h5>
                    {uploadedTimetables[cls] ? (
                      <div className="space-y-1">
                        <span
                          className="text-green-400 underline block cursor-pointer"
                          onClick={() => openTimetableModal(cls)}
                        >
                          View Time-Table
                        </span>
                        <button
                          onClick={() => handleDeleteTimetable(cls)}
                          className="text-red-400 text-sm hover:text-red-500 underline"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not Uploaded</span>
                    )}

                  </div>
                ))}
              </div>
            </div>

            {modalOpen && uploadedTimetables[modalClass] && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="bg-white text-black rounded p-6 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 relative">
                  <button
                    onClick={closeModal1}
                    className="absolute top-2 right-3 text-black text-xl font-bold hover:text-red-600"
                  >
                    &times;
                  </button>
                  <h4 className="text-lg font-bold mb-4">Time-Table for Class {modalClass}</h4>
                  <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-2 py-1 border">Day</th>
                        {[...Array(6)].map((_, idx) => (
                          <th key={idx} className="px-2 py-1 border">P{idx + 1}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {uploadedTimetables[modalClass].map((row, i) => (
                        <tr key={i}>
                          <td className="px-2 py-1 border font-semibold">{row.day}</td>
                          {row.periods.map((p, idx) => (
                            <td key={idx} className="px-2 py-1 border">{p}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

        );
      case 'Result':
        return (
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">Post Results for Class {selectedClass}</h3>
            {(sampleStudents[selectedClass] || []).map((student) => (
              <div key={student} className="mb-4">
                <h4 className="text-md font-bold mb-2">{student}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {resultCategories.map((cat) => (
                    <input
                      key={cat}
                      type="text"
                      placeholder={`${cat} Marks`}
                      className="p-2 bg-gray-800 text-white rounded"
                      value={newResults[student]?.[cat] || ''}
                      onChange={(e) => handleResultChange(student, cat, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleSaveResults}
              className="mt-4 bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
            >
              Save Results
            </button>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Result Preview</h4>
              {(results[selectedClass] && Object.entries(results[selectedClass]).length) ? (
                <div className="space-y-4">
                  {Object.entries(results[selectedClass]).map(([student, res]) => (
                    <div key={student} className="bg-gray-800 p-4 rounded">
                      <h5 className="font-bold mb-2">{student}</h5>
                      <ul>
                        {resultCategories.map((cat) => (
                          <li key={cat} className="text-gray-300">{cat}: {res[cat]}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No results posted for this class.</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#0f172a] to-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">

        <Header />


        {/* Header */}
        <div className="flex flex-col mt-10 lg:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl font-bold mb-4 lg:mb-0 text-white">Academics</h2>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-gray-900 text-white px-3 py-2 rounded border border-gray-700 shadow"
          >
            <option value="">Select Class</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>Class {cls}</option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full transition duration-200 text-sm font-semibold shadow-lg ${activeTab === tab ? 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="rounded-xl p-4 bg-gray-900/80 shadow-lg">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminAcademics;




