// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminProfile = () => {
//   const [admin, setAdmin] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/user/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAdmin(res.data);
//       } catch (err) {
//         console.error("Failed to fetch admin profile", err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (!admin) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded shadow mt-10">
//       <div className="flex items-center space-x-4">
//         <img
//           src={admin.profileImage}
//           alt="Profile"
//           className="w-20 h-20 rounded-full object-cover"
//         />
//         <div>
//           <h2 className="text-xl font-bold">{admin.fullName}</h2>
//           <p className="text-gray-600">Role: Admin</p>
//           <p className="text-gray-500">{admin.email}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;


import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/user/profile", {
          withCredentials: true,
        });
        setAdmin(res.data);
      } catch (err) {
        console.error("Failed to fetch admin profile", err);
        setError("Unable to fetch profile. Please make sure you are logged in.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!admin) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow mt-10">
      <div className="flex items-center space-x-4">
        <img
          src={admin.profileImage || "/default-avatar.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-bold">{admin.name}</h2>
          <p className="text-gray-600">Role: {admin.role}</p>
          <p className="text-gray-600">Designation: {admin.designation}</p>
          <p className="text-gray-500">{admin.email}</p>
          <p className="text-gray-500">School: {admin.schoolName}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
