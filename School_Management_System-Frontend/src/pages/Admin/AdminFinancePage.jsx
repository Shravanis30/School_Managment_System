
// import React, { useState, useEffect } from "react";
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';

// const tabs = ["Fee Structure", "Collection", "Pending Payments", "Receipts"];

// export default function AdminFinancePage() {
//   const [activeTab, setActiveTab] = useState("Fee Structure");
//   const [selectedClass, setSelectedClass] = useState("");
//   const [classes, setClasses] = useState([]);
//   const [feeStruct, setFeeStruct] = useState({ term1: "", term2: "" });
//   const [collection, setCollection] = useState([]);
//   const [pending, setPending] = useState([]);

//   const fetchClasses = async () => {
//     const res = await fetch("/api/classes", { credentials: "include" });
//     const data = await res.json();
//     setClasses(data);
//     if (data.length > 0) setSelectedClass(data[0].name);
//   };

//   const fetchStruct = () => {
//     if (!selectedClass) return;
//     fetch(`/api/fees/structure?className=${selectedClass}`, { credentials: "include" })
//       .then(r => r.json()).then(setFeeStruct);
//   };

//   const saveStruct = () => {
//     fetch("/api/fees/structure", {
//       method: "POST", credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ className: selectedClass, term1: +feeStruct.term1, term2: +feeStruct.term2 })
//     }).then(fetchStruct);
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     fetchStruct();
//   }, [selectedClass]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (activeTab === "Collection") {
//           const response = await fetch("/api/fees/collection", { credentials: "include" });
//           if (!response.ok) throw new Error("Failed to fetch collection");
//           const data = await response.json();
//           setCollection(Array.isArray(data) ? data : []);
//         }

//         if (activeTab === "Pending Payments") {
//           const response = await fetch("/api/fees/pending", { credentials: "include" });
//           if (!response.ok) throw new Error("Failed to fetch pending payments");
//           const data = await response.json();
//           setPending(Array.isArray(data) ? data : []);
//         }
//       } catch (error) {
//         console.error(error);
//         if (activeTab === "Collection") setCollection([]);
//         if (activeTab === "Pending Payments") setPending([]);
//       }
//     };

//     fetchData();
//   }, [activeTab]);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="admin" />
//       <div className="flex-1 p-6">
//         <Header />

//         {/* Tabs */}
//         <div className="mb-6 flex gap-2 bg-white/10 p-2 rounded-xl shadow-inner border border-white/10">
//           {tabs.map(tab => (
//             <button key={tab} onClick={() => setActiveTab(tab)}
//               className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${activeTab === tab ? "bg-white text-black font-semibold shadow-lg" : "text-white hover:bg-white/20"}`}>
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* 🎓 Fee Structure */}
//         {activeTab === "Fee Structure" && (
//           <div className="bg-white/5 p-4 rounded border border-white/10 backdrop-blur-md">
//             <h2 className="text-xl font-semibold mb-4">Set Fee for Each Class</h2>
//             <div className="mb-4">
//               <label htmlFor="classSelect" className="mr-2 text-white/80">Select Class:</label>
//               {/* <select id="classSelect" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
//                 className="p-2 bg-gray-800 rounded">
//                 {classes.map(cls => (
//                   <option key={cls} value={cls}>{cls}</option>
//                 ))}
//               </select> */}

//               <select
//                 id="classSelect"
//                 value={selectedClass}
//                 onChange={(e) => setSelectedClass(e.target.value)}
//                 className="p-2 bg-gray-800 rounded"
//               >
//                 {classes.map(cls => (
//                   <option key={cls._id} value={cls.name}>
//                     {cls.name}
//                   </option>
//                 ))}
//               </select>


//             </div>
//             <div className="flex gap-3">
//               <input type="number" placeholder="Term 1"
//                 value={feeStruct.term1} onChange={e => setFeeStruct({ ...feeStruct, term1: e.target.value })}
//                 className="p-2 rounded bg-gray-800" />
//               <input type="number" placeholder="Term 2"
//                 value={feeStruct.term2} onChange={e => setFeeStruct({ ...feeStruct, term2: e.target.value })}
//                 className="p-2 rounded bg-gray-800" />
//               <button onClick={saveStruct}
//                 className="bg-green-500 px-3 py-1 rounded text-black font-semibold">Save</button>
//             </div>
//             {feeStruct.term1 && (
//               <p className="mt-4 text-white/80">
//                 Current Fee for <span className="font-bold text-white">{selectedClass}</span> — Term1: ₹{feeStruct.term1}, Term2: ₹{feeStruct.term2}, Annual: ₹{+feeStruct.term1 + +feeStruct.term2}
//               </p>
//             )}
//           </div>
//         )}

