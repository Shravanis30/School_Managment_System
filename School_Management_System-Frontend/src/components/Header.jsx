import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       if (!token) return;

  //       const res = await axios.get('/api/user/profile', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       setUser(res.data);
  //     } catch (err) {
  //       console.error("Error fetching profile:", err);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        console.log("Fetched user profile:", res.data);

      } catch (err) {
        console.error("Error fetching profile:", err);
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

  return (
    <div className="flex justify-between items-center mb-6">
      <input
        type="text"
        placeholder="Search options, students etc.."
        className="w-1/2 p-2 bg-gray-800 text-white rounded focus:outline-none"
      />
      <div className="flex items-center gap-4">
        <FaBell
          className="text-2xl text-gray-300 cursor-pointer"
          onClick={handleNotificationClick}
        />
        <div className="text-sm text-right cursor-pointer" onClick={handleProfileClick}>
          <p className="font-bold">{user?.name || user?.fullName || 'User'}</p>
          <p className="text-gray-400 text-xs">{user?.designation || 'Role'}</p>
        </div>
        <div
          className="w-9 h-9 rounded-full bg-gray-600 overflow-hidden cursor-pointer"
          onClick={handleProfileClick}
        >
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
