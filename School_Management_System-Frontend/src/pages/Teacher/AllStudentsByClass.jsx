// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';

// const AllStudentsByClass = () => {
//     const [studentsByClass, setStudentsByClass] = useState({});
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchStudents = async () => {
//             const token = localStorage.getItem('token');

//             try {
//                 const res = await fetch("http://localhost:5000/api/students/all", {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 const data = await res.json();
//                 setStudentsByClass(data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Failed to fetch students", err);
//             }
//         };

//         fetchStudents();
//     }, []);

//     if (loading) return <div className="text-white text-center p-10">Loading...</div>;

//     return (
//         <div className="flex bg-[#0f1117] min-h-screen text-white">
//             <Sidebar role="teacher" />
//             <div className="flex flex-col w-full">
//                 <div className="p-6 overflow-auto">
//                     <Header />

//                     <h1 className="text-2xl font-bold mb-6 text-white">Students by Class</h1>

//                     {Object.keys(studentsByClass).sort().map((className) => (
//                         <div key={className} className="mb-6 bg-[#1c1f26] rounded-lg shadow-md p-5">
//                             <h2 className="text-xl font-semibold mb-3 text-blue-400">Class {className}</h2>
//                             <ul className="divide-y divide-gray-700">
//                                 {studentsByClass[className].map((student) => (
//                                     <li key={student._id} className="py-3 flex justify-between items-center">
//                                         <div>
//                                             <p className="font-semibold text-white">{student.name}</p>
//                                             <p className="text-sm text-gray-400">{student.email}</p>
//                                         </div>
//                                         <span className="text-sm text-gray-300">Roll No: {student.rollNo}</span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllStudentsByClass;


import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AllStudentsByClass = () => {
  const [studentsByClass, setStudentsByClass] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('1st');

  const classList = [
    '1st', '2nd', '3rd', '4th', '5th',
    '6th', '7th', '8th', '9th', '10th'
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch("http://localhost:5000/api/students/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setStudentsByClass(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch students", err);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="text-white text-center p-10">Loading...</div>;

  const students = studentsByClass[selectedClass] || [];

  return (
    <div className="flex bg-[#0f1117] min-h-screen text-white">
      <Sidebar role="teacher" />
      <div className="flex flex-col m-5 w-full">
        <Header />
        
        <div className="p-6 overflow-auto">
          {/* Title and Class Dropdown */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Class {selectedClass} - Students</h1>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-[#1a1d23] text-white border border-gray-600 rounded px-4 py-2"
            >
              {classList.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          {/* Student List */}
          <div className="bg-[#1c1f26] rounded-lg shadow p-5">
            {students.length === 0 ? (
              <p className="text-gray-400">No students registered in this class.</p>
            ) : (
              <ul className="divide-y divide-gray-700">
                {students.map((student) => (
                  <li key={student._id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-white">{student.name}</p>
                      <p className="text-sm text-gray-400">{student.email}</p>
                    </div>
                    <span className="text-sm text-gray-300">Roll No: {student.rollNo}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudentsByClass;
