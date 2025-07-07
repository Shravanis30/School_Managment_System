// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';
// import axios from 'axios';

// const AllStudentsByClass = () => {
//   const [students, setStudents] = useState([]);
//   const [classOptions, setClassOptions] = useState([]);
//   const [selectedClass, setSelectedClass] = useState('');

//   useEffect(() => {
//     fetchClassOptions();
//   }, []);

//   useEffect(() => {
//     if (selectedClass) fetchStudentsByClass(selectedClass);
//   }, [selectedClass]);

//   const fetchClassOptions = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, { withCredentials: true });
//       setClassOptions(res.data);
//     } catch (err) {
//       console.error('Error fetching class options:', err.message);
//     }
//   };

//   const fetchStudentsByClass = async (className) => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/students/by-class-name/${className}`, {
//         withCredentials: true,
//       });
//       setStudents(res.data);
//     } catch (err) {
//       console.error('Error fetching students:', err.message);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="teacher" />
//       <div className="flex-1 p-6 flex flex-col gap-8">
//         <Header />

//         <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-md">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//             <h1 className="text-2xl font-semibold">Students by Class</h1>
//             <select
//               value={selectedClass}
//               onChange={(e) => setSelectedClass(e.target.value)}
//               className="bg-gray-800 text-white border border-white/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
//             >
//               <option value="">-- Select Class --</option>
//               {classOptions.map((cls) => (
//                 <option key={cls._id} value={cls.name}>
//                   {cls.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {selectedClass && students.length === 0 && (
//             <p className="text-white/70">No students found for this class.</p>
//           )}

//           {students.length > 0 && (
//             <div className="overflow-x-auto mt-4">
//               <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
//                 <thead>
//                   <tr className="bg-white/10 text-white/80">
//                     <th className="text-left px-4 py-2">Name</th>
//                     <th className="text-left px-4 py-2">Email</th>
//                     <th className="text-left px-4 py-2">Roll No</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student) => (
//                     <tr
//                       key={student._id}
//                       className="border-t border-white/10 hover:bg-white/10 transition"
//                     >
//                       <td className="px-4 py-2">{student.name}</td>
//                       <td className="px-4 py-2 text-white/70">{student.email}</td>
//                       <td className="px-4 py-2">{student.rollNo}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <p className="mt-4 text-sm text-white/60">
//                 Total Students: <span className="text-white font-medium">{students.length}</span>
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllStudentsByClass;

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import axios from 'axios';

const AllStudentsByClass = () => {
  const [students, setStudents] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClassOptions();
  }, []);

  useEffect(() => {
    if (selectedClass) fetchStudentsByClass(selectedClass);
  }, [selectedClass]);

  const fetchClassOptions = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, { 
        withCredentials: true 
      });
      setClassOptions(res.data);
    } catch (err) {
      console.error('Error fetching class options:', err.message);
      setError('Failed to load class options');
    }
  };

  const fetchStudentsByClass = async (className) => {
    setLoading(true);
    setError('');
    try {
      // Use teacher-specific endpoint
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/teacher/students-by-class/${className}`, 
        { withCredentials: true }
      );
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err.message);
      setError(err.response?.data?.message || 'Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="teacher" />
      <div className="flex-1 p-6 flex flex-col gap-8">
        <Header />

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-semibold">Students by Class</h1>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-gray-800 text-white border border-white/20 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              disabled={loading}
            >
              <option value="">-- Select Class --</option>
              {classOptions.map((cls) => (
                <option key={cls._id} value={cls.name}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}

          {!loading && selectedClass && students.length === 0 && !error && (
            <p className="text-white/70">No students found for this class.</p>
          )}

          {!loading && students.length > 0 && (
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-white/10 text-white/80">
                    <th className="text-left px-4 py-2">Name</th>
                    <th className="text-left px-4 py-2">Email</th>
                    <th className="text-left px-4 py-2">Roll No</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="border-t border-white/10 hover:bg-white/10 transition"
                    >
                      <td className="px-4 py-2">{student.name}</td>
                      <td className="px-4 py-2 text-white/70">{student.email}</td>
                      <td className="px-4 py-2">{student.rollNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm text-white/60">
                Total Students: <span className="text-white font-medium">{students.length}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllStudentsByClass;