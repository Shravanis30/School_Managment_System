

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const StudentLeaveForm = () => {
//   const [formData, setFormData] = useState({
//     studentName: '',
//     class: '',
//     rollNo: '',
//     fromDate: '',
//     toDate: '',
//     reason: '',
//   });

//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     // Fetch available classes
//     axios.get('/api/classes', { withCredentials: true })
//       .then((res) => setClasses(res.data))
//       .catch((err) => console.error('Error fetching classes:', err));

//     // Auto-fill student details from /api/user/profile
//     axios.get('/api/user/profile', { withCredentials: true })
//       .then((res) => {
//         const student = res.data;
//         setFormData(prev => ({
//           ...prev,
//           studentName: student.name,
//           class: student.class,
//           rollNo: student.rollNo,
//         }));
//       })
//       .catch((err) => {
//         console.error('Error fetching student profile:', err);
//         alert('Please log in again');
//       });
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/leaves/submit', formData, {
//         withCredentials: true, // 🔐 send accessToken cookie
//       });
//       alert('Leave application submitted successfully!');
//       setFormData(prev => ({
//         ...prev,
//         fromDate: '',
//         toDate: '',
//         reason: '',
//       }));
//     } catch (error) {
//       console.error('Submit error:', error);
//       alert('Failed to submit leave application');
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-[#0f1117] p-6 rounded-lg text-white shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">Leave Application</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="studentName" value={formData.studentName} readOnly
//           className="w-full p-2 bg-gray-700 rounded border border-gray-500 cursor-not-allowed" />

//         <select name="class" value={formData.class} disabled
//           className="w-full p-2 bg-gray-700 rounded border border-gray-500 cursor-not-allowed">
//           <option>{formData.class}</option>
//         </select>

//         <input name="rollNo" value={formData.rollNo} readOnly
//           className="w-full p-2 bg-gray-700 rounded border border-gray-500 cursor-not-allowed" />

//         <input type="date" name="fromDate" onChange={handleChange} value={formData.fromDate} required
//           className="w-full p-2 bg-gray-800 rounded border border-gray-600" />

//         <input type="date" name="toDate" onChange={handleChange} value={formData.toDate} required
//           className="w-full p-2 bg-gray-800 rounded border border-gray-600" />

//         <textarea name="reason" placeholder="Reason for Leave" onChange={handleChange} value={formData.reason} required
//           className="w-full p-2 bg-gray-800 rounded border border-gray-600" />

//         <button type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded text-white font-semibold">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StudentLeaveForm;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentLeaveForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    class: '',
    rollNo: '',
    fromDate: '',
    toDate: '',
    reason: '',
  });

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch available classes
        const classesRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, { withCredentials: true });
        setClasses(classesRes.data);

        // Auto-fill student details
        const profileRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, { withCredentials: true });
        const student = profileRes.data;

        setFormData(prev => ({
          ...prev,
          studentName: student.name,
          class: student.className || student.class,
          rollNo: student.rollNo,
        }));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load your information. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // Update the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError('');

    try {
      // Send only necessary fields
      const payload = {
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        reason: formData.reason
      };

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/leaves/submit`, payload, {
        withCredentials: true,
      });

      setSuccess(true);
      setFormData(prev => ({
        ...prev,
        fromDate: '',
        toDate: '',
        reason: '',
      }));

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Submit error:', error);
      setError(
        error.response?.data?.error ||
        error.response?.data?.details ||
        'Failed to submit leave application'
      );
    } finally {
      setSubmitting(false);
    }
  };
  // Calculate number of days between dates
  const calculateDays = () => {
    if (!formData.fromDate || !formData.toDate) return 0;

    const from = new Date(formData.fromDate);
    const to = new Date(formData.toDate);
    const diffTime = Math.abs(to - from);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl overflow-hidden">
        <div className="p-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Leave Application
            </h2>
            <p className="mt-2 text-blue-300">Submit your leave request for approval</p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-lg text-green-300">Leave application submitted successfully!</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg text-red-300">{error}</span>
            </div>
          )}

          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-16 bg-gray-700 rounded-lg"></div>
              <div className="h-16 bg-gray-700 rounded-lg"></div>
              <div className="h-16 bg-gray-700 rounded-lg"></div>
              <div className="h-16 bg-gray-700 rounded-lg"></div>
              <div className="h-16 bg-gray-700 rounded-lg"></div>
              <div className="h-32 bg-gray-700 rounded-lg"></div>
              <div className="h-12 bg-gray-700 rounded-lg"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Info Group */}
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Student Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                    <div className="relative">
                      <input
                        name="studentName"
                        value={formData.studentName}
                        readOnly
                        className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 cursor-not-allowed"
                      />
                      <div className="absolute right-3 top-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Class</label>
                    <div className="relative">
                      <select
                        name="class"
                        value={formData.class}
                        disabled
                        className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 cursor-not-allowed appearance-none"
                      >
                        <option>{formData.class}</option>
                      </select>
                      <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Roll Number</label>
                    <div className="relative">
                      <input
                        name="rollNo"
                        value={formData.rollNo}
                        readOnly
                        className="w-full p-3 bg-gray-700/50 rounded-lg border border-gray-600 cursor-not-allowed"
                      />
                      <div className="absolute right-3 top-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leave Details Group */}
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Leave Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">From Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="fromDate"
                        onChange={handleChange}
                        value={formData.fromDate}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                      <div className="absolute right-3 top-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">To Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        name="toDate"
                        onChange={handleChange}
                        value={formData.toDate}
                        required
                        min={formData.fromDate || new Date().toISOString().split('T')[0]}
                        className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                      <div className="absolute right-3 top-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-blue-300 font-medium">Leave Duration</p>
                        <p className="text-lg">
                          {formData.fromDate && formData.toDate ? (
                            <span>
                              {calculateDays()} day{calculateDays() !== 1 ? 's' : ''}
                            </span>
                          ) : (
                            <span className="text-gray-400">Select dates to see duration</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reason Group */}
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Reason for Leave
                </h3>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Please provide details for your leave request
                  </label>
                  <textarea
                    name="reason"
                    placeholder="Explain why you need leave..."
                    onChange={handleChange}
                    value={formData.reason}
                    required
                    rows={4}
                    className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 30 characters required</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${submitting
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-xl'
                  }`}
              >
                {submitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  'Submit Leave Request'
                )}
              </button>
            </form>
          )}

          {/* Guidelines */}
          <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 text-blue-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Leave Application Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Submit leave requests at least 3 days in advance for planned absences
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                For medical leave, you'll need to submit supporting documents
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Approval may take 1-2 business days
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Check your email for application status updates
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                Contact your class coordinator for urgent requests
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLeaveForm;