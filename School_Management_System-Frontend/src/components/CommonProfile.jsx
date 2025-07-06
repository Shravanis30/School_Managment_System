import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const CommonProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Unable to fetch profile. Please login again.");
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/upload-profile-image`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUser((prev) => ({ ...prev, profileImage: res.data.profileImage }));
      setSelectedImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Failed to upload image:", err);
      alert("Upload failed.");
    }
  };

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!user) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role={user.role} />
      <div className="flex-1 p-6">
        <Header />

        <div className="max-w-2xl mx-auto bg-white/5 rounded-xl p-6 shadow-lg border border-white/10 mt-10">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative w-24 h-24">
              <img
                src={preview || user.profileImage || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border border-white/20"
              />
              <label className="absolute bottom-0 right-0 bg-white text-black text-xs px-2 py-1 rounded cursor-pointer hover:bg-gray-300">
                ✏️
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-sm text-gray-300 capitalize">{user.designation || user.role}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>

          {selectedImage && (
            <div className="mb-4">
              <button
                onClick={handleImageUpload}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Save New Image
              </button>
            </div>
          )}

          <div className="space-y-2 text-white/90">
            {user.employeeId && (
              <p><span className="font-semibold">Employee ID:</span> {user.employeeId}</p>
            )}
            {user.classTeacherOf && (
              <p><span className="font-semibold">Class Teacher Of:</span> {user.classTeacherOf}</p>
            )}
            {user.subjects?.length > 0 && (
              <p><span className="font-semibold">Subjects:</span> {user.subjects.join(", ")}</p>
            )}
            {user.schoolName && (
              <p><span className="font-semibold">School:</span> {user.schoolName}</p>
            )}
            {user.role === "student" && (
              <>
                <p><span className="font-semibold">Roll No:</span> {user.rollNumber}</p>
                <p><span className="font-semibold">Class:</span> {user.className}</p>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonProfile;
