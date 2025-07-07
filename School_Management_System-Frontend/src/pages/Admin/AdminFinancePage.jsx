
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
  const [transactions, setTransactions] = useState([]); // Renamed from collection
  const [pending, setPending] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [feeStructures, setFeeStructures] = useState([]); // For all classes fee structure
  const [loadingStructures, setLoadingStructures] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

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

  const fetchAllFeeStructures = async () => {
    setLoadingStructures(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fees/all-structures`, { 
        credentials: "include" 
      });
      const data = await res.json();
      setFeeStructures(data);
    } catch (error) {
      console.error("Error fetching all fee structures:", error);
    } finally {
      setLoadingStructures(false);
    }
  };

  const saveStruct = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fees/structure`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          className: selectedClass, 
          term1: +feeStruct.term1, 
          term2: +feeStruct.term2 
        })
      });
      
      if (!res.ok) throw new Error("Failed to save fee structure");
      
      const data = await res.json();
      setFeeStruct(data);
      setIsEditing(false);
      
      // Update the feeStructures array
      setFeeStructures(prev => {
        const existingIndex = prev.findIndex(fs => fs.className === data.className);
        if (existingIndex !== -1) {
          return prev.map(fs => fs.className === data.className ? data : fs);
        } else {
          return [...prev, data];
        }
      });
    } catch (error) {
      console.error("Save fee structure error:", error);
      alert("Failed to save fee structure. Please try again.");
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fees/collection`, { 
        credentials: "include" 
      });
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch transactions error:", error);
      setTransactions([]);
    }
  };

  const fetchPending = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fees/pending`, { 
        credentials: "include" 
      });
      if (!response.ok) throw new Error("Failed to fetch pending payments");
      const data = await response.json();
      setPending(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch pending error:", error);
      setPending([]);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      fetchStruct();
    }
  };

  const handlePrintReceipt = (txn) => {
    setSelectedReceipt(txn);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  useEffect(() => {
    fetchClasses();
    fetchAllFeeStructures();
  }, []);

  useEffect(() => {
    fetchStruct();
  }, [selectedClass]);

  useEffect(() => {
    if (activeTab === "Collection" || activeTab === "Receipts") {
      fetchTransactions();
    } else if (activeTab === "Pending Payments") {
      fetchPending();
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
              <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2 text-center">Fee Summary for {selectedClass}</h3>
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
            
            {/* All Classes Fee Structure Table */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">All Classes Fee Structure</h3>
              
              {loadingStructures ? (
                <div className="text-center py-4">
                  <p>Loading fee structures...</p>
                </div>
              ) : feeStructures.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="p-3 text-left">Class</th>
                        <th className="p-3 text-left">Term 1</th>
                        <th className="p-3 text-left">Term 2</th>
                        <th className="p-3 text-left">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeStructures.map((fs) => (
                        <tr key={fs._id} className="border-b border-white/10 hover:bg-white/10">
                          <td className="p-3">{fs.className}</td>
                          <td className="p-3">₹{fs.term1}</td>
                          <td className="p-3">₹{fs.term2}</td>
                          <td className="p-3 font-semibold text-green-400">
                            ₹{+fs.term1 + +fs.term2}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-800/50 p-8 rounded-lg text-center">
                  <p className="text-white/80">No fee structures found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🧾 Collection */}
        {activeTab === "Collection" && (
          <div className="bg-white/5 p-6 rounded overflow-x-auto border border-white/10 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Payments</h2>
              <div className="text-sm text-blue-300">
                {transactions.length} transactions
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
                  {transactions.map(txn => (
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

        {/* 📄 Receipts Section */}
        {activeTab === "Receipts" && (
          <div className="bg-white/5 p-6 rounded border border-white/10 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Fee Receipts</h2>
              <div className="text-sm text-blue-300">
                {transactions.length} receipts available
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transactions.map(txn => (
                <div key={txn._id} className="bg-gray-800/50 p-4 rounded-lg border border-white/10">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{txn.studentId?.name || "Student"}</h3>
                      <p className="text-sm text-gray-400">{txn.studentId?.className || "Class"}</p>
                    </div>
                    <span className="bg-green-900/30 text-green-300 text-xs px-2 py-1 rounded">
                      Paid
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Term</p>
                      <p className="font-medium capitalize">{txn.term}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Amount</p>
                      <p className="font-medium text-green-400">₹{txn.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Date</p>
                      <p className="font-medium">{new Date(txn.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Payment ID</p>
                      <p className="font-medium text-xs truncate">{txn.razorpay_payment_id}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handlePrintReceipt(txn)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
                  >
                    Download Receipt
                  </button>
                </div>
              ))}
            </div>
            
            {transactions.length === 0 && (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium">No receipts found</h3>
                <p className="text-gray-400 mt-2">
                  Payment receipts will appear here once students make payments
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Printable Receipt */}
      {selectedReceipt && (
        <div className="hidden print:block absolute inset-0 bg-white p-8 text-black">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">School Management System</h1>
              <p className="text-gray-600">Official Fee Receipt</p>
            </div>
            
            <div className="flex justify-between mb-6">
              <div>
                <p className="font-semibold">Receipt No: {selectedReceipt.razorpay_payment_id}</p>
                <p>Date: {new Date(selectedReceipt.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p>Status: <span className="text-green-600 font-semibold">Paid</span></p>
              </div>
            </div>
            
            <div className="border-t border-b py-4 my-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Student Name</p>
                  <p className="font-semibold">{selectedReceipt.studentId?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-600">Class</p>
                  <p className="font-semibold">{selectedReceipt.studentId?.className || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-600">Term</p>
                  <p className="font-semibold capitalize">{selectedReceipt.term}</p>
                </div>
                <div>
                  <p className="text-gray-600">Payment Method</p>
                  <p className="font-semibold">Online (Razorpay)</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-2">Description</th>
                    <th className="text-right p-2">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2">Tuition Fee ({selectedReceipt.term})</td>
                    <td className="p-2 text-right">₹{selectedReceipt.amount}</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="p-2 font-semibold">Total</td>
                    <td className="p-2 text-right font-semibold">₹{selectedReceipt.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">This is an official receipt. No signature required.</p>
              <p className="text-sm text-gray-500 mt-2">
                Payment ID: {selectedReceipt.razorpay_payment_id} | 
                Order ID: {selectedReceipt.razorpay_order_id}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}