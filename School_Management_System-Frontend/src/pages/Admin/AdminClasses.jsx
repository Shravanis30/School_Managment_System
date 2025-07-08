// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AdminClasses = () => {
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [subjects, setSubjects] = useState([]);
//   const [newSubject, setNewSubject] = useState('');
//   const [showSubjectModal, setShowSubjectModal] = useState(false);
//   const [showAddClassModal, setShowAddClassModal] = useState(false);
//   const [newClassName, setNewClassName] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAllClasses();
//   }, []);

//   const fetchAllClasses = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, { 
//         withCredentials: true 
//       });
//       setClasses(res.data);
//     } catch (err) {
//       console.error('Error fetching classes:', err.response?.data || err.message);
//       toast.error('Failed to load classes');
//     }
//   };

//   const fetchSubjects = async (id) => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes/${id}`, { 
//         withCredentials: true 
//       });
//       setSubjects(res.data.subjects || []);
//       setSelectedClass(res.data);
//       setShowSubjectModal(true);
//     } catch (err) {
//       console.error('Error fetching subjects:', err.response?.data || err.message);
//       toast.error('Failed to load subjects');
//     }
//   };

//   const handleAddSubject = async () => {
//     if (!newSubject.trim()) {
//       toast.error('Subject cannot be empty');
//       return;
//     }
    
//     if (!selectedClass?._id) return;
    
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/classes/${selectedClass._id}/subjects`,
//         { subject: newSubject.trim() },
//         { withCredentials: true }
//       );
//       setNewSubject('');
//       fetchSubjects(selectedClass._id);
//       toast.success('Subject added successfully');
//     } catch (err) {
//       console.error('Error adding subject:', err.response?.data || err.message);
//       toast.error(err.response?.data?.message || 'Failed to add subject');
//     }
//   };

//   const handleAddClass = async () => {
//     if (!newClassName.trim()) {
//       setError('Class name cannot be empty');
//       return;
//     }

//     // Check for duplicate class name
//     const duplicate = classes.some(cls => 
//       cls.name.toLowerCase() === newClassName.trim().toLowerCase()
//     );

//     if (duplicate) {
//       setError(`Class "${newClassName}" already exists`);
//       return;
//     }

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/classes`,
//         { name: newClassName.trim() },
//         { withCredentials: true }
//       );
//       setNewClassName('');
//       setError('');
//       setShowAddClassModal(false);
//       fetchAllClasses();
//       toast.success(`Class "${newClassName}" created successfully`);
//     } catch (err) {
//       console.error('Error adding class:', err.response?.data || err.message);
//       toast.error(err.response?.data?.message || 'Failed to create class');
//     }
//   };

