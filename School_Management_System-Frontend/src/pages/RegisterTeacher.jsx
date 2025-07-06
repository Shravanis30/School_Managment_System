import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import backgroundImg from '../assets/img.jpg';

const RegisterTeacher = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [classes, setClasses] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  const [form, setForm] = useState({
    fullName: '',
    employeeId: '',
    email: '',
    password: '',
    classTeacherOf: '',
    subjects: [],
    profileImage: '',
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, {
        credentials: 'include', // 👈 Send cookies
      });
      const data = await res.json();
      setClasses(data);
    } catch (err) {
      console.error('Failed to fetch classes:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'classTeacherOf') {
      setForm((prev) => ({ ...prev, [name]: value, subjects: [] }));

      const selected = classes.find((cls) => cls.name === value);
      setAvailableSubjects(selected?.subjects || []);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleSubject = (subject) => {
    const updated = form.subjects.includes(subject)
      ? form.subjects.filter((sub) => sub !== subject)
      : [...form.subjects, subject];
    setForm((prev) => ({ ...prev, subjects: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/teachers/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 👈 Send cookies for auth
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Teacher registered successfully');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Teacher registration error:', err);
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

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Teacher Register</h2>
          <p className="text-md text-gray-500 mb-6">Fill in the details to register a new teacher.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name *" required className="w-full px-5 py-3 border rounded text-lg" />
            <input type="text" name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="Employee ID *" required className="w-full px-5 py-3 border rounded text-lg" />
            <input type="text" name="profileImage" value={form.profileImage} onChange={handleChange} placeholder="Profile image URL (optional)" className="w-full px-5 py-3 border rounded text-lg" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email *" required className="w-full px-5 py-3 border rounded text-lg" />

            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Password *" required className="w-full px-5 py-3 border rounded text-lg" />
              <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-3.5 cursor-pointer text-gray-600 text-lg">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <select name="classTeacherOf" value={form.classTeacherOf} onChange={handleChange} className="w-full px-5 py-3 border rounded text-lg">
              <option value="">-- Select Class (Optional) --</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls.name}>{cls.name}</option>
              ))}
            </select>

            {availableSubjects.length > 0 && (
              <div>
                <label className="block text-gray-700 font-medium mb-1">Assign Subjects *</label>
                <div className="flex flex-wrap gap-3">
                  {availableSubjects.map((subject, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => toggleSubject(subject)}
                      className={`px-3 py-2 rounded border ${
                        form.subjects.includes(subject)
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-black border-gray-400'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded text-lg font-semibold transition duration-300">
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
