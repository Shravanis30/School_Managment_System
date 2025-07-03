import { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImg from "../assets/img.jpg";

const RegisterStudent = () => {
  const [form, setForm] = useState({
    fullName: '',
    enrollmentNo: '',
    email: '',
    password: '',
    className: '',
    profileImage: '',
  });

  const [classes, setClasses] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get('/api/classes', {
          withCredentials: true,
        });
        setClasses(res.data);
      } catch (err) {
        console.error('Error fetching classes:', err.message);
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/students/register",
        {
          name: form.fullName,
          email: form.email,
          password: form.password,
          rollNo: form.enrollmentNo,
          // rollNumber: form.enrollmentNo,
          className: form.className,
          profileImage: form.profileImage,
        },
        {
          withCredentials: true, // ✅ Important for sending cookie
        }
      );

      if (res.status === 201) {
        alert("✅ Student registered successfully!");
        setForm({
          fullName: '',
          enrollmentNo: '',
          email: '',
          password: '',
          className: '',
          profileImage: '',
        });
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert(err.response?.data?.message || "Student registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="flex flex-col md:flex-row max-w-7xl w-full min-h-[80vh] bg-gray-200 rounded-lg shadow-2xl overflow-hidden">
        {/* Left Side */}
        <div className="w-full md:w-1/2 relative">
          <img src={backgroundImg} alt="Art" className="w-full h-full object-cover" />
          <div className="absolute bg-black opacity-60 inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
            <h2 className="lg:text-4xl font-bold">Welcome Future Achiever</h2>
            <p className="text-lg mt-10">Get access to attendance, exams & more!</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Student Register</h2>
          <p className="text-sm text-gray-500 mb-6">Register a new student to your school system.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />

            <input
              type="text"
              name="enrollmentNo"
              placeholder="Enrollment No *"
              value={form.enrollmentNo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />

            <select
              name="className"
              value={form.className}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded text-gray-700"
            >
              <option value="" disabled>Select Class *</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls.name}>
                  {cls.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="profileImage"
              placeholder="Profile image URL (optional)"
              value={form.profileImage}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password *"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-sm text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold"
            >
              Register Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
