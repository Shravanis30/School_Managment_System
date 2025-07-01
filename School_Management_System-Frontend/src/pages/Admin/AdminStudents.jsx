// import React, { useState } from 'react';
// import Sidebar from '../../components/Sidebar';

// const AdminStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     class: '',
//     rollNo: '',
//     email: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = () => {
//     if (formData.name && formData.class && formData.rollNo) {
//       setStudents([...students, { ...formData, id: Date.now() }]);
//       setFormData({ name: '', class: '', rollNo: '', email: '' });
//     }
//   };

//   const classes = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <Sidebar role="admin" />
//       <div className="flex-1 p-6">
//         <h2 className="text-2xl font-bold mb-4">Student Registration</h2>

//         <div className="bg-gray-800 p-4 rounded mb-8">
//           <h3 className="text-lg font-semibold mb-2">Register New Student</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Student Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="p-2 rounded bg-gray-700 text-white"
//             />
//             <input
//               type="text"
//               name="rollNo"
//               placeholder="Roll Number"
//               value={formData.rollNo}
//               onChange={handleChange}
//               className="p-2 rounded bg-gray-700 text-white"
//             />
//             <select
//               name="class"
//               value={formData.class}
//               onChange={handleChange}
//               className="p-2 rounded bg-gray-700 text-white"
//             >
//               <option value="">Select Class</option>
//               {classes.map((cls) => (
//                 <option key={cls} value={cls}>
//                   Class {cls}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email (optional)"
//               value={formData.email}
//               onChange={handleChange}
//               className="p-2 rounded bg-gray-700 text-white"
//             />
//           </div>
//           <button
//             onClick={handleRegister}
//             className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Register Student
//           </button>
//         </div>

//         <div className="space-y-6">
//           {classes.map((cls) => (
//             <div key={cls} className="bg-gray-900 p-4 rounded">
//               <h4 className="text-xl font-semibold mb-2">Class {cls}</h4>
//               <div className="overflow-x-auto">
//                 <table className="table-auto w-full text-left">
//                   <thead>
//                     <tr className="bg-gray-700">
//                       <th className="p-2">Roll No</th>
//                       <th className="p-2">Name</th>
//                       <th className="p-2">Email</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {students.filter((s) => s.class === cls).length > 0 ? (
//                       students
//                         .filter((s) => s.class === cls)
//                         .map((s) => (
//                           <tr key={s.id} className="border-b border-gray-600">
//                             <td className="p-2">{s.rollNo}</td>
//                             <td className="p-2">{s.name}</td>
//                             <td className="p-2">{s.email}</td>
//                           </tr>
//                         ))
//                     ) : (
//                       <tr>
//                         <td className="p-2" colSpan="3">
//                           No students registered.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminStudents;


import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    rollNo: '',
    email: '',
  });
  const [openClass, setOpenClass] = useState(null);

  const classes = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const { name, class: studentClass, rollNo } = formData;
    if (name && studentClass && rollNo) {
      setStudents([...students, { ...formData, id: Date.now() }]);
      setFormData({ name: '', class: '', rollNo: '', email: '' });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const toggleClassSection = (cls) => {
    setOpenClass((prev) => (prev === cls ? null : cls));
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header />
        <h2 className="text-2xl font-bold mb-6">Student Management</h2>

        {/* Registration Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-10">
          <h3 className="text-lg font-semibold mb-4">Register New Student</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              value={formData.rollNo}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-white"
            />
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-white"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  Class {cls}
                </option>
              ))}
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email (optional)"
              value={formData.email}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <button
            onClick={handleRegister}
            className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Register Student
          </button>
        </div>

        {/* Accordion per class */}
        <div className="space-y-4">
          {classes.map((cls) => (
            <div key={cls} className="bg-gray-900 rounded shadow">
              <button
                onClick={() => toggleClassSection(cls)}
                className="w-full text-left px-6 py-4 flex justify-between items-center text-lg font-semibold bg-gray-800 rounded-t"
              >
                <span>Class {cls}</span>
                <span>{openClass === cls ? '−' : '+'}</span>
              </button>

              {openClass === cls && (
                <div className="px-6 py-4">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full text-left text-sm">
                      <thead className="bg-gray-700">
                        <tr>
                          <th className="p-2">Roll No</th>
                          <th className="p-2">Name</th>
                          <th className="p-2">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.filter((s) => s.class === cls).length > 0 ? (
                          students
                            .filter((s) => s.class === cls)
                            .map((s) => (
                              <tr key={s.id} className="border-b border-gray-700">
                                <td className="p-2">{s.rollNo}</td>
                                <td className="p-2">{s.name}</td>
                                <td className="p-2">{s.email}</td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="p-2 text-gray-400">
                              No students registered in Class {cls}.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
