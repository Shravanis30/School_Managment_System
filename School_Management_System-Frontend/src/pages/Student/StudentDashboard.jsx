import Sidebar from '../../components/Sidebar';

const StudentDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="student" />
      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
        <p>Welcome, Student! Here you can view your attendance, grades, and school announcements.</p>
      </main>
    </div>
  );
};

export default StudentDashboard;
