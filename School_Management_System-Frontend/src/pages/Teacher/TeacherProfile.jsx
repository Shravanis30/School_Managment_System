import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeacher(res.data);
      } catch (err) {
        console.error("Failed to fetch teacher profile", err);
      }
    };

    fetchProfile();
  }, []);

  if (!teacher) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow mt-10">
      <div className="flex items-center space-x-4">
        <img
          src={teacher.profileImage}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{teacher.fullName}</h2>
          <p className="text-gray-600">Role: Teacher</p>
          <p className="text-gray-500">{teacher.email}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
