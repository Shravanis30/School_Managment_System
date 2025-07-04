// // AdminFinancePage.jsx
// import React, { useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';

// const tabs = [
//   'Fee Structure',
//   'Collection',
//   'Pending Payments',
//   'Receipts',
//   'Reports'
// ];

// const AdminFinancePage = () => {
//   const [activeTab, setActiveTab] = useState('Fee Structure');

//   const feeData = [
//     { class: '1', term1: 5000, term2: 5000 },
//     { class: '2', term1: 5200, term2: 5200 },
//     { class: '3', term1: 5500, term2: 5500 },
//   ];

//   return (

//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="admin" />
//       <div className="flex-1 p-6">
//         <Header/>

//         {/* Tab Selector */}
//         <div className="mb-6">
//           <div className="flex flex-wrap gap-2 bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-inner border border-white/10">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${activeTab === tab
//                     ? 'bg-white text-black font-semibold shadow-lg'
//                     : 'text-white hover:bg-white/20'
//                   }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Fee Structure Table */}
//         {activeTab === 'Fee Structure' && (
//           <div className="overflow-x-auto bg-white/5 rounded-xl shadow-md p-4 backdrop-blur-md border border-white/10">
//             <h2 className="text-xl font-semibold mb-4">Fee Structure</h2>
//             <table className="w-full text-left text-sm">
//               <thead>
//                 <tr className="text-white/80">
//                   <th className="p-2">Class</th>
//                   <th className="p-2">Term 1 Fee (₹)</th>
//                   <th className="p-2">Term 2 Fee (₹)</th>
//                   <th className="p-2">Total Annual Fee (₹)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {feeData.map((row, idx) => (
//                   <tr
//                     key={idx}
//                     className="bg-white/5 hover:bg-white/10 transition-all border-b border-white/10"
//                   >
//                     <td className="p-2">{row.class}</td>
//                     <td className="p-2">{row.term1.toLocaleString()}</td>
//                     <td className="p-2">{row.term2.toLocaleString()}</td>
//                     <td className="p-2 font-semibold text-green-400">
//                       {(row.term1 + row.term2).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Other Tabs Placeholder */}
//         {activeTab !== 'Fee Structure' && (
//           <div className="mt-10 bg-white/5 p-6 rounded-xl backdrop-blur-md text-white/80 text-sm border border-white/10">
//             <p>
//               This is the{' '}
//               <span className="text-white font-semibold">{activeTab}</span>{' '}
//               section. Functionality will be implemented here.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminFinancePage;

import React, { useState, useEffect } from "react";
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const tabs = ["Fee Structure", "Collection", "Pending Payments", "Receipts"];

export default function AdminFinancePage() {
  const [activeTab, setActiveTab] = useState("Fee Structure");
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);
  const [feeStruct, setFeeStruct] = useState({ term1: "", term2: "" });
  const [collection, setCollection] = useState([]);
  const [pending, setPending] = useState([]);

  const fetchClasses = async () => {
    const res = await fetch("/api/classes", { credentials: "include" });
    const data = await res.json();
    setClasses(data);
    if (data.length > 0) setSelectedClass(data[0].name);
  };

  const fetchStruct = () => {
    if (!selectedClass) return;
    fetch(`/api/fees/structure?className=${selectedClass}`, { credentials: "include" })
      .then(r => r.json()).then(setFeeStruct);
  };

  const saveStruct = () => {
    fetch("/api/fees/structure", {
      method: "POST", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ className: selectedClass, term1: +feeStruct.term1, term2: +feeStruct.term2 })
    }).then(fetchStruct);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchStruct();
  }, [selectedClass]);

  useEffect(() => {
    if (activeTab === "Collection") {
      fetch("/api/fees/collection", { credentials: "include" }).then(r => r.json()).then(setCollection);
    }
    if (activeTab === "Pending Payments") {
      fetch("/api/fees/pending", { credentials: "include" }).then(r => r.json()).then(setPending);
    }
  }, [activeTab]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header />

        {/* Tabs */}
        <div className="mb-6 flex gap-2 bg-white/10 p-2 rounded-xl shadow-inner border border-white/10">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${activeTab === tab ? "bg-white text-black font-semibold shadow-lg" : "text-white hover:bg-white/20"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* 🎓 Fee Structure */}
        {activeTab === "Fee Structure" && (
          <div className="bg-white/5 p-4 rounded border border-white/10 backdrop-blur-md">
            <h2 className="text-xl font-semibold mb-4">Set Fee for Each Class</h2>
            <div className="mb-4">
              <label htmlFor="classSelect" className="mr-2 text-white/80">Select Class:</label>
              {/* <select id="classSelect" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
                className="p-2 bg-gray-800 rounded">
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select> */}

              <select
                id="classSelect"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="p-2 bg-gray-800 rounded"
              >
                {classes.map(cls => (
                  <option key={cls._id} value={cls.name}>
                    {cls.name}
                  </option>
                ))}
              </select>


            </div>
            <div className="flex gap-3">
              <input type="number" placeholder="Term 1"
                value={feeStruct.term1} onChange={e => setFeeStruct({ ...feeStruct, term1: e.target.value })}
                className="p-2 rounded bg-gray-800" />
              <input type="number" placeholder="Term 2"
                value={feeStruct.term2} onChange={e => setFeeStruct({ ...feeStruct, term2: e.target.value })}
                className="p-2 rounded bg-gray-800" />
              <button onClick={saveStruct}
                className="bg-green-500 px-3 py-1 rounded text-black font-semibold">Save</button>
            </div>
            {feeStruct.term1 && (
              <p className="mt-4 text-white/80">
                Current Fee for <span className="font-bold text-white">{selectedClass}</span> — Term1: ₹{feeStruct.term1}, Term2: ₹{feeStruct.term2}, Annual: ₹{+feeStruct.term1 + +feeStruct.term2}
              </p>
            )}
          </div>
        )}

        {/* 🧾 Collection */}
        {activeTab === "Collection" && (
          <div className="bg-white/5 p-4 rounded overflow-x-auto border border-white/10">
            <h2 className="text-xl font-semibold mb-4">All Payments</h2>
            <table className="w-full text-sm">
              <thead><tr>
                {["Student", "Class", "Term1 Paid", "Term2 Paid"].map(h => (
                  <th key={h} className="p-2 text-left text-white/80">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {collection.map(r =>
                  <tr key={r._id} className="border-b border-white/10 hover:bg-white/10">
                    <td className="p-2">{r.studentId.name}</td>
                    <td className="p-2">{r.studentId.className}</td>
                    <td className="p-2 text-green-400">₹{r.paidTerm1}</td>
                    <td className="p-2 text-green-400">₹{r.paidTerm2}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 🚨 Pending */}
        {activeTab === "Pending Payments" && (
          <div className="bg-white/5 p-4 rounded overflow-x-auto border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Students with Dues</h2>
            <table className="w-full text-sm">
              <thead><tr>
                {["Student", "Class", "Term1 Due", "Term2 Due"].map(h => (
                  <th key={h} className="p-2 text-left text-white/80">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {pending.map(r => (
                  <tr key={r._id} className="border-b border-white/10 hover:bg-white/10">
                    <td className="p-2">{r.studentId.name}</td>
                    <td className="p-2">{r.studentId.className}</td>
                    <td className="p-2 text-red-400">₹{r.dueTerm1}</td>
                    <td className="p-2 text-red-400">₹{r.dueTerm2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Receipts placeholder */}
        {activeTab === "Receipts" && (
          <div className="mt-10 bg-white/5 p-6 rounded border border-white/10 text-white/80">
            Receipts will go here.
          </div>
        )}
      </div>
    </div>
  );
}