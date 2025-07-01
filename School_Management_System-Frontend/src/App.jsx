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
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import StudentDashboard from './pages/Student/StudentDashboard';

import AdminEvents from './pages/Admin/AdminEvent';
import AdminStudents from './pages/Admin/AdminStudents';
import AdminTeachers from './pages/Admin/AdminTeachers';
import AdminFees from './pages/Admin/AdminFees';
import AdminClasses from './pages/Admin/AdminClasses';
import AdminAcademics from './pages/Admin/AdminAcademics';
<<<<<<< HEAD
import StudentComplaintPage from './pages/Student/StudentComplaintPage';
import AdminComplaintPage from './pages/Admin/AdminComplaintPage';
import AdminMeetingPage from './pages/Admin/AdminMeetingPage';
import TeacherMeetingPage from './pages/Teacher/TeacherMeetingPage';
import AdminFinancePage from './pages/Admin/AdminFinancePage';
=======
import StudentAssignment from './pages/Student/StudentAssignment';
>>>>>>> 6e68262 (Add assignment page)

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
      <Route path="/dashboard/admin/academics" element={<AdminAcademics />} />
      <Route path="/dashboard/admin/events" element={<AdminEvents />} />
<<<<<<< HEAD
      <Route path="/dashboard/admin/complaints" element={<AdminComplaintPage />} />
      <Route path="/dashboard/admin/meeting" element={<AdminMeetingPage />} />
      <Route path="/dashboard/admin/finance" element={<AdminFinancePage />} />


      <Route path="/dashboard/student/complaints" element={<StudentComplaintPage />} />


      <Route path="/dashboard/teacher/meeting" element={<TeacherMeetingPage />} />

=======
      
      <Route path ="/dashboard/student/assignment" element={<StudentAssignment />} />
      <Route path ="/dashboard/student" element={<StudentDashboard />} />
>>>>>>> 6e68262 (Add assignment page)




    </Routes>
    //   </Router> 
    // </BrowserRouter>
  )
}

export default App