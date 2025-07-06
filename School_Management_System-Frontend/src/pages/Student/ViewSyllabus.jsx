

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const ViewSyllabus = ({ className = "10" }) => {
  const [syllabusURL, setSyllabusURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fileInfo, setFileInfo] = useState({ name: "", size: "", type: "" });

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/syllabus/${className}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch syllabus: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        setSyllabusURL(data.syllabusURL || "");

        // Extract file info from URL
        if (data.syllabusURL) {
          const pathParts = data.syllabusURL.split('/');
          const fileName = pathParts[pathParts.length - 1];
          const fileExt = fileName.split('.').pop()?.toUpperCase() || "PDF";
          setFileInfo({
            name: fileName,
            type: fileExt,
            size: "1.5 MB"
          });
        }
      } catch (err) {
        console.error("Error fetching syllabus:", err);
        setError(err.message || "Syllabus not found for this class.");
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabus();
  }, [className]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="student" />
      <div className="flex flex-col w-full">
        <div className="p-6">
          <Header />

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Class Syllabus
                </h1>
                <p className="text-blue-300 mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
                  </svg>
                  Syllabus for Class {className}
                </p>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>

            {loading ? (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 animate-pulse">
                <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
                <div className="h-40 bg-gray-800 rounded-lg"></div>
                <div className="flex mt-6 gap-4">
                  <div className="h-12 bg-gray-700 rounded-lg w-1/2"></div>
                  <div className="h-12 bg-gray-700 rounded-lg w-1/2"></div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold mb-2">Syllabus Not Available</h2>
                <p className="text-red-300 mb-4 text-center max-w-md">
                  {error.includes("not found")
                    ? `The syllabus for Class ${className} hasn't been uploaded yet.`
                    : error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all"
                >
                  Try Again
                </button>
              </div>
            ) : syllabusURL ? (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-xl">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2 text-blue-300">Class {className} Syllabus</h2>
                      <p className="text-gray-300 mb-4">
                        This document contains the complete curriculum, topics, and schedule for your class.
                        It serves as a roadmap for the academic year, outlining what you'll learn each term.
                      </p>

                      <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold mb-2 text-purple-300 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Syllabus Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-400">Class</div>
                            <div className="font-medium">Class {className}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">File Type</div>
                            <div className="font-medium">{fileInfo.type}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">File Size</div>
                            <div className="font-medium">{fileInfo.size}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Academic Year</div>
                            <div className="font-medium">2024-2025</div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-semibold mb-2 text-green-300 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Key Information
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-300">
                          <li>Complete list of topics covered each term</li>
                          <li>Important dates and assessment schedules</li>
                          <li>Recommended textbooks and resources</li>
                          <li>Grading criteria and evaluation methods</li>
                        </ul>
                      </div>
                    </div>

                    <div className="md:w-1/3 flex flex-col">
                      <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center text-center h-64 mb-4">
                        <div className="bg-gray-800/50 p-3 rounded-full mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-1">Class Syllabus</h3>
                        <p className="text-sm text-gray-400">{fileInfo.name}</p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <a
                          href={syllabusURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 py-3 px-4 rounded-lg text-center font-medium flex items-center justify-center transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Syllabus
                        </a>

                        <a
                          href={syllabusURL}
                          download
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 py-3 px-4 rounded-lg text-center font-medium flex items-center justify-center transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download PDF
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 flex flex-col items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-xl font-bold mb-2">Syllabus Not Available</h2>
                <p className="text-gray-400 max-w-md">
                  The syllabus for Class {className} hasn't been published yet.
                  Please check back later or contact your class coordinator.
                </p>
              </div>
            )}

            {/* Syllabus Guidelines */}
            <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
              <h2 className="font-bold text-lg mb-4 text-blue-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Understanding Your Syllabus
              </h2>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  The syllabus is your academic roadmap for the entire year
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  It outlines all topics, assignments, and exams you'll encounter
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Refer to it regularly to stay on track with your studies
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Pay special attention to assessment dates and grading criteria
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Contact your teacher if you have any questions about the content
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSyllabus;