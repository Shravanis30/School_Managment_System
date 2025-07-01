import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import backgroundImg from '../assets/img.jpg';

const RegisterTeacher = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    employeeId: '',
    email: '',
    password: '',
    classTeacherOf: '',
    subjects: [''],
    remember: false,
    profileImage: '', // ✅ Add this
  });


  // 🔧 Fix: Handle standard input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 🔧 Handle subject field changes
  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...form.subjects];
    updatedSubjects[index] = value;
    setForm((prev) => ({ ...prev, subjects: updatedSubjects }));
  };

  const addSubject = () => {
    setForm((prev) => ({ ...prev, subjects: [...prev.subjects, ''] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/teachers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: form.fullName,
          employeeId: form.employeeId,
          email: form.email,
          password: form.password,
          classTeacherOf: form.classTeacherOf,
          subjects: form.subjects.filter((subj) => subj.trim() !== ""),
          profileImage: form.profileImage, // ✅ Add this
        }),

      });

      const data = await response.json();
      if (response.ok) {
        alert("Teacher Registered");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Teacher registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-7xl w-full min-h-[80vh] bg-white rounded-lg shadow-2xl overflow-hidden">

        {/* Left Side */}
        <div className="w-full md:w-1/2 relative">
          <img src={backgroundImg} alt="Teacher" className="w-full h-full object-cover" />
          <div className="absolute bg-black opacity-60 inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
            <h2 className="sm:text-2xl lg:text-4xl font-bold">Inspire, Educate, Lead</h2>
            <p className="sm:text lg:text-lg mt-10">
              Register as a Teacher to manage classes, attendance, and student progress efficiently.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Teacher Register</h2>
          <p className="text-md text-gray-500 mb-6">Fill in the details to register a new teacher.</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="fullName"
              placeholder="Full name *"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-lg"
            />

            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID *"
              value={form.employeeId}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-lg"
            />

            <input
              type="text"
              name="profileImage"
              placeholder="Profile image URL (optional)"
              value={form.profileImage}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-lg"
            />



            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password *"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-lg"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3.5 cursor-pointer text-gray-600 text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <input
              type="text"
              name="classTeacherOf"
              placeholder="Class Teacher of (optional)"
              value={form.classTeacherOf}
              onChange={handleChange}
              className="w-full px-5 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 text-lg"
            />

            {/* Subject inputs */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Subjects Assigned *</label>
              {form.subjects.map((subject, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Subject ${index + 1}`}
                  value={subject}
                  onChange={(e) => handleSubjectChange(index, e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded mb-2"
                />
              ))}
              <button
                type="button"
                onClick={addSubject}
                className="text-blue-600 text-sm font-medium underline"
              >
                + Add another subject
              </button>
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
            <Link to="/login/teacher" className="text-purple-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterTeacher;
