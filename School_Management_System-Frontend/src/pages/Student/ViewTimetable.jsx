// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';

// const ViewTimetable = () => {
//   const [studentClass, setStudentClass] = useState('');
//   const [timetable, setTimetable] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeDay, setActiveDay] = useState(null);

//   // Fetch student class
//   useEffect(() => {
//     const fetchStudentClass = async () => {
//       try {
//         setLoading(true);
//         setError('');
//         const studentRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/students/me`, {
//           credentials: 'include',
//         });

//         if (!studentRes.ok) {
//           const text = await studentRes.text();
//           throw new Error(`Failed to fetch student data: ${text}`);
//         }

//         const student = await studentRes.json();
//         setStudentClass(student.className);
//       } catch (error) {
//         console.error('Error fetching student class:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentClass();
//   }, []);

//   // Fetch timetable when student class is available
//   useEffect(() => {
//     const fetchStudentTimetable = async () => {
//       try {
//         if (!studentClass) return;
        
//         setLoading(true);
//         setError('');
        
//         // Normalize class name by removing "Class " prefix
//         const normalizedClass = studentClass.replace(/^Class\s*/i, '');
        
//         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/timetable/${normalizedClass}`, {
//           credentials: 'include',
//         });

//         if (response.status === 404) {
//           throw new Error('Timetable not found for this class');
//         }

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || 'Timetable request failed');
//         }

//         const data = await response.json();
//         setTimetable(data.entries || []);
//         // Set the first day as active by default
//         if (data.entries?.length > 0) {
//           setActiveDay(data.entries[0].day);
//         }
//       } catch (error) {
//         console.error('Error fetching timetable:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentTimetable();
//   }, [studentClass]);

//   // Get the active day's schedule
//   const activeDaySchedule = timetable.find(entry => entry.day === activeDay)?.periods || [];

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="student" />
//       <div className="flex flex-col w-full">
//         <div className="p-6">
//           <Header />
          
//           <div className="max-w-6xl mx-auto">
//             <div className="flex justify-between items-center mb-8">
//               <div>
//                 <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//                   Class Timetable
//                 </h1>
//                 {studentClass && (
//                   <p className="text-blue-300 mt-1 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//                     </svg>
//                     Viewing schedule for {studentClass}
//                   </p>
//                 )}
//               </div>
//               <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
//             </div>

//             {loading ? (
//               <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 animate-pulse">
//                 <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
//                 <div className="grid grid-cols-7 gap-2 mb-6">
//                   {[...Array(7)].map((_, i) => (
//                     <div key={i} className="h-10 bg-gray-700 rounded"></div>
//                   ))}
//                 </div>
//                 <div className="grid grid-cols-6 gap-4">
//                   {[...Array(6)].map((_, i) => (
//                     <div key={i} className="space-y-3">
//                       <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto"></div>
//                       <div className="h-24 bg-gray-800 rounded-lg"></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : error ? (
//               <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 flex flex-col items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <h2 className="text-xl font-bold mb-2">Couldn't Load Timetable</h2>
//                 <p className="text-red-300 mb-4">{error}</p>
//                 <button 
//                   onClick={() => window.location.reload()}
//                   className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             ) : timetable.length === 0 ? (
//               <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 flex flex-col items-center text-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//                 </svg>
//                 <h2 className="text-xl font-bold mb-2">No Timetable Available</h2>
//                 <p className="text-gray-400 max-w-md">
//                   The timetable for {studentClass} hasn't been published yet. 
//                   Please check back later or contact your class coordinator.
//                 </p>
//               </div>
//             ) : (
//               <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-xl">
//                 {/* Day Navigation */}
//                 <div className="grid grid-cols-7 border-b border-white/10">
//                   {timetable.map((entry) => (
//                     <button
//                       key={entry.day}
//                       onClick={() => setActiveDay(entry.day)}
//                       className={`py-4 px-2 text-center transition-all duration-200 ${
//                         activeDay === entry.day
//                           ? 'bg-gradient-to-b from-blue-600 to-purple-600 text-white font-bold'
//                           : 'hover:bg-white/10'
//                       }`}
//                     >
//                       {entry.day}
//                     </button>
//                   ))}
//                 </div>
                
//                 {/* Timetable Display */}
//                 <div className="p-6">
//                   <div className="mb-4 flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//                     </svg>
//                     <h2 className="text-xl font-bold text-blue-300">{activeDay}'s Schedule</h2>
//                   </div>
                  
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//                     {activeDaySchedule.map((subject, index) => (
//                       <div 
//                         key={index} 
//                         className={`bg-gradient-to-br rounded-xl p-4 border border-white/10 shadow-lg transition-transform duration-300 hover:scale-[1.03] ${
//                           subject === 'Free' || !subject
//                             ? 'from-gray-800 to-gray-900'
//                             : index % 3 === 0 
//                               ? 'from-blue-800/60 to-blue-900/60' 
//                               : index % 3 === 1 
//                                 ? 'from-purple-800/60 to-purple-900/60' 
//                                 : 'from-indigo-800/60 to-indigo-900/60'
//                         }`}
//                       >
//                         <div className="text-center">
//                           <div className="text-xs text-gray-400 mb-1">Period {index + 1}</div>
//                           <div className="text-lg font-bold mb-2">
//                             {subject || 'Free Period'}
//                           </div>
//                           <div className="text-xs text-gray-400">
//                             {index === 0 
//                               ? '8:00 - 8:45' 
//                               : index === 1 
//                                 ? '8:45 - 9:30' 
//                                 : index === 2 
//                                   ? '9:30 - 10:15' 
//                                   : index === 3 
//                                     ? '10:45 - 11:30' 
//                                     : index === 4 
//                                       ? '11:30 - 12:15' 
//                                       : '1:00 - 1:45'}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Full Timetable Table (Hidden on small screens) */}
//                 <div className="hidden lg:block border-t border-white/10">
//                   <div className="p-4 bg-gray-900/30">
//                     <h3 className="text-lg font-semibold mb-3 text-blue-300">Weekly Overview</h3>
//                   </div>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full">
//                       <thead>
//                         <tr className="bg-gray-800/60">
//                           <th className="p-3 text-left text-blue-300">Day/Period</th>
//                           {[...Array(6)].map((_, i) => (
//                             <th key={i} className="p-3 text-center">Period {i + 1}</th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {timetable.map((entry, i) => (
//                           <tr 
//                             key={i} 
//                             className={`border-b border-white/10 ${entry.day === activeDay ? 'bg-blue-900/20' : ''}`}
//                           >
//                             <td className="p-3 font-medium">{entry.day}</td>
//                             {entry.periods.map((p, idx) => (
//                               <td 
//                                 key={idx} 
//                                 className={`p-3 text-center ${
//                                   p === 'Free' || !p 
//                                     ? 'text-gray-500' 
//                                     : 'font-medium'
//                                 }`}
//                               >
//                                 {p || 'Free'}
//                               </td>
//                             ))}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Download/Print Button */}
//             {!loading && timetable.length > 0 && (
//               <div className="mt-6 flex justify-end">
//                 <button className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                   </svg>
//                   Download Timetable
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewTimetable;

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const ViewTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeDay, setActiveDay] = useState(null);
  const [className, setClassName] = useState('');

  // Fetch student class
  useEffect(() => {
    const fetchStudentClass = async () => {
      try {
        setLoading(true);
        setError('');
        const studentRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/students/me`, {
          credentials: 'include',
        });

        if (!studentRes.ok) {
          const text = await studentRes.text();
          throw new Error(`Failed to fetch student data: ${text}`);
        }

        const student = await studentRes.json();
        setClassName(student.className);
        return student.className;
      } catch (error) {
        console.error('Error fetching student class:', error);
        setError(error.message);
        return null;
      }
    };

    // Fetch timetable when student class is available
    const fetchStudentTimetable = async () => {
      try {
        const studentClass = await fetchStudentClass();
        if (!studentClass) return;
        
        setLoading(true);
        setError('');
        
        // Normalize class name by removing "Class " prefix
        const normalizedClass = studentClass.replace(/^Class\s*/i, '');
        
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/timetable/${normalizedClass}`, {
          credentials: 'include',
        });

        if (response.status === 404) {
          throw new Error('Timetable not found for this class');
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Timetable request failed');
        }

        const data = await response.json();
        setTimetable(data.entries || []);
        // Set the first day as active by default
        if (data.entries?.length > 0) {
          setActiveDay(data.entries[0].day);
        }
      } catch (error) {
        console.error('Error fetching timetable:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentTimetable();
  }, []);

  // Get the active day's schedule
  const activeDaySchedule = timetable.find(entry => entry.day === activeDay)?.periods || [];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="student" />
      <div className="flex flex-col w-full">
        <div className="p-6">
          <Header />
          
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Class Timetable
                </h1>
                {className && (
                  <p className="text-blue-300 mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Viewing schedule for {className}
                  </p>
                )}
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>

            {loading ? (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-1/4 mb-6"></div>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-700 rounded"></div>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-3">
                      <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto"></div>
                      <div className="h-24 bg-gray-800 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold mb-2">Couldn't Load Timetable</h2>
                <p className="text-red-300 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all"
                >
                  Try Again
                </button>
              </div>
            ) : timetable.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 flex flex-col items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <h2 className="text-xl font-bold mb-2">No Timetable Available</h2>
                <p className="text-gray-400 max-w-md">
                  The timetable for {className} hasn't been published yet. 
                  Please check back later or contact your class coordinator.
                </p>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-xl">
                {/* Day Navigation */}
                <div className="grid grid-cols-7 border-b border-white/10">
                  {timetable.map((entry) => (
                    <button
                      key={entry.day}
                      onClick={() => setActiveDay(entry.day)}
                      className={`py-4 px-2 text-center transition-all duration-200 ${
                        activeDay === entry.day
                          ? 'bg-gradient-to-b from-blue-600 to-purple-600 text-white font-bold'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      {entry.day}
                    </button>
                  ))}
                </div>
                
                {/* Timetable Display */}
                <div className="p-6">
                  <div className="mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-xl font-bold text-blue-300">{activeDay}'s Schedule</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {activeDaySchedule.map((subject, index) => (
                      <div 
                        key={index} 
                        className={`bg-gradient-to-br rounded-xl p-4 border border-white/10 shadow-lg transition-transform duration-300 hover:scale-[1.03] ${
                          subject === 'Free' || !subject
                            ? 'from-gray-800 to-gray-900'
                            : index % 3 === 0 
                              ? 'from-blue-800/60 to-blue-900/60' 
                              : index % 3 === 1 
                                ? 'from-purple-800/60 to-purple-900/60' 
                                : 'from-indigo-800/60 to-indigo-900/60'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-xs text-gray-400 mb-1">Period {index + 1}</div>
                          <div className="text-lg font-bold mb-2">
                            {subject || 'Free Period'}
                          </div>
                          <div className="text-xs text-gray-400">
                            {index === 0 
                              ? '8:00 - 8:45' 
                              : index === 1 
                                ? '8:45 - 9:30' 
                                : index === 2 
                                  ? '9:30 - 10:15' 
                                  : index === 3 
                                    ? '10:45 - 11:30' 
                                    : index === 4 
                                      ? '11:30 - 12:15' 
                                      : '1:00 - 1:45'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Full Timetable Table (Hidden on small screens) */}
                <div className="hidden lg:block border-t border-white/10">
                  <div className="p-4 bg-gray-900/30">
                    <h3 className="text-lg font-semibold mb-3 text-blue-300">Weekly Overview</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-800/60">
                          <th className="p-3 text-left text-blue-300">Day/Period</th>
                          {[...Array(6)].map((_, i) => (
                            <th key={i} className="p-3 text-center">Period {i + 1}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {timetable.map((entry, i) => (
                          <tr 
                            key={i} 
                            className={`border-b border-white/10 ${entry.day === activeDay ? 'bg-blue-900/20' : ''}`}
                          >
                            <td className="p-3 font-medium">{entry.day}</td>
                            {entry.periods.map((p, idx) => (
                              <td 
                                key={idx} 
                                className={`p-3 text-center ${
                                  p === 'Free' || !p 
                                    ? 'text-gray-500' 
                                    : 'font-medium'
                                }`}
                              >
                                {p || 'Free'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Download/Print Button */}
            {!loading && timetable.length > 0 && (
              <div className="mt-6 flex justify-end">
                <button className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Timetable
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTimetable;