import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import backgroundImg from '../assets/img.jpg';

const roleMap = {
  admin: {
    label: 'Admin',
    registerLink: '/register/admin',
  },
  student: {
    label: 'Student',
    registerLink: '/register/student',
  },
  teacher: {
    label: 'Teacher',
    registerLink: '/register/teacher',
  },
};

const Login = () => {
  const { role } = useParams();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const currentRole = roleMap[role] || roleMap.student;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${currentRole.label} Login Data:`, form);
    // Backend logic goes here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="flex flex-col md:flex-row max-w-7xl w-full min-h-[80vh] bg-gray-200 rounded-lg shadow-2xl overflow-hidden">

        {/* Left Side - Image with overlay */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={backgroundImg}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute bg-black opacity-60 inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">Welcome Back!</h2>
            <p className="mt-4 text-base sm:text-lg">
              Log in as a {currentRole.label} to manage your tasks and explore the system.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">{currentRole.label} Login</h2>
            <p className="text-md text-gray-500 mb-6">
              Please log in to your dashboard.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                name="email"
                placeholder="Enter your email *"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password *"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500 text-lg"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-lg font-semibold transition duration-300"
              >
                LOGIN
              </button>
            </form>

            <p className="text-sm text-center mt-6 text-gray-500">
              Don’t have an account?{' '}
              <Link to={currentRole.registerLink} className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
