import React, { useState } from "react";
import { Bell, Search, UserCircle2 } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-100 font-sans p-4 flex items-center justify-center">
      {!showUpload ? (
        <div className="w-full max-w-md bg-blue-600 text-white p-6 rounded-2xl shadow-2xl">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">📚</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assignments..."
                  className="pl-9 pr-3 py-1.5 w-40 rounded-full text-sm text-gray-800 bg-white outline-none placeholder-gray-500 shadow-md"
                />
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
              </div>
              <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full">
                <Bell className="w-5 h-5 text-white" />
              </button>
              <div className="bg-white/20 rounded-full p-1 border border-white">
                <UserCircle2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-lg font-bold">My Assignments</h2>
            <input
              type="date"
              className="rounded px-2 py-1 text-black text-sm bg-white outline-none shadow-sm"
            />
          </div>

          {/* Progress Bar */}
          <div className="text-center mt-4">
            <p className="font-medium">Assignment Progress</p>
            <div className="bg-blue-300 h-2 rounded-full mt-1">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="mt-1 font-semibold text-white">{submittedCount}/{assignments.length}</p>
          </div>

          {/* Assignment List */}
          <div className="mt-6 flex flex-col gap-3">
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((assignment, index) => (
                <div
                  key={index}
                  className="bg-white text-black rounded-xl px-4 py-3 flex justify-between items-center shadow-md"
                >
                  <div>
                    <p className="font-semibold">{assignment.title}</p>
                    <small className="text-gray-500 text-xs">Submit before {assignment.due}</small>
                  </div>
                  <button
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      assignment.submitted
                        ? "bg-gray-300 text-white cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={assignment.submitted}
                    onClick={() => openUploadScreen(index)}
                  >
                    {assignment.submitted ? "Submitted" : "Submit"}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-white mt-4 text-sm">No assignments found.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl text-center shadow-2xl">
          <button
            onClick={() => setShowUpload(false)}
            className="text-blue-600 text-sm mb-2 hover:underline"
          >
            &larr; Back
          </button>
          <h2 className="text-xl font-bold mb-2">
            {assignments[currentIndex].title}
          </h2>
          <p className="text-sm mb-4 text-gray-700">
            Submit before: {assignments[currentIndex].due}
          </p>
          <img
            src="https://www.svgrepo.com/show/315849/upload-cloud.svg"
            alt="Upload"
            className="w-36 mx-auto mb-4"
          />
          <p className="text-sm text-gray-600">
            Upload your files<br />(PDF, DOC or JPG)
          </p>
          <div className="flex gap-2 justify-center mt-4">
            <label className="bg-gray-200 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-300">
              Browse File
              <input type="file" hidden />
            </label>
            <button
              onClick={uploadNow}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            >
              Upload Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
