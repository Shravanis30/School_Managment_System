
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';

// const AdminTeachers = () => {
//   const [teachers, setTeachers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const fetchTeachers = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teachers/list`, {
//         withCredentials: true, // ✅ Send cookies (accessToken)
//       });
//       setTeachers(res.data);
//     } catch (err) {
//       console.error('Error fetching teachers:', err.message);
//       if (err.response?.status === 401) {
//         alert('Session expired. Please log in again.');
//         navigate('/login/admin');
//       } else {
//         alert('Failed to fetch teachers');
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this teacher?');
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/teachers/${id}`, {
//         withCredentials: true, // ✅ Protected route, send cookie
//       });
//       alert('Teacher deleted successfully');
//       fetchTeachers(); // Refresh list
//     } catch (err) {
//       console.error('Error deleting teacher:', err.message);
//       alert('Failed to delete teacher');
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
//       <Sidebar role="admin" />
//       <div className="flex-1 p-6">
//         <Header />
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold mb-2 md:mb-0">All Teachers</h2>
//           <button
//             onClick={() => navigate('/register/teacher')}
//             className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded shadow-lg"
//           >
//             + Register Teacher
//           </button>
//         </div>

//         {/* Teachers Table */}
//         <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/10 overflow-x-auto">
//           <table className="w-full text-left text-white">
//             <thead className="bg-white/10 border-b border-white/10">
//               <tr>
//                 <th className="p-3">#</th>
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Subject(s)</th>
//                 <th className="p-3">Class Teacher Of</th>
//                 <th className="p-3">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {teachers.map((t, i) => (
//                 <tr key={t._id} className="border-t border-white/10 hover:bg-white/5">
//                   <td className="p-3">{i + 1}</td>
//                   <td className="p-3">{t.fullName || t.name}</td>
//                   <td className="p-3">{t.subjects?.join(', ') || '-'}</td>
//                   <td className="p-3">{t.classTeacherOf || '-'}</td>
//                   <td className="p-3">
//                     <button
//                       onClick={() => handleDelete(t._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm shadow"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {teachers.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center py-6 text-gray-300">
//                     No teachers found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminTeachers;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    employeeId: '',
    email: '',
    password: '',
    classTeacherOf: '',
    subjects: [],
    profileImage: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teachers/list`, {
        withCredentials: true,
      });
      setTeachers(res.data);
    } catch (err) {
      console.error('Error fetching teachers:', err.message);
      if (err.response?.status === 401) {
        alert('Session expired. Please log in again.');
      } else {
        alert('Failed to fetch teachers');
      }
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, {
        withCredentials: true,
      });
      setClasses(res.data);
    } catch (err) {
      console.error('Failed to fetch classes:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this teacher?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/teachers/${id}`, {
        withCredentials: true,
      });
      alert('Teacher deleted successfully');
      fetchTeachers();
    } catch (err) {
      console.error('Error deleting teacher:', err.message);
      alert('Failed to delete teacher');
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    setRegisterError('');
  };

  const handleClassTeacherChange = (e) => {
    const value = e.target.value;
    setRegisterForm(prev => ({ 
      ...prev, 
      classTeacherOf: value,
      subjects: [] 
    }));
    
    const selectedClass = classes.find(cls => cls.name === value);
    setAvailableSubjects(selectedClass?.subjects || []);
  };

  const toggleSubject = (subject) => {
    const updatedSubjects = registerForm.subjects.includes(subject)
      ? registerForm.subjects.filter(sub => sub !== subject)
      : [...registerForm.subjects, subject];
    
    setRegisterForm(prev => ({ ...prev, subjects: updatedSubjects }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/teachers/create`,
        registerForm,
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        alert('Teacher registered successfully');
        setRegisterForm({
          fullName: '',
          employeeId: '',
          email: '',
          password: '',
          classTeacherOf: '',
          subjects: [],
          profileImage: '',
        });
        setShowRegisterModal(false);
        fetchTeachers();
      }
    } catch (err) {
      console.error('Teacher registration error:', err);
      setRegisterError(
        err.response?.data?.message || 
        'Teacher registration failed. Please try again.'
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header />
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-2 md:mb-0">All Teachers</h2>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded shadow-lg"
          >
            + Register Teacher
          </button>
        </div>

        {/* Teachers Table */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/10 overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead className="bg-white/10 border-b border-white/10">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Subject(s)</th>
                <th className="p-3">Class Teacher Of</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, i) => (
                <tr key={t._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{t.fullName || t.name}</td>
                  <td className="p-3">{t.subjects?.join(', ') || '-'}</td>
                  <td className="p-3">{t.classTeacherOf || '-'}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {teachers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-300">
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl border border-white/10">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Register New Teacher</h2>
                <button 
                  onClick={() => setShowRegisterModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {registerError && (
                  <div className="bg-red-500/20 text-red-300 p-3 rounded-md">
                    {registerError}
                  </div>
                )}
                
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={registerForm.fullName}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                <input
                  type="text"
                  name="employeeId"
                  placeholder="Employee ID *"
                  value={registerForm.employeeId}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password *"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <input
                  type="text"
                  name="profileImage"
                  placeholder="Profile image URL (optional)"
                  value={registerForm.profileImage}
                  onChange={handleRegisterChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                <select
                  name="classTeacherOf"
                  value={registerForm.classTeacherOf}
                  onChange={handleClassTeacherChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">-- Select Class (Optional) --</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls.name}>{cls.name}</option>
                  ))}
                </select>

                {availableSubjects.length > 0 && (
                  <div>
                    <label className="block text-gray-300 font-medium mb-1">
                      Assign Subjects *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableSubjects.map((subject, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => toggleSubject(subject)}
                          className={`px-3 py-1.5 rounded text-sm ${
                            registerForm.subjects.includes(subject)
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded font-medium transition"
                  >
                    Register Teacher
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTeachers;