// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';

// const StudentAssignments = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [studentClass, setStudentClass] = useState('');
//   const [selectedId, setSelectedId] = useState('');
//   const [file, setFile] = useState(null);

//   // useEffect(() => {
//   //   const fetchStudentAndAssignments = async () => {
//   //     try {
//   //       // ✅ Fetch student info using cookie-based auth
//   //       const studentRes = await fetch(`/api/students/classname/${className}`, {
//   //         credentials: 'include',
//   //       });

//   //       const student = await studentRes.json();


//   //       if (!studentRes.ok) throw new Error("Unauthorized or invalid student fetch");

//   //       // const student = await studentRes.json();
//   //       const className = student.className;

//   //       setStudentClass(className);

//   //       // ✅ Fetch assignments by class name (no token header)
//   //       const assignmentsRes = await fetch(`/api/assignments/${className}`, {
//   //         credentials: 'include', // ✅ sends cookies
//   //       });

//   //       const assignmentsData = await assignmentsRes.json();

//   //       if (Array.isArray(assignmentsData)) {
//   //         setAssignments(assignmentsData);
//   //       } else {
//   //         setAssignments([]);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching assignments:', error.message);
//   //     }
//   //   };

//   //   fetchStudentAndAssignments();
//   // }, []);

//   // useEffect(() => {
//   //   const fetchStudentAndAssignments = async () => {
//   //     try {
//   //       // ✅ Step 1: Fetch logged-in student info
//   //       const studentRes = await fetch(`/api/students/classname/${className}`, {
//   //         credentials: 'include',
//   //       });

//   //       if (!studentRes.ok) throw new Error("Unauthorized or invalid student fetch");

//   //       const student = await studentRes.json();
//   //       const className = student.className; // ✅ Now we have className
//   //       setStudentClass(className);

//   //       // ✅ Step 2: Fetch assignments using className
//   //       // const assignmentsRes = await fetch(`/api/assignments/${className}`, {
//   //       //   credentials: 'include',
//   //       // });

//   //       const assignmentsRes = await fetch(`/api/assignments/class/${className}`, {
//   //         credentials: 'include',
//   //       });

//   //       const assignmentsData = await assignmentsRes.json();

//   //       if (Array.isArray(assignmentsData)) {
//   //         setAssignments(assignmentsData);
//   //       } else {
//   //         setAssignments([]);
//   //       }
//   //     } catch (error) {
//   //       console.error('Error fetching assignments:', error.message);
//   //     }
//   //   };

//   //   fetchStudentAndAssignments();
//   // }, []);
// useEffect(() => {
//   const fetchStudentAndAssignments = async () => {
//     try {
//       // Fetch student info
//       const studentRes = await fetch('/api/students/me', {
//         credentials: 'include',
//       });

//       if (!studentRes.ok) {
//         const errorText = await studentRes.text();
//         throw new Error(`Student fetch failed: ${studentRes.status} - ${errorText}`);
//       }

//       const student = await studentRes.json();
//       console.log('Student data:', student); // Debug log
      
//       if (!student.className) {
//         throw new Error("Student data missing className property");
//       }

//       const className = student.className;
//       setStudentClass(className);

//       // Fetch assignments
//       const assignmentsRes = await fetch(`/api/assignments/class/${className}`, {
//         credentials: 'include',
//       });

//       if (!assignmentsRes.ok) {
//         const errorText = await assignmentsRes.text();
//         throw new Error(`Assignments fetch failed: ${assignmentsRes.status} - ${errorText}`);
//       }

//       const assignmentsData = await assignmentsRes.json();
//       setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
      
//     } catch (error) {
//       console.error('Error:', error.message);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   fetchStudentAndAssignments();
// }, []);

//   const handleSubmit = async () => {
//     if (!selectedId || !file) return alert('Please select assignment and file');

//     const formData = new FormData();
//     formData.append('assignmentId', selectedId);
//     formData.append('file', file);

//     try {
//       const res = await fetch('/api/assignments/submit', {
//         method: 'POST',
//         credentials: 'include', // ✅ sends cookies
//         body: formData,
//       });

//       const data = await res.json();
//       alert(data.message);
//       setSelectedId('');
//       setFile(null);
//     } catch (err) {
//       console.error("Submission failed:", err.message);
//       alert("Failed to submit assignment");
//     }
//   };

//   return (
//     <div className="flex bg-[#0f1117] text-white min-h-screen">
//       <Sidebar role="student" />
//       <div className="flex-1 p-6">
//         <Header />
//         <h2 className="text-2xl font-bold mb-4">Available Assignments for {studentClass}</h2>
//         <div className="space-y-4">
//           {assignments.length > 0 ? (
//             assignments.map((a) => (
//               <div key={a._id} className="bg-gray-800 p-4 rounded shadow">
//                 <h3 className="text-lg font-semibold">{a.title}</h3>
//                 <p className="text-sm">{a.description}</p>
//                 <p className="text-sm text-gray-400">Due: {new Date(a.dueDate).toLocaleDateString()}</p>

