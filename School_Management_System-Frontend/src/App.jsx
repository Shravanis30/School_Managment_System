import './App.css'
import './index.css';
import { Routes, Route } from 'react-router-dom';
// Pages
import Welcome from './pages/Welcome';
import RoleSelection from './pages/RoleSelection';

import RegisterAdmin from './pages/RegisterAdmin';
import RegisterStudent from './pages/RegisterStudent';
import RegisterTeacher from './pages/RegisterTeacher';

import Login from './pages/Login';

import AdminDashboard from './pages/Admin/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

import AdminEvents from './pages/Admin/AdminEvent';
import AdminStudents from './pages/Admin/AdminStudents';
import AdminTeachers from './pages/Admin/AdminTeachers';
import AdminFees from './pages/Admin/AdminFees';
import AdminClasses from './pages/Admin/AdminClasses';

function App() {

  return (


    // <BrowserRouter>
    //   <Router>
    <Routes>
      {/* Entry Pages */}
      <Route path="/" element={<Welcome />} />
      <Route path="/select-role" element={<RoleSelection />} />

      {/* Registration Routes */}
      <Route path="/register/admin" element={<RegisterAdmin />} />
      <Route path="/register/student" element={<RegisterStudent />} />
      <Route path="/register/teacher" element={<RegisterTeacher />} />

      {/* Common Login Page for All Roles */}
      <Route path="/login/:role" element={<Login />} />

      {/* Dashboards */}
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
      <Route path="/dashboard/student" element={<StudentDashboard />} />


      <Route path="/dashboard/admin/students" element={<AdminStudents />} />
      <Route path="/dashboard/admin/teachers" element={<AdminTeachers/>} />
      <Route path="/dashboard/admin/fees" element={<AdminFees />} />
      <Route path="/dashboard/admin/classes" element={<AdminClasses />} />
      <Route path="/dashboard/admin/events" element={<AdminEvents />} />




    </Routes>
    //   </Router>
    // </BrowserRouter>
  )
}

export default App