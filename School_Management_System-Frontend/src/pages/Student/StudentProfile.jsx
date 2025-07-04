// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const StudentProfile = () => {
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/user/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setStudent(res.data);
//       } catch (err) {
//         console.error("Failed to fetch student profile", err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (!student) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded shadow mt-10">
//       <div className="flex items-center space-x-4">
//         <img
//           src={student.profileImage}
//           alt="Profile"
//           className="w-20 h-20 rounded-full object-cover"
//         />
//         <div>
//           <h2 className="text-xl font-bold">{student.fullName}</h2>
//           <p className="text-gray-600">Role: Student</p>
//           <p className="text-gray-500">{student.email}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/students/me", {
          withCredentials: true, // ✅ send cookies including accessToken
        });
        setStudent(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          // Token missing or expired
          alert("Session expired. Please log in again.");
          navigate("/role-select"); // if using react-router
        } else {
          console.error("Failed to fetch student profile", err);
        }
      }
    };

    fetchProfile();
  }, []);

  if (!student) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow mt-10">
      <div className="flex items-center space-x-4">
        <img
          src={student.profileImage || "/default-profile.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{student.name}</h2>
          <p className="text-gray-600">Role: Student</p>
          <p className="text-gray-500">{student.email}</p>
          <p className="text-gray-500">Class: {student.className}</p>
          <p className="text-gray-500">Roll No: {student.rollNo}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
