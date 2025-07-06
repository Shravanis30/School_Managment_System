// import React from "react";
// import { Link } from "react-router-dom"; 
// import backgroundImg from "../assets/img.jpg";

// const roles = [
//   {
//     title: "Admin",
//     route: "/register/admin", // <-- ✅ Add route
//     icon: (
//       <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//       </svg>
//     ),
//     description: "Login as an administrator to access the dashboard and manage app data."
//   },
//   {
//     title: "Student",
//     route: "/login/student",
//     icon: (
//       <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <path d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0c-4.418 0-8-1.343-8-3V7"/>
//       </svg>
//     ),
//     description: "Login as a student to explore course materials and assignments."
//   },
//   {
//     title: "Teacher",
//     route: "/login/teacher",
//     icon: (
//       <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <path d="M4 19h16M4 15h16M4 11h16M4 7h16"/>
//       </svg>
//     ),
//     description: "Login as a teacher to create courses, assignments, and track student progress."
//   }
// ];

// const RoleSection = () => {
//   return (
//     <div
//       className="min-h-screen bg-cover bg-center relative"
//       style={{ backgroundImage: `url(${backgroundImg})` }}
//     >
//       {/* Dark Overlay */}
//       <div className="absolute inset-0 bg-black opacity-80"></div>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
//         {/* Title */}
//         <h2 className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center">
//           Select Your Role
//         </h2>

//         {/* Transparent Box Container */}
//         <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl w-full max-w-5xl shadow-xl">
//           {/* Roles Displayed Horizontally */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {roles.map((role) => (
//               <Link to={role.route} key={role.title}>
//                 <div className="bg-black bg-opacity-60 rounded-lg p-6 text-white text-center shadow-md hover:scale-105 transition duration-300 cursor-pointer">
//                   {role.icon}
//                   <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
//                   <p className="text-sm">{role.description}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoleSection;



import React from "react";
import { Link } from "react-router-dom"; 
import backgroundImg from "../assets/img.jpg";

const roles = [
  {
    title: "Admin",
    route: "/register/admin",
    icon: (
      <svg className="w-16 h-16 mx-auto mb-4 p-3 bg-purple-600/20 rounded-full" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    description: "Create and manage your school ecosystem with full administrative privileges"
  },
  {
    title: "Student",
    route: "/login/student",
    icon: (
      <svg className="w-16 h-16 mx-auto mb-4 p-3 bg-blue-600/20 rounded-full" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-5.342m0 0a50.655 50.655 0 015.145-1.67c.474.04.948.087 1.421.136M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    description: "Access assignments, timetables, and academic resources"
  },
  {
    title: "Teacher",
    route: "/login/teacher",
    icon: (
      <svg className="w-16 h-16 mx-auto mb-4 p-3 bg-green-600/20 rounded-full" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-5.342m0 0a50.655 50.655 0 015.145-1.67c.474.04.948.087 1.421.136M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    description: "Manage classes, assignments, and student progress"
  }
];

const RoleSection = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-blue-400/80 to-black/90"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            School Management System
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Connect to your educational journey with a single click
          </p>
        </div>

        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role) => (
              <Link to={role.route} key={role.title}>
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className="mb-4">{role.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{role.title}</h3>
                  <p className="text-white/70">{role.description}</p>
                  <div className="mt-6">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-6 py-2 rounded-full font-medium transition-all">
                      Continue
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 text-white/50 text-sm">
          <p>© 2023 School Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSection;