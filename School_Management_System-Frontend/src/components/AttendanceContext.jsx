import React, { createContext, useContext, useEffect, useState } from 'react';

const AttendanceContext = createContext();

export const useAttendance = () => useContext(AttendanceContext);

const ATTENDANCE_KEY = 'attendanceData';

export const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState(() => {
    const stored = localStorage.getItem(ATTENDANCE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(attendance));
  }, [attendance]);

  const markAttendance = (studentId, date, status) => {
    setAttendance(prev => {
      const updated = { ...prev };
      if (!updated[studentId]) updated[studentId] = {};
      updated[studentId][date] = status;
      return updated;
    });
  };

  const getAttendance = (studentId) => attendance[studentId] || {};

  return (
    <AttendanceContext.Provider value={{ attendance, markAttendance, getAttendance }}>
      {children}
    </AttendanceContext.Provider>
  );
}; 