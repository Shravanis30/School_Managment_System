import React from "react";
import { Link } from "react-router-dom"; 
import backgroundImg from "../assets/img.jpg";

const roles = [
  {
    title: "Admin",
    route: "/register/admin", // <-- ✅ Add route
    icon: (
      <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
    description: "Login as an administrator to access the dashboard and manage app data."
  },
  {
    title: "Student",
    route: "/register/student",
    icon: (
      <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0c-4.418 0-8-1.343-8-3V7"/>
      </svg>
    ),
    description: "Login as a student to explore course materials and assignments."
  },
  {
    title: "Teacher",
    route: "/register/teacher",
    icon: (
      <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 19h16M4 15h16M4 11h16M4 7h16"/>
      </svg>
    ),
    description: "Login as a teacher to create courses, assignments, and track student progress."
  }
];

const RoleSection = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center">
          Select Your Role
        </h2>

        {/* Transparent Box Container */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl w-full max-w-5xl shadow-xl">
          {/* Roles Displayed Horizontally */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Link to={role.route} key={role.title}>
                <div className="bg-black bg-opacity-60 rounded-lg p-6 text-white text-center shadow-md hover:scale-105 transition duration-300 cursor-pointer">
                  {role.icon}
                  <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                  <p className="text-sm">{role.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSection;