//         {/* 🧾 Collection */}
//         {activeTab === "Collection" && (
//           <div className="bg-white/5 p-4 rounded overflow-x-auto border border-white/10">
//             <h2 className="text-xl font-semibold mb-4">All Payments</h2>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr>
//                   {["Student", "Class", "Term", "Amount", "Payment ID", "Date"].map(h => (
//                     <th key={h} className="p-2 text-left text-white/80">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {collection.map(txn => (
//                   <tr key={txn._id} className="border-b border-white/10 hover:bg-white/10">
//                     <td className="p-2">{txn.studentId?.name || "N/A"}</td>
//                     <td className="p-2">{txn.studentId?.className || "N/A"}</td>
//                     <td className="p-2 capitalize">{txn.term}</td>
//                     <td className="p-2 text-green-400">₹{txn.amount}</td>
//                     <td className="p-2 text-blue-400 font-mono text-xs">{txn.razorpay_payment_id}</td>
//                     <td className="p-2">{new Date(txn.createdAt).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}


//         {/* 🚨 Pending */}
//         {activeTab === "Pending Payments" && (
//           <div className="bg-white/5 p-4 rounded overflow-x-auto border border-white/10">
//             <h2 className="text-xl font-semibold mb-4">Students with Dues</h2>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr>
//                   {["Student", "Class", "Term1 Due", "Term2 Due", "Total Due"].map(h => (
//                     <th key={h} className="p-2 text-left text-white/80">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {pending.map(student => (
//                   <tr key={student.studentId} className="border-b border-white/10 hover:bg-white/10">
//                     <td className="p-2">{student.name}</td>
//                     <td className="p-2">{student.className}</td>
//                     <td className="p-2 text-red-400">₹{student.dueTerm1}</td>
//                     <td className="p-2 text-red-400">₹{student.dueTerm2}</td>
//                     <td className="p-2 text-red-500 font-semibold">
//                       ₹{student.dueTerm1 + student.dueTerm2}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}


