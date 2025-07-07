// // StudentComplaintPage.jsx
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../components/Sidebar';

// const StudentComplaintPage = () => {
//     const [formData, setFormData] = useState({
//         complaint: '',
//         priority: '',
//     });
//     const [classList, setClassList] = useState([]);

//     useEffect(() => {
//         const fetchClasses = async () => {
//             const res = await fetch('/api/classes');
//             const data = await res.json();
//             setClassList(data);
//         };
//         fetchClasses();
//     }, []);


//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await fetch('/api/complaints', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//                 credentials: 'include',
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 throw new Error(data.error || 'Failed to submit complaint');
//             }

//             alert('Complaint submitted successfully!');
//             setFormData({ complaint: '', priority: '' });
//         } catch (err) {
//             console.error(err.message);
//             alert(`Failed to submit complaint: ${err.message}`);
//         }
//     };



//     return (
//         <div className="flex min-h-screen bg-black text-white">
//             <Sidebar role="student" />
//             <div className="flex-1 p-10">
//                 <h1 className="text-center text-xl mt-15 font-bold mb-6">RAISE A COMPLAINT</h1>
//                 <form
//                     onSubmit={handleSubmit}
//                     className="bg-gray-800 max-w-lg mx-auto p-6 rounded space-y-4"
//                 >
//                     {/* <div>
//                         <label className="block font-semibold">Student Name:</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             className="w-full bg-gray-700 p-2 rounded"
//                             required
//                         />
//                     </div> */}

//                     {/* <div>
//                         <label className="block font-semibold">Class:</label>
//                         <select
//                             name="class"
//                             value={formData.class}
//                             onChange={handleChange}
//                             className="w-full bg-gray-700 p-2 rounded"
//                             required
//                         >
//                             <option value="">Select class</option>
//                             {classList.map((cls, idx) => (
//                                 <option key={idx} value={cls.name}>
//                                     {cls.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div> */}

//                     {/* <div>
//                         <label className="block font-semibold">Roll No:</label>
//                         <input
//                             type="text"
//                             name="rollNo"
//                             value={formData.rollNo}
//                             onChange={handleChange}
//                             className="w-full bg-gray-700 p-2 rounded"
//                             required
//                         />
//                     </div> */}

//                     <div>
//                         <label className="block font-semibold">Complaint:</label>
//                         <textarea
//                             name="complaint"
//                             value={formData.complaint}
//                             onChange={handleChange}
//                             className="w-full bg-gray-700 p-2 rounded"
//                             required
//                         ></textarea>
//                     </div>

//                     <div>
//                         <label className="block font-semibold">Priority:</label>
//                         <select
//                             name="priority"
//                             value={formData.priority}
//                             onChange={handleChange}
//                             className="w-full bg-gray-700 p-2 rounded"
//                             required
//                         >
//                             <option value="">Select Priority</option>
//                             <option value="High">High</option>
//                             <option value="Medium">Medium</option>
//                             <option value="Low">Low</option>
//                         </select>
//                     </div>

//                     <button type="submit" className="bg-gray-600 px-4 py-2 rounded w-full">
//                         Submit Complaint
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default StudentComplaintPage;




import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const StudentComplaintPage = () => {
    const [formData, setFormData] = useState({
        complaint: '',
        priority: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.priority) {
            setError('Please select a priority level');
            return;
        }
        
        setIsSubmitting(true);
        setError('');
        
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/complaints`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit complaint');
            }

            setSubmitSuccess(true);
            setFormData({ complaint: '', priority: '' });
            
            // Reset states
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 3000);
        } catch (err) {
            console.error('Submission error:', err);
            setError(err.message || 'Failed to submit complaint. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
            <Sidebar role="student" />
            <div className="flex-1 p-6">
                <Header />
                
                <div className="max-w-4xl mx-auto mt-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            Raise a Complaint
                        </h1>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-xl"
                    >
                        {submitSuccess && (
                            <div className="mb-6 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/50 rounded-lg flex items-center animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <span className="text-green-300 font-medium">Success!</span>
                                    <p className="text-green-200 text-sm mt-1">Your complaint has been submitted. We'll address it soon.</p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 p-4 bg-gradient-to-r from-red-900/30 to-rose-900/20 border border-red-500/50 rounded-lg flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-red-300">{error}</span>
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block font-medium mb-2 text-cyan-300 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" />
                                </svg>
                                Complaint Details
                            </label>
                            <textarea
                                name="complaint"
                                value={formData.complaint}
                                onChange={handleChange}
                                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                                placeholder="Describe your issue in detail..."
                                rows={5}
                                required
                            ></textarea>
                            <div className="flex justify-between mt-2">
                                <p className="text-sm text-gray-400">Be specific about the issue you're facing</p>
                                <p className="text-sm text-gray-400">{formData.complaint.length}/500 characters</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block font-medium mb-2 text-cyan-300 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                </svg>
                                Priority Level
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { value: 'High', label: 'High', color: 'from-red-600 to-orange-500', icon: '🔥' },
                                    { value: 'Medium', label: 'Medium', color: 'from-amber-600 to-yellow-500', icon: '⚠️' },
                                    { value: 'Low', label: 'Low', color: 'from-green-600 to-emerald-500', icon: '💬' }
                                ].map((option) => (
                                    <label 
                                        key={option.value}
                                        className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 flex flex-col ${
                                            formData.priority === option.value 
                                                ? `bg-gradient-to-br ${option.color} border-transparent scale-[1.02] shadow-lg text-white`
                                                : 'bg-gray-800/60 border-gray-700 hover:bg-gray-700/50 text-gray-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="priority"
                                            value={option.value}
                                            checked={formData.priority === option.value}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <div className="flex items-center mb-2">
                                            <span className="text-xl mr-2">{option.icon}</span>
                                            <span className="font-semibold">{option.label}</span>
                                        </div>
                                        <span className="text-xs opacity-80 mt-1 text-left">
                                            {option.value === 'High' 
                                                ? 'Urgent attention needed (e.g., safety issues)' 
                                                : option.value === 'Medium' 
                                                    ? 'Important but not urgent (e.g., facilities)' 
                                                    : 'General feedback (e.g., suggestions)'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full py-4 px-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center ${
                                isSubmitting
                                    ? 'bg-gray-700 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:scale-[1.02]'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </>
                            ) : submitSuccess ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-300" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Submitted Successfully
                                </>
                            ) : (
                                'Submit Complaint'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                        <h2 className="font-bold text-lg mb-4 text-cyan-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Complaint Guidelines
                        </h2>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-start">
                                <span className="text-cyan-400 mr-2">•</span>
                                <span><strong>Be specific:</strong> Include date, time, location, and people involved</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-cyan-400 mr-2">•</span>
                                <span><strong>High priority:</strong> For urgent issues needing immediate attention</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-cyan-400 mr-2">•</span>
                                <span><strong>Response time:</strong> 24-48 hours for high priority, 3-5 days for others</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-cyan-400 mr-2">•</span>
                                <span><strong>Check email:</strong> Updates will be sent to your registered email</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentComplaintPage;