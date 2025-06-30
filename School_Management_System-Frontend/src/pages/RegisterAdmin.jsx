import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import backgroundImg from "../assets/img.jpg";

const RegisterAdmin = () => {
  const [form, setForm] = useState({
    fullName: '',
    schoolName: '',
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register Admin:', form);
    // TODO: Firebase or backend connection logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="flex flex-col md:flex-row max-w-7xl w-full min-h-[80vh] bg-white rounded-lg shadow-2xl overflow-hidden">
        
        {/* Left Side - Image with Overlay Text */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={backgroundImg}
            alt="Admin Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute bg-black opacity-70 inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
            <h2 className="sm:text-2xl lg:text-4xl font-bold">Empower Your School Journey</h2>
            <p className="sm:text lg:text-lg mt-10">
              Register as an Admin to manage students, staff, results, and more — all in one place.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Admin Register</h2>
          <p className="text-md text-gray-500 mb-6">
            Create your own school by registering as an admin. You’ll be able to manage everything!
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="fullName"
              placeholder="Enter your name *"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />

            <input
              type="text"
              name="schoolName"
              placeholder="Create your school name *"
              value={form.schoolName}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email *"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password *"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3.5 cursor-pointer text-gray-600 text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="accent-purple-600"
              />
              <label className="text-sm text-gray-600">Remember me</label>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded text-lg font-semibold transition duration-300"
            >
              REGISTER
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-500">
            Already have an account?{' '}
            <Link to="/login/admin" className="text-purple-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
