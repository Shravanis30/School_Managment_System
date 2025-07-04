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
import StudentComplaintPage from './pages/Student/StudentComplaintPage';
import AdminComplaintPage from './pages/Admin/AdminComplaintPage';
import AdminMeetingPage from './pages/Admin/AdminMeetingPage';
import TeacherMeetingPage from './pages/Teacher/TeacherMeetingPage';
import AdminFinancePage from './pages/Admin/AdminFinancePage';
import AllStudentsByClass from './pages/Teacher/AllStudentsByClass';
import ViewSyllabus from './pages/Student/ViewSyllabus';
import ViewTimetable from './pages/Student/ViewTimetable';
import StudentAssignments from './pages/Student/StudentAssignments';
import TeacherAssignments from './pages/Teacher/TeacherAssignment';
import TeacherProfile from './pages/Teacher/TeacherProfile'
import StudentProfile from './pages/Student/StudentProfile'
import AdminProfile from './pages/Admin/AdminProfile'
import StudentLeaveForm from './pages/Student/StudentLeaveForm';
import TeacherLeaveList from './pages/Teacher/TeacherLeaveList';
import StudentAttendance from './pages/Student/StudentAttendance';
import TeacherAttendance from './pages/Teacher/TeacherAttendance';
import StudentResults from './pages/Student/StudentResult';
import UploadResources from './pages/Teacher/UploadResources';
import ViewResources from './pages/Student/ViewResources';
import StudentFees from './pages/Student/StudentFees';

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
      <Route path="/dashboard/admin/teachers" element={<AdminTeachers />} />
      <Route path="/dashboard/admin/fees" element={<AdminFees />} />
      <Route path="/dashboard/admin/classes" element={<AdminClasses />} />
      <Route path="/dashboard/admin/academics" element={<AdminAcademics />} />
      <Route path="/dashboard/admin/events" element={<AdminEvents />} />
      <Route path="/dashboard/admin/complaints" element={<AdminComplaintPage />} />
      <Route path="/dashboard/admin/meeting" element={<AdminMeetingPage />} />
      <Route path="/dashboard/admin/finance" element={<AdminFinancePage />} />
      <Route path="/admin/profile" element={<AdminProfile />} />


      <Route path="/dashboard/student/complaints" element={<StudentComplaintPage />} />
      <Route path="/dashboard/student/syllabus" element={<ViewSyllabus />} />
      <Route path="/dashboard/student/timetable" element={<ViewTimetable />} />
      <Route path="/dashboard/student/assignments" element={<StudentAssignments />} />
      <Route path="dashboard/student/profile" element={<StudentProfile />} />
      <Route path="dashboard/student/leave" element={<StudentLeaveForm />} />
      <Route path="/dashboard/student/attendance" element={<StudentAttendance />} />
      <Route path="/dashboard/student/result" element={<StudentResults />} />
      <Route path="/dashboard/student/resources" element={<ViewResources />} />
      <Route path="/dashboard/student/fees" element={<StudentFees />} />


      <Route path="/dashboard/teacher/meeting" element={<TeacherMeetingPage />} />
      <Route path="/dashboard/teacher/students" element={<AllStudentsByClass />} />
      <Route path="/dashboard/teacher/assignments" element={<TeacherAssignments />} />
      <Route path="dashboard/teacher/profile" element={<TeacherProfile />} />
      <Route path="dashboard/teacher/leaves" element={<TeacherLeaveList />} />
      <Route path="/dashboard/teacher/attendance" element={<TeacherAttendance />} />
      <Route path="/dashboard/teacher/resources" element={<UploadResources />} />
    </Routes>
    //   </Router>
    // </BrowserRouter>
  )
}

export default App