//   const handleDeleteSubject = async (subject) => {
//     if (!selectedClass?._id || !subject) return;
    
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_BACKEND_URL}/api/classes/${selectedClass._id}/subjects/${encodeURIComponent(subject)}`,
//         { withCredentials: true }
//       );
//       fetchSubjects(selectedClass._id);
//       toast.success(`Subject "${subject}" deleted`);
//     } catch (err) {
//       console.error('Error deleting subject:', err.response?.data || err.message);
//       toast.error('Failed to delete subject');
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
//       <Sidebar role="admin" />
//       <div className="flex-1 p-4 md:p-6">
//         <Header />
//         <ToastContainer position="top-right" autoClose={3000} />

//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//             <div>
//               <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
//                 Class Management
//               </h1>
//               <p className="text-gray-400 mt-2">
//                 Create and manage classes and subjects
//               </p>
//             </div>
//             <button
//               onClick={() => setShowAddClassModal(true)}
//               className="mt-4 md:mt-0 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-5 py-3 rounded-xl shadow-lg font-semibold text-white flex items-center transition-all"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//               </svg>
//               Add New Class
//             </button>
//           </div>

//           {classes.length === 0 ? (
//             <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
//               <div className="inline-flex items-center justify-center bg-blue-900/20 p-4 rounded-full mb-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold mb-2">No Classes Created Yet</h3>
//               <p className="text-gray-400 max-w-md mx-auto mb-6">
//                 Start by adding your first class to manage subjects and assignments.
//               </p>
//               <button
//                 onClick={() => setShowAddClassModal(true)}
//                 className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-lg font-medium"
//               >
//                 Create Your First Class
//               </button>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {classes.map((cls) => (
//                 <div
//                   key={cls._id}
//                   className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md cursor-pointer group overflow-hidden relative"
//                   onClick={() => fetchSubjects(cls._id)}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                   <div className="relative z-10">
//                     <h3 className="text-xl font-bold text-white/90 flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                       </svg>
//                       {cls.name}
//                     </h3>
//                     <div className="mt-4 flex items-center">
//                       <span className="bg-blue-900/40 text-blue-300 text-xs px-2.5 py-1 rounded-full">
//                         {cls.subjects?.length || 0} subjects
//                       </span>
//                       <button 
//                         className="ml-auto text-gray-400 hover:text-white transition-colors"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           fetchSubjects(cls._id);
//                         }}
//                       >
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Subject Management Modal */}
//         {showSubjectModal && selectedClass && (
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md relative">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="text-2xl font-bold text-white">
//                     <span className="text-cyan-400">{selectedClass.name}</span> Subjects
//                   </h3>
//                   <button
//                     onClick={() => setShowSubjectModal(false)}
//                     className="text-gray-400 hover:text-white transition-colors"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>

//                 <div className="mb-6">
//                   <div className="flex gap-2 mb-4">
//                     <input
//                       type="text"
//                       placeholder="Add new subject"
//                       value={newSubject}
//                       onChange={(e) => setNewSubject(e.target.value)}
//                       className="p-3 bg-gray-700 border border-gray-600 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                       onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
//                     />
//                     <button
//                       onClick={handleAddSubject}
//                       className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 rounded-lg font-medium flex items-center transition-all"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </div>

//                   {subjects.length > 0 ? (
//                     <div className="max-h-60 overflow-y-auto pr-2">
//                       <ul className="space-y-2">
//                         {subjects.map((sub, idx) => (
//                           <li 
//                             key={idx} 
//                             className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg hover:bg-gray-700 transition-colors"
//                           >
//                             <span className="font-medium">{sub}</span>
//                             <button 
//                               onClick={() => handleDeleteSubject(sub)}
//                               className="text-red-400 hover:text-red-300 transition-colors"
//                             >
//                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                               </svg>
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ) : (
//                     <div className="text-center py-6 text-gray-400">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                       </svg>
//                       No subjects added yet
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     onClick={() => setShowSubjectModal(false)}
//                     className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Add Class Modal */}
//         {showAddClassModal && (
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md relative">
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="text-2xl font-bold text-white">Add New Class</h3>
//                   <button
//                     onClick={() => {
//                       setShowAddClassModal(false);
//                       setError('');
//                     }}
//                     className="text-gray-400 hover:text-white transition-colors"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>

//                 <div className="mb-6">
//                   <label className="block text-gray-300 mb-2">Class Name</label>
//                   <input
//                     type="text"
//                     placeholder="Enter class name (e.g., Class 10)"
//                     value={newClassName}
//                     onChange={(e) => {
//                       setNewClassName(e.target.value);
//                       setError('');
//                     }}
//                     className="p-3 bg-gray-700 border border-gray-600 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                     onKeyPress={(e) => e.key === 'Enter' && handleAddClass()}
//                   />
//                   {error && (
//                     <p className="text-red-400 mt-2 flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       {error}
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex justify-end space-x-3">
//                   <button
//                     onClick={() => {
//                       setShowAddClassModal(false);
//                       setError('');
//                     }}
//                     className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleAddClass}
//                     className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-2 rounded-lg font-medium transition-all"
//                   >
//                     Create Class
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminClasses;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminClasses = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [newClassName, setNewClassName] = useState('');
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchAllClasses();
  }, []);

  const fetchAllClasses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, { 
        withCredentials: true 
      });
      setClasses(res.data);
    } catch (err) {
      console.error('Error fetching classes:', err.response?.data || err.message);
      toast.error('Failed to load classes');
    }
  };

  const fetchSubjects = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes/${id}`, { 
        withCredentials: true 
      });
      setSubjects(res.data.subjects || []);
      setSelectedClass(res.data);
      setShowSubjectModal(true);
    } catch (err) {
      console.error('Error fetching subjects:', err.response?.data || err.message);
      toast.error('Failed to load subjects');
    }
  };

  const handleAddSubject = async () => {
    if (!newSubject.trim()) {
      toast.error('Subject cannot be empty');
      return;
    }
    
    if (!selectedClass?._id) return;
    
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/classes/${selectedClass._id}/subjects`,
        { subject: newSubject.trim() },
        { withCredentials: true }
      );
      setNewSubject('');
      fetchSubjects(selectedClass._id);
      toast.success('Subject added successfully');
    } catch (err) {
      console.error('Error adding subject:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to add subject');
    }
  };

  const handleAddClass = async () => {
    if (!newClassName.trim()) {
      setError('Class name cannot be empty');
      return;
    }

    // Check for duplicate class name
    const duplicate = classes.some(cls => 
      cls.name.toLowerCase() === newClassName.trim().toLowerCase()
    );

    if (duplicate) {
      setError(`Class "${newClassName}" already exists`);
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/classes`,
        { name: newClassName.trim() },
        { withCredentials: true }
      );
      setNewClassName('');
      setError('');
      setShowAddClassModal(false);
      fetchAllClasses();
      toast.success(`Class "${newClassName}" created successfully`);
    } catch (err) {
      console.error('Error adding class:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to create class');
    }
  };

  const handleDeleteSubject = async (subject) => {
    if (!selectedClass?._id || !subject) return;
    
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/classes/${selectedClass._id}/subjects/${encodeURIComponent(subject)}`,
        { withCredentials: true }
      );
      fetchSubjects(selectedClass._id);
      toast.success(`Subject "${subject}" deleted`);
    } catch (err) {
      console.error('Error deleting subject:', err.response?.data || err.message);
      toast.error('Failed to delete subject');
    }
  };

  // Handle class deletion
  const handleDeleteClass = async () => {
    if (!classToDelete) return;
    
    try {
      setIsDeleting(true);
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/classes/${classToDelete._id}`,
        { withCredentials: true }
      );
      
      toast.success(`Class "${classToDelete.name}" deleted successfully`);
      fetchAllClasses();
      setShowDeleteModal(false);
      setClassToDelete(null);
    } catch (err) {
      console.error('Error deleting class:', err.response?.data || err.message);
      toast.error('Failed to delete class');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-4 md:p-6">
        <Header />
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Class Management
              </h1>
              <p className="text-gray-400 mt-2">
                Create and manage classes and subjects
              </p>
            </div>
            <button
              onClick={() => setShowAddClassModal(true)}
              className="mt-4 md:mt-0 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-5 py-3 rounded-xl shadow-lg font-semibold text-white flex items-center transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Add New Class
            </button>
          </div>

          {classes.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center bg-blue-900/20 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No Classes Created Yet</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                Start by adding your first class to manage subjects and assignments.
              </p>
              <button
                onClick={() => setShowAddClassModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-lg font-medium"
              >
                Create Your First Class
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {classes.map((cls) => (
                <div
                  key={cls._id}
                  className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md cursor-pointer group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          fetchSubjects(cls._id);
                        }}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                        title="Edit Subjects"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setClassToDelete(cls);
                          setShowDeleteModal(true);
                        }}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete Class"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white/90 flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {cls.name}
                    </h3>
                    <div className="mt-4 flex items-center">
                      <span className="bg-blue-900/40 text-blue-300 text-xs px-2.5 py-1 rounded-full">
                        {cls.subjects?.length || 0} subjects
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subject Management Modal */}
        {showSubjectModal && selectedClass && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md relative">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    <span className="text-cyan-400">{selectedClass.name}</span> Subjects
                  </h3>
                  <button
                    onClick={() => setShowSubjectModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Add new subject"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="p-3 bg-gray-700 border border-gray-600 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
                    />
                    <button
                      onClick={handleAddSubject}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 rounded-lg font-medium flex items-center transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {subjects.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto pr-2">
                      <ul className="space-y-2">
                        {subjects.map((sub, idx) => (
                          <li 
                            key={idx} 
                            className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            <span className="font-medium">{sub}</span>
                            <button 
                              onClick={() => handleDeleteSubject(sub)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      No subjects added yet
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setShowSubjectModal(false)}
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Class Modal */}
        {showAddClassModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md relative">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Add New Class</h3>
                  <button
                    onClick={() => {
                      setShowAddClassModal(false);
                      setError('');
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Class Name</label>
                  <input
                    type="text"
                    placeholder="Enter class name (e.g., Class 10)"
                    value={newClassName}
                    onChange={(e) => {
                      setNewClassName(e.target.value);
                      setError('');
                    }}
                    className="p-3 bg-gray-700 border border-gray-600 rounded-lg w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddClass()}
                  />
                  {error && (
                    <p className="text-red-400 mt-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowAddClassModal(false);
                      setError('');
                    }}
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddClass}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-2 rounded-lg font-medium transition-all"
                  >
                    Create Class
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Class Confirmation Modal */}
        {showDeleteModal && classToDelete && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-2xl shadow-2xl w-full max-w-md relative">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-red-400">Confirm Deletion</h3>
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setClassToDelete(null);
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-gray-300 mb-4">
                    Are you sure you want to delete the class <span className="font-bold text-white">"{classToDelete.name}"</span>?
                  </p>
                  <p className="text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    This action cannot be undone. All subjects and related data will be permanently deleted.
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setClassToDelete(null);
                    }}
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition-colors"
                    disabled={isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteClass}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                      isDeleting 
                        ? 'bg-gray-700 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500'
                    }`}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      'Delete Class'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClasses;