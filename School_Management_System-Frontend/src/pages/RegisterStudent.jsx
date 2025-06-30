import { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImg from "../assets/img.jpg";


const RegisterStudent = () => {
  const [form, setForm] = useState({
    fullName: '',
    enrollmentNo: '',
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
    console.log('Register Student:', form);
    // Add validation/backend logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="flex flex-col md:flex-row max-w-7xl w-full min-h-[80vh] bg-gray-200 rounded-lg shadow-2xl overflow-hidden">

        {/* Left Image */}
        <div className="w-full md:w-1/2 relative">
          <img
            src={backgroundImg}
            alt="Art"
            className="w-full h-full object-cover"
          />

          <div className="absolute bg-black opacity-60 inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
            <h2 className="lg:text-4xl font-bold">Welcome Future Achiever</h2>
            <p className="text-lg mt-10">Get access to attendance, exams & more!</p>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Student Register</h2>
          <p className="text-sm text-gray-500 mb-6">
            Register to access your student portal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name *"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:ring-purple-500"
            />
            <input
              type="text"
              name="enrollmentNo"
              placeholder="Enrollment number *"
              value={form.enrollmentNo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:ring-purple-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address *"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:ring-purple-500"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password *"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:ring-purple-500"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500 text-sm"
              >
                {showPassword ? '🙈' : '👁️'}
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
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold"
            >
              REGISTER
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-500">
            Already have an account?{' '}
            <Link to="/login/student" className="text-purple-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>

  );
};

export default RegisterStudent;
