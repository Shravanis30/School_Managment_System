

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaBell } from 'react-icons/fa';
// import axios from 'axios';

// const Header = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get('/api/user/profile', {
//           withCredentials: true,
//         });

//         setUser(res.data);
//         console.log("Fetched user profile:", res.data);
//       } catch (err) {
//         console.error("Error fetching profile:", err.response?.data || err.message);
//         // Optionally redirect on unauthorized
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleNotificationClick = () => {
//     navigate('/notifications');
//   };

//   const handleProfileClick = () => {
//     if (!user) return;
//     navigate(`/${user.role}/profile`);
//   };

//   // 🧠 Role-specific title
//   const getHeaderTitle = () => {
//     if (!user?.role) return "Welcome";

//     switch (user.role) {
//       case 'admin':
//         return `🎓 Welcome, ${user.name} (Principal)`;
//       case 'teacher':
//         return `📚 Welcome, ${user.name} (Teacher)`;
//       case 'student':
//         return `🎒 Welcome, ${user.name} (Student)`;
//       default:
//         return `👤 Welcome, ${user.name}`;
//     }
//   };

//   return (
//     <div className="flex justify-between items-center mb-6">
//       {/* Left Side Title */}
//       <div className="text-xl font-semibold text-white">{getHeaderTitle()}</div>

//       {/* Right Side Controls */}
//       <div className="flex items-center gap-4">
//         <FaBell
//           className="text-2xl text-gray-300 cursor-pointer"
//           onClick={handleNotificationClick}
//         />

//         {/* Name and Designation */}
//         <div className="text-sm text-right cursor-pointer" onClick={handleProfileClick}>
//           <p className="font-bold">{user?.name || 'User'}</p>
//           <p className="text-gray-400 text-xs">{user?.designation || user?.role}</p>
//         </div>

//         {/* Profile Image */}
//         <div
//           className="w-9 h-9 rounded-full bg-gray-600 overflow-hidden cursor-pointer"
//           onClick={handleProfileClick}
//         >
//           {user?.profileImage ? (
//             <img
//               src={user.profileImage}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-white text-sm">
//               {user?.name?.charAt(0)?.toUpperCase()}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/user/profile', {
          withCredentials: true,
        });
        setUser(res.data);
        console.log("Fetched user profile:", res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const handleProfileClick = () => {
    if (!user) return;
    navigate(`/${user.role}/profile`);
  };

  const getHeaderTitle = () => {
    if (!user?.role) return "Welcome";
    switch (user.role) {
      case 'admin':
        return `🎓 Welcome, ${user.name} (Principal)`;
      case 'teacher':
        return `📚 Welcome, ${user.name} (Teacher)`;
      case 'student':
        return `🎒 Welcome, ${user.name} (Student)`;
      default:
        return `👤 Welcome, ${user.name}`;
    }
  };

  return (
    <div className="flex justify-between items-center mb-6 px-4 py-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-md">
      {/* Sidebar Toggle on Mobile */}
      <div className="md:hidden text-xl cursor-pointer text-white" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Title */}
      <div className="text-base sm:text-lg md:text-xl font-semibold text-white">
        {getHeaderTitle()}
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-4">
        <FaBell
          className="text-xl sm:text-2xl text-gray-300 cursor-pointer hover:text-indigo-400 transition"
          onClick={handleNotificationClick}
        />

        <div className="hidden sm:block text-sm text-right cursor-pointer" onClick={handleProfileClick}>
          <p className="font-bold text-white">{user?.name || 'User'}</p>
          <p className="text-gray-400 text-xs">{user?.designation || user?.role}</p>
        </div>

        <div
          className="w-9 h-9 rounded-full bg-gray-700 overflow-hidden cursor-pointer flex items-center justify-center text-white text-sm"
          onClick={handleProfileClick}
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            user?.name?.charAt(0)?.toUpperCase()
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