//                 <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
//                   <input
//                     type="file"
//                     onChange={(e) => {
//                       setSelectedId(a._id);
//                       setFile(e.target.files[0]);
//                     }}
//                     className="bg-gray-900 p-2 rounded"
//                   />
//                   <button
//                     onClick={handleSubmit}
//                     className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
//                   >
//                     Submit Assignment
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No assignments available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentAssignments;


import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [studentClass, setStudentClass] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchStudentAndAssignments = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch student info
        const studentRes = await fetch('/api/students/me', {
          credentials: 'include',
        });

        if (!studentRes.ok) {
          const errorText = await studentRes.text();
          throw new Error(`Failed to fetch student data: ${errorText}`);
        }

        const student = await studentRes.json();
        
        if (!student.className) {
          throw new Error("Student data missing className property");
        }

        const className = student.className;
        setStudentClass(className);

        // Fetch assignments
        const assignmentsRes = await fetch(`/api/assignments/class/${className}`, {
          credentials: 'include',
        });

        if (!assignmentsRes.ok) {
          const errorText = await assignmentsRes.text();
          throw new Error(`Failed to fetch assignments: ${errorText}`);
        }

        const assignmentsData = await assignmentsRes.json();
        setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
        
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentAndAssignments();
  }, []);

  const handleFileChange = (e, assignmentId) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedId(assignmentId);
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (assignmentId) => {
    if (!file) return alert('Please select a file to upload');
    
    setSubmitting(true);
    setSuccess(false);
    
    const formData = new FormData();
    formData.append('assignmentId', assignmentId);
    formData.append('file', file);

    try {
      const res = await fetch('/api/assignments/submit', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      
      setSuccess(true);
      setSelectedId('');
      setFile(null);
      setFileName('');
      
      // Reset success state after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Submission failed:", err.message);
      alert(`Failed to submit: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Function to calculate days remaining until due date
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return <span className="text-red-500">Overdue!</span>;
    if (diffDays === 0) return <span className="text-orange-400">Due today!</span>;
    if (diffDays === 1) return <span className="text-orange-400">Due tomorrow</span>;
    return <span className="text-green-400">{diffDays} days remaining</span>;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="student" />
      <div className="flex-1 p-6">
        <Header />
        
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Class Assignments
              </h1>
              {studentClass && (
                <p className="text-blue-300 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Viewing assignments for {studentClass}
                </p>
              )}
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>

          {success && (
            <div className="mb-6 p-3 bg-green-900/30 border border-green-500/50 rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-300">Assignment submitted successfully!</span>
            </div>
          )}

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-700 rounded w-1/5"></div>
                    <div className="h-10 bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-bold mb-2">Couldn't Load Assignments</h2>
              <p className="text-red-300 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all"
              >
                Try Again
              </button>
            </div>
          ) : assignments.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 flex flex-col items-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-xl font-bold mb-2">No Assignments Yet</h2>
              <p className="text-gray-400 max-w-md">
                There are currently no assignments for your class. Check back later or contact your teacher if you're expecting an assignment.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {assignments.map((assignment) => (
                <div 
                  key={assignment._id} 
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {assignment.title}
                          </h3>
                          <p className="mt-2 text-gray-300">{assignment.description}</p>
                        </div>
                        <div className="bg-blue-900/30 px-3 py-1 rounded-full text-sm font-medium">
                          {assignment.subject}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">Due:</span> 
                          <span className="ml-1">{new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {getDaysRemaining(assignment.dueDate)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-96">
                      <div className="bg-gray-800/50 border border-dashed border-gray-600 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex-1">
                            <label 
                              htmlFor={`file-upload-${assignment._id}`} 
                              className="block text-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-2 px-4 rounded-lg cursor-pointer transition-all"
                            >
                              {fileName ? "Change File" : "Select File"}
                            </label>
                            <input
                              id={`file-upload-${assignment._id}`}
                              type="file"
                              onChange={(e) => handleFileChange(e, assignment._id)}
                              className="hidden"
                            />
                            {fileName && (
                              <p className="mt-2 text-sm text-gray-300 truncate">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {fileName}
                              </p>
                            )}
                          </div>
                          
                          <button
                            onClick={() => handleSubmit(assignment._id)}
                            disabled={submitting || !file}
                            className={`py-2 px-4 rounded-lg font-medium transition-all ${
                              submitting 
                                ? 'bg-gray-700 cursor-not-allowed' 
                                : file 
                                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-lg'
                                  : 'bg-gray-700 cursor-not-allowed'
                            }`}
                          >
                            {submitting ? (
                              <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                Submit
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs text-gray-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        PDF, DOCX, and image files accepted (Max 10MB)
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Submission Guidelines */}
          {!loading && assignments.length > 0 && (
            <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="font-bold text-lg mb-4 text-blue-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Assignment Submission Guidelines
              </h2>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Submit assignments before the due date to avoid penalties
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Only PDF, DOCX, JPG, and PNG files are accepted
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  File size should not exceed 10MB
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  You can resubmit assignments before the deadline
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Contact your teacher if you encounter technical issues
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;