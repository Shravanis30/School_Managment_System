import Sidebar from '../../components/Sidebar';

const TeacherDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="teacher" />
      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
        <p>Welcome, Teacher! Here you can manage classes, mark attendance, and assign work.</p>
      </main>
    </div>
  );
};

export default TeacherDashboard;