//         {/* Receipts placeholder */}
//         {activeTab === "Receipts" && (
//           <div className="mt-10 bg-white/5 p-6 rounded border border-white/10 text-white/80">
//             Receipts will go here.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


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
  const [isEditing, setIsEditing] = useState(false);

  const fetchClasses = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, { credentials: "include" });
    const data = await res.json();
    setClasses(data);
    if (data.length > 0) setSelectedClass(data[0].name);
  };

  const fetchStruct = () => {
    if (!selectedClass) return;
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fees/structure?className=${selectedClass}`, { credentials: "include" })
      .then(r => r.json()).then(setFeeStruct);
  };

  const saveStruct = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fees/structure`, {
      method: "POST", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ className: selectedClass, term1: +feeStruct.term1, term2: +feeStruct.term2 })
    })
    .then(() => {
      fetchStruct();
      setIsEditing(false);
    });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    fetchStruct();
  }, [selectedClass]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "Collection") {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fees/collection`, { credentials: "include" });
          if (!response.ok) throw new Error("Failed to fetch collection");
          const data = await response.json();
          setCollection(Array.isArray(data) ? data : []);
        }

        if (activeTab === "Pending Payments") {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fees/pending`, { credentials: "include" });
          if (!response.ok) throw new Error("Failed to fetch pending payments");
          const data = await response.json();
          setPending(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error(error);
        if (activeTab === "Collection") setCollection([]);
        if (activeTab === "Pending Payments") setPending([]);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Reset to original values when canceling edit
      fetchStruct();
    }
  };

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
          <div className="bg-white/5 p-6 rounded border border-white/10 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Set Fee for Each Class</h2>
              {isEditing ? (
                <div className="flex gap-2">
                  <button 
                    onClick={saveStruct}
                    className="bg-green-500 px-3 py-1 rounded text-black font-semibold"
                  >
                    Save
                  </button>
                  <button 
                    onClick={handleEditToggle}
                    className="bg-gray-500 px-3 py-1 rounded text-white font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleEditToggle}
                  className="bg-blue-500 px-3 py-1 rounded text-white font-semibold"
                >
                  Edit
                </button>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="classSelect" className="mr-2 text-white/80">Select Class:</label>
              <select
                id="classSelect"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="p-2 bg-gray-800 rounded"
                disabled={isEditing}
              >
                {classes.map(cls => (
                  <option key={cls._id} value={cls.name}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white/80 mb-1">Term 1 Fee</label>
                <input 
                  type="number" 
                  value={feeStruct.term1} 
                  onChange={e => setFeeStruct({ ...feeStruct, term1: e.target.value })} 
                  className="w-full p-2 rounded bg-gray-800"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1">Term 2 Fee</label>
                <input 
                  type="number" 
                  value={feeStruct.term2} 
                  onChange={e => setFeeStruct({ ...feeStruct, term2: e.target.value })} 
                  className="w-full p-2 rounded bg-gray-800"
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            {feeStruct.term1 && (
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Fee Summary for {selectedClass}</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-900/30 rounded">
                    <p className="text-sm text-blue-300">Term 1</p>
                    <p className="text-xl font-bold">₹{feeStruct.term1}</p>
                  </div>
                  <div className="text-center p-3 bg-purple-900/30 rounded">
                    <p className="text-sm text-purple-300">Term 2</p>
                    <p className="text-xl font-bold">₹{feeStruct.term2}</p>
                  </div>
                  <div className="text-center p-3 bg-green-900/30 rounded">
                    <p className="text-sm text-green-300">Total Annual</p>
                    <p className="text-xl font-bold">₹{+feeStruct.term1 + +feeStruct.term2}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 🧾 Collection */}
        {activeTab === "Collection" && (
          <div className="bg-white/5 p-6 rounded overflow-x-auto border border-white/10 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Payments</h2>
              <div className="text-sm text-blue-300">
                {collection.length} transactions
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800">
                    {["Student", "Class", "Term", "Amount", "Payment ID", "Date"].map(h => (
                      <th key={h} className="p-3 text-left text-white/80">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {collection.map(txn => (
                    <tr key={txn._id} className="border-b border-white/10 hover:bg-white/10">
                      <td className="p-3">{txn.studentId?.name || "N/A"}</td>
                      <td className="p-3">{txn.studentId?.className || "N/A"}</td>
                      <td className="p-3 capitalize">{txn.term}</td>
                      <td className="p-3 text-green-400">₹{txn.amount}</td>
                      <td className="p-3 text-blue-400 font-mono text-xs">{txn.razorpay_payment_id}</td>
                      <td className="p-3">{new Date(txn.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 🚨 Pending */}
        {activeTab === "Pending Payments" && (
          <div className="bg-white/5 p-6 rounded overflow-x-auto border border-white/10 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Students with Dues</h2>
              <div className="text-sm text-red-300">
                {pending.length} students with pending fees
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800">
                    {["Student", "Class", "Term1 Due", "Term2 Due", "Total Due"].map(h => (
                      <th key={h} className="p-3 text-left text-white/80">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pending.map(student => (
                    <tr key={student.studentId} className="border-b border-white/10 hover:bg-white/10">
                      <td className="p-3">{student.name}</td>
                      <td className="p-3">{student.className}</td>
                      <td className="p-3 text-red-400">₹{student.dueTerm1}</td>
                      <td className="p-3 text-red-400">₹{student.dueTerm2}</td>
                      <td className="p-3 text-red-500 font-semibold">
                        ₹{student.dueTerm1 + student.dueTerm2}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Receipts placeholder */}
        {activeTab === "Receipts" && (
          <div className="mt-10 bg-white/5 p-6 rounded border border-white/10 text-white/80">
            <h2 className="text-xl font-semibold mb-4">Fee Receipts</h2>
            <div className="bg-gray-800/50 p-8 rounded-lg text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium mb-2">Receipt Management</h3>
              <p className="text-gray-400">
                View and download payment receipts for all transactions.
                Feature coming soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}