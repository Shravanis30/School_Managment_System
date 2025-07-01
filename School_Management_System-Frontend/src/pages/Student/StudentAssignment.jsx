import React, { useState } from "react";

const assignmentsData = [
  { title: "Human Computer Interaction", due: "07/01/2023", submitted: false },
  { title: "Computer Intelligence", due: "05/01/2023", submitted: false },
  { title: "Java Programming", due: "09/01/2023", submitted: true },
  { title: "Computer Networking", due: "11/01/2023", submitted: true },
  { title: "Data Science Theory", due: "04/01/2023", submitted: false },
];

export default function StudentAssignmentUI() {
  const [assignments, setAssignments] = useState(assignmentsData);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const submittedCount = assignments.filter((a) => a.submitted).length;
  const progressPercent = (submittedCount / assignments.length) * 100;

  const openUploadScreen = (index) => {
    setCurrentIndex(index);
    setShowUpload(true);
  };

  const uploadNow = () => {
    const updated = [...assignments];
    updated[currentIndex].submitted = true;
    setAssignments(updated);
    setShowUpload(false);
  };

  return (
    <div className="min-h-screen bg-blue-100 font-sans p-4">
      {!showUpload ? (
        <div className="max-w-md mx-auto bg-blue-500 text-white p-6 rounded-2xl">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl">📚</h3>
            <div className="flex gap-2 items-center">
              <button className="bg-white/20 p-2 rounded-full">
                <img src="https://www.svgrepo.com/show/510926/search.svg" alt="Search" className="w-4 h-4" />
              </button>
              <button className="bg-white/20 p-2 rounded-full">
                <img src="https://www.svgrepo.com/show/510921/bell.svg" alt="Notifications" className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                <img src="https://www.svgrepo.com/show/510928/user-circle.svg" alt="Profile" className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Assignment Header */}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-lg font-semibold">My Assignments</h2>
            <input type="date" className="rounded px-2 py-1 text-black text-sm" />
          </div>

          {/* Progress Bar */}
          <div className="text-center mt-4">
            <p>Assignment Progress</p>
            <div className="bg-blue-300 h-2 rounded-full">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="mt-1">{submittedCount}/{assignments.length}</p>
          </div>

          {/* Assignment List */}
          <div className="mt-6 flex flex-col gap-3">
            {assignments.map((assignment, index) => (
              <div key={index} className="bg-white text-black rounded-lg px-4 py-2 flex justify-between items-center">
                <div>
                  <p>{assignment.title}</p>
                  <small className="text-gray-500 text-xs">Submit before {assignment.due}</small>
                </div>
                <button
                  className={`px-4 py-1 rounded-full text-sm ${assignment.submitted ? "bg-gray-300 text-white" : "bg-blue-500 text-white"}`}
                  disabled={assignment.submitted}
                  onClick={() => openUploadScreen(index)}
                >
                  {assignment.submitted ? "Submitted" : "Submit"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white p-6 rounded-2xl text-center">
          <button onClick={() => setShowUpload(false)} className="text-blue-500 text-sm mb-2">&larr; Back</button>
          <h2 className="text-xl font-semibold mb-2">{assignments[currentIndex].title}</h2>
          <p className="text-sm mb-4">Submit before: {assignments[currentIndex].due}</p>
          <img
            src="https://www.svgrepo.com/show/315849/upload-cloud.svg"
            alt="Upload"
            className="w-36 mx-auto mb-4"
          />
          <p className="text-sm text-gray-600">Upload your files<br/>(PDF, DOC or JPG)</p>
          <div className="flex gap-2 justify-center mt-4">
            <label className="bg-gray-200 px-4 py-2 rounded-full cursor-pointer">
              Browse File
              <input type="file" hidden />
            </label>
            <button onClick={uploadNow} className="bg-blue-500 text-white px-4 py-2 rounded-full">
              Upload Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
