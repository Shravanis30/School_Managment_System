// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import { FiEdit2, FiCheck, FiX } from "react-icons/fi";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const CommonProfile = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");
//   const [preview, setPreview] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
//           { withCredentials: true }
//         );
//         setUser(res.data);
//       } catch (err) {
//         console.error("Failed to fetch profile:", err);
//         setError("Unable to fetch profile. Please login again.");
//         toast.error("Unable to fetch profile. Please login again.");
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type and size
//       if (!file.type.startsWith("image/")) {
//         toast.error("Please select an image file (JPEG, PNG)");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("Image size should be less than 5MB");
//         return;
//       }
      
//       setSelectedImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!selectedImage) return;
    
//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("image", selectedImage);

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/user/upload-profile-image`,
//         formData,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
      
//       setUser((prev) => ({ ...prev, profileImage: res.data.profileImage }));
//       setSelectedImage(null);
//       setPreview(null);
//       toast.success("Profile image updated successfully!");
//     } catch (err) {
//       console.error("Failed to upload image:", err);
//       toast.error("Upload failed. Please try again.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const cancelImageSelection = () => {
//     setSelectedImage(null);
//     setPreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
//   if (!user) 
//     return (
//       <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//         <div className="flex-1 p-6">
//           <p className="text-center mt-10 text-white">Loading profile...</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role={user.role} />
//       <div className="flex-1 p-4 md:p-6">
//         <Header />
//         <ToastContainer position="top-right" autoClose={3000} />

//         <div className="max-w-2xl mx-auto bg-white/5 rounded-xl p-6 shadow-lg border border-white/10 mt-6">
//           <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
//             <div className="relative">
//               <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-500/50 flex items-center justify-center">
//                 <img
//                   src={
//                     preview || 
//                     user.profileImage || 
//                     "/default-avatar.png"
//                   }
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = "/default-avatar.png";
//                   }}
//                 />
//               </div>
//               <label className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-all shadow-lg">
//                 <FiEdit2 className="text-lg" />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                   ref={fileInputRef}
//                 />
//               </label>
//             </div>
            
//             <div className="text-center md:text-left mt-4 md:mt-0">
//               <h2 className="text-2xl font-bold">{user.name}</h2>
//               <p className="text-sm text-gray-300 capitalize">
//                 {user.designation || user.role}
//               </p>
//               <p className="text-sm text-gray-400 mt-1">{user.email}</p>
              
//               {user.employeeId && (
//                 <p className="text-sm text-indigo-300 mt-2">
//                   ID: {user.employeeId}
//                 </p>
//               )}
//             </div>
//           </div>

//           {selectedImage && (
//             <div className="mb-4 flex items-center gap-3 justify-center">
//               <button
//                 onClick={handleImageUpload}
//                 disabled={isUploading}
//                 className={`flex items-center gap-2 px-4 py-2 rounded ${
//                   isUploading
//                     ? "bg-gray-500 cursor-not-allowed"
//                     : "bg-indigo-600 hover:bg-indigo-700"
//                 }`}
//               >
//                 {isUploading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Uploading...
//                   </>
//                 ) : (
//                   <>
//                     <FiCheck className="text-lg" />
//                     Save Changes
//                   </>
//                 )}
//               </button>
//               <button
//                 onClick={cancelImageSelection}
//                 className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
//               >
//                 <FiX className="text-lg" />
//                 Cancel
//               </button>
//             </div>
//           )}

//           <div className="space-y-4 mt-8 border-t border-white/10 pt-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {user.employeeId && (
//                 <div className="bg-gray-800/50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-400">Employee ID</p>
//                   <p className="font-medium">{user.employeeId}</p>
//                 </div>
//               )}
              
//               {user.classTeacherOf && (
//                 <div className="bg-gray-800/50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-400">Class Teacher</p>
//                   <p className="font-medium">{user.classTeacherOf}</p>
//                 </div>
//               )}
              
//               {user.subjects?.length > 0 && (
//                 <div className="bg-gray-800/50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-400">Subjects</p>
//                   <p className="font-medium">{user.subjects.join(", ")}</p>
//                 </div>
//               )}
              
//               {user.schoolName && (
//                 <div className="bg-gray-800/50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-400">School</p>
//                   <p className="font-medium">{user.schoolName}</p>
//                 </div>
//               )}
              
//               {user.role === "student" && (
//                 <>
//                   <div className="bg-gray-800/50 p-4 rounded-lg">
//                     <p className="text-sm text-gray-400">Roll No</p>
//                     <p className="font-medium">{user.rollNumber}</p>
//                   </div>
//                   <div className="bg-gray-800/50 p-4 rounded-lg">
//                     <p className="text-sm text-gray-400">Class</p>
//                     <p className="font-medium">{user.className}</p>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommonProfile;


// src/pages/CommonProfile.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommonProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          { withCredentials: true }
        );
        setUser(res.data);
      } catch (err) {
        toast.error("Unable to fetch profile. Please login again.");
        setError("Unable to fetch profile. Please login again.");
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      return toast.error("Only image files allowed!");
    }
    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Max file size is 5MB");
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);
    setIsUploading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/upload-profile-image`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Profile image uploaded");
      setUser((prev) => ({ ...prev, profileImage: res.data.profileImage }));
      setSelectedImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const cancelImageSelection = () => {
    setSelectedImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (error) return <p className="text-red-500 mt-10 text-center">{error}</p>;
  if (!user) return <p className="text-white mt-10 text-center">Loading...</p>;

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar role={user.role} />
      <div className="flex-1 p-6">
        <Header />
        <ToastContainer />
        <div className="bg-white/5 p-6 rounded-xl max-w-2xl mx-auto shadow-lg border border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-500">
                <img
                  src={preview || user.profileImage || "/default-avatar.png"}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <label className="absolute bottom-2 right-2 cursor-pointer bg-indigo-600 p-2 rounded-full text-white">
                <FiEdit2 />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  ref={fileInputRef}
                />
              </label>
            </div>

            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-gray-400 capitalize">{user.designation || user.role}</p>
            </div>
          </div>

          {selectedImage && (
            <div className="mt-4 flex gap-3 justify-center">
              <button
                onClick={handleImageUpload}
                disabled={isUploading}
                className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
              >
                {isUploading ? "Uploading..." : "Save"}
              </button>
              <button
                onClick={cancelImageSelection}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonProfile;
