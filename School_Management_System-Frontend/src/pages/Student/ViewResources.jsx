
// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import axios from 'axios';

// const ViewResources = () => {
//   const [resources, setResources] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState('');
//   const [subjects, setSubjects] = useState([]);
//   const [className, setClassName] = useState('');

//   useEffect(() => {
//     const fetchStudentAndResources = async () => {
//       try {
//         // ✅ Get student data from protected route
//         const studentRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/students/me`, {
//           withCredentials: true,
//         });

//         const studentClass = studentRes.data.className;
//         setClassName(studentClass);

//         const [resourcesRes, subjectsRes] = await Promise.all([
//           axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/resources/class/${studentClass}`),
//           axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/resources/subjects/${studentClass}`),
//         ]);

//         setResources(resourcesRes.data);
//         setSubjects(subjectsRes.data);
//       } catch (err) {
//         console.error('Failed to fetch resources or student data:', err);
//       }
//     };

//     fetchStudentAndResources();
//   }, []);

//   const filteredResources = selectedSubject
//     ? resources.filter((r) => r.subject === selectedSubject)
//     : resources;

//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <Sidebar role="student" />
//       <div className="flex-1 p-6">
//         <h2 className="text-xl font-bold mb-4">
//           My Class Resources {className && `(${className})`}
//         </h2>

//         <div className="mb-4">
//           <label className="mr-2">Filter by Subject:</label>
//           <select
//             value={selectedSubject}
//             onChange={(e) => setSelectedSubject(e.target.value)}
//             className="bg-gray-800 p-2 rounded"
//           >
//             <option value="">All</option>
//             {subjects.map((sub, idx) => (
//               <option key={idx} value={sub}>{sub}</option>
//             ))}
//           </select>
//         </div>

//         <div className="bg-gray-900 p-4 rounded space-y-3">
//           {filteredResources.length > 0 ? (
//             filteredResources.map((res, i) => (
//               <div key={res._id} className="flex justify-between items-center bg-gray-800 p-3 rounded">
//                 <div>
//                   <p className="text-sm text-gray-400">#{i + 1}</p>
//                   <p className="font-semibold">{res.subject}</p>
//                   <p className="text-sm text-gray-500">{res.title}</p>
//                 </div>
//                 <a
//                   href={`http://localhost:5000${res.fileUrl}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   Download
//                 </a>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-400">No resources uploaded for your class.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewResources;


import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import axios from 'axios';

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentAndResources = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Get student data
        const studentRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/students/me`, {
          withCredentials: true,
        });

        const studentClass = studentRes.data.className;
        setClassName(studentClass);

        // Fetch resources and subjects in parallel
        const [resourcesRes, subjectsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/resources/class/${studentClass}`, {
            withCredentials: true,
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/resources/subjects/${studentClass}`, {
            withCredentials: true,
          }),
        ]);

        setResources(resourcesRes.data);
        setSubjects(subjectsRes.data);
      } catch (err) {
        console.error('Failed to fetch resources or student data:', err);
        setError('Failed to fetch resources. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentAndResources();
  }, []);

  const filteredResources = selectedSubject
    ? resources.filter((r) => r.subject === selectedSubject)
    : resources;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="student" />
      <div className="flex-1 p-6">
        <Header />
        
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Class Resources
              </h1>
              {className && (
                <p className="text-blue-300 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Viewing resources for {className}
                </p>
              )}
            </div>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>

          {/* Subject Filter */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur">
            <div className="flex-1">
              <label className="block mb-2 font-medium">Filter by Subject:</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Subjects</option>
                {subjects.map((sub, idx) => (
                  <option key={idx} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="text-sm">
                {selectedSubject ? `Showing ${filteredResources.length} resources` : `All resources (${resources.length})`}
              </span>
            </div>
          </div>

          {/* Resource List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-10 bg-gray-700 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-bold mb-2">Couldn't Load Resources</h2>
              <p className="text-red-300 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all"
              >
                Try Again
              </button>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 flex flex-col items-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-xl font-bold mb-2">No Resources Found</h2>
              <p className="text-gray-400 max-w-md">
                {selectedSubject 
                  ? `No resources found for ${selectedSubject} in ${className}`
                  : `No resources available for ${className}. Check back later.`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((res) => (
                <div 
                  key={res._id} 
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="bg-blue-900/30 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                        {res.subject}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{res.title}</h3>
                      <p className="text-sm text-gray-400">
                        Uploaded: {new Date(res.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <a
                      href={`${import.meta.env.VITE_BACKEND_URL}${res.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Resource
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewResources;