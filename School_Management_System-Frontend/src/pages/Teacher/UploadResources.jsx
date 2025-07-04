// // ✅ UploadResources.jsx
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../components/Sidebar';
// import axios from 'axios';

// const UploadResources = () => {
//   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [formData, setFormData] = useState({
//     className: '',
//     subject: '',
//     file: null,
//   });

//   useEffect(() => {
//     const fetchClasses = async () => {
//       const res = await axios.get('http://localhost:5000/api/classes');
//       setClasses(res.data);
//     };
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       if (!formData.className) return;
//       const res = await axios.get(`http://localhost:5000/api/classes/${formData.className}`);
//       if (res.data.subjects) {
//         setSubjects(res.data.subjects);
//       }
//     };
//     fetchSubjects();
//   }, [formData.className]);

//   const handleChange = (e) => {
//     if (e.target.name === 'file') {
//       setFormData({ ...formData, file: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (!formData.className || !formData.subject || !formData.file) {
//       alert('All fields are required!');
//       return;
//     }

//     const data = new FormData();
//     data.append('className', formData.className);
//     data.append('subject', formData.subject);
//     data.append('file', formData.file);

//     try {
//       await axios.post('http://localhost:5000/api/resources/upload', data, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert('Resource uploaded successfully');
//       setFormData({ className: '', subject: '', file: null });
//     } catch (err) {
//       alert('Error uploading file');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <Sidebar role="teacher" />
//       <div className="flex-1 p-6">
//         <h2 className="text-xl font-bold mb-4">Upload PDF Resources</h2>
//         <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-md space-y-4 w-full md:w-1/2">
//           <div>
//             <label className="block mb-1">Class:</label>
//             <select
//               name="className"
//               value={formData.className}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-800 rounded"
//             >
//               <option value="">Select Class</option>
//               {classes.map((cls) => (
//                 <option key={cls._id} value={cls.name}>{cls.name}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block mb-1">Subject:</label>
//             <select
//               name="subject"
//               value={formData.subject}
//               onChange={handleChange}
//               className="w-full p-2 bg-gray-800 rounded"
//             >
//               <option value="">Select Subject</option>
//               {subjects.map((sub, i) => (
//                 <option key={i} value={sub}>{sub}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block mb-1">Upload PDF:</label>
//             <input type="file" name="file" accept="application/pdf" onChange={handleChange} />
//           </div>
//           <button type="submit" className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600">
//             Upload
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadResources;



import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const UploadResources = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    className: '',
    subject: '',
    title: '',
    file: null,
  });

  // ✅ Fetch class list
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get('/api/classes', {
          withCredentials: true, // send cookies
        });
        setClasses(res.data);
      } catch (err) {
        console.error("Failed to fetch classes:", err);
      }
    };
    fetchClasses();
  }, []);

  // ✅ Fetch subjects based on selected class
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!formData.className) return;
      try {
        const res = await axios.get(`/api/resources/subjects/${formData.className}`, {
          withCredentials: true,
        });
        setSubjects(res.data);
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      }
    };
    fetchSubjects();
  }, [formData.className]);

  // ✅ Handle form field change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { className, subject, file, title } = formData;

    if (!className || !subject || !title || !file) {
      alert("All fields are required!");
      return;
    }

    const data = new FormData();
    data.append("className", className);
    data.append("subject", subject);
    data.append("title", title);
    data.append("file", file);

    try {
      await axios.post('/api/resources/upload', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Resource uploaded successfully!");
      setFormData({ className: '', subject: '', title: '', file: null });
      setSubjects([]);
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Failed to upload resource");
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar role="teacher" />
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Upload PDF Resources</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-lg shadow-md space-y-4 w-full md:w-1/2"
        >
          <div>
            <label className="block mb-1">Class:</label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls.name}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Subject:</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub, i) => (
                <option key={i} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded"
              placeholder="Enter resource title"
            />
          </div>

          <div>
            <label className="block mb-1">Upload PDF:</label>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              onChange={handleChange}
              className="bg-gray-800 text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadResources;
