// src/pages/student/StudentResult.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { FaDownload, FaSpinner } from 'react-icons/fa';

const StudentResults = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/results/student`, {
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 404) {
            setResult(null);
          } else {
            throw new Error('Failed to fetch result');
          }
        } else {
          const data = await response.json();
          setResult(data);
        }
      } catch (err) {
        console.error("Fetch result error:", err);
        setError('Failed to load result. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Sidebar role="student" />
      
      <div className="flex-1 p-4 md:p-8">
        <Header />
        
        <div className="max-w-7xl mx-auto mt-8">
          <h2 className="text-3xl font-bold text-white mb-8">My Results</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 shadow-2xl">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
                <p className="text-gray-300">Loading your result...</p>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-400 text-xl mb-4">Error</p>
                <p className="text-gray-300">{error}</p>
              </div>
            ) : result ? (
              <div className="flex flex-col items-center">
                <div className="bg-gray-900 rounded-xl p-8 text-center max-w-lg w-full">
                  <div className="bg-blue-600/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center">
                      <FaDownload className="text-2xl" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">Your Result is Ready!</h3>
                  <p className="text-gray-400 mb-6">
                    Uploaded on: {new Date(result.uploadedAt).toLocaleDateString()}
                  </p>
                  
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL}${result.fileUrl}`}
                    download="My_Result.pdf"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold flex items-center justify-center gap-2 w-full transition"
                  >
                    <FaDownload /> Download Result PDF
                  </a>
                  
                  <p className="mt-4 text-sm text-gray-500">
                    If you have any issues with your result, contact your class teacher
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="bg-gray-900/50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center">
                    <FaDownload className="text-xl text-gray-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">No Result Available Yet</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Your result has not been uploaded yet. Please check back later or contact your teacher.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;