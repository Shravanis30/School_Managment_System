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


// StudentComplaintPage.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const StudentComplaintPage = () => {
    const [formData, setFormData] = useState({
        complaint: '',
        priority: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const res = await fetch('/api/complaints', {
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
            
            // Reset success message after 3 seconds
            setTimeout(() => setSubmitSuccess(false), 3000);
        } catch (err) {
            console.error(err.message);
            alert(`Failed to submit complaint: ${err.message}`);
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
                            <div className="mb-6 p-3 bg-green-900/30 border border-green-500/50 rounded-lg flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-green-300">Complaint submitted successfully!</span>
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block font-medium mb-2 text-blue-300">
                                Complaint Details
                            </label>
                            <textarea
                                name="complaint"
                                value={formData.complaint}
                                onChange={handleChange}
                                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder="Describe your issue in detail..."
                                rows={5}
                                required
                            ></textarea>
                            <p className="mt-1 text-sm text-gray-400">Be specific about the issue you're facing</p>
                        </div>

                        <div className="mb-8">
                            <label className="block font-medium mb-2 text-blue-300">
                                Priority Level
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { value: 'High', label: 'High', color: 'from-red-500 to-orange-500' },
                                    { value: 'Medium', label: 'Medium', color: 'from-yellow-500 to-amber-500' },
                                    { value: 'Low', label: 'Low', color: 'from-green-500 to-emerald-500' }
                                ].map((option) => (
                                    <label 
                                        key={option.value}
                                        className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 ${
                                            formData.priority === option.value 
                                                ? `bg-gradient-to-br ${option.color} border-transparent scale-[1.02] shadow-lg`
                                                : 'bg-gray-800/60 border-gray-700 hover:bg-gray-700/50'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="priority"
                                            value={option.value}
                                            checked={formData.priority === option.value}
                                            onChange={handleChange}
                                            className="hidden"
                                            required
                                        />
                                        <div className="text-center">
                                            <span className="block font-semibold">{option.label}</span>
                                            <span className="text-xs opacity-80 mt-1">
                                                {option.value === 'High' 
                                                    ? 'Urgent attention needed' 
                                                    : option.value === 'Medium' 
                                                        ? 'Important but not urgent' 
                                                        : 'General feedback'}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
                                isSubmitting
                                    ? 'bg-gray-700 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg'
                            }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </div>
                            ) : (
                                'Submit Complaint'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                        <h2 className="font-bold text-lg mb-4 text-blue-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Complaint Guidelines
                        </h2>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-start">
                                <span className="text-green-400 mr-2">•</span>
                                Be specific and include relevant details (date, time, location)
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-400 mr-2">•</span>
                                High priority is for urgent issues that need immediate attention
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-400 mr-2">•</span>
                                You'll receive a response within 24-48 hours
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-400 mr-2">•</span>
                                Check your email for updates on your complaint status
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentComplaintPage;