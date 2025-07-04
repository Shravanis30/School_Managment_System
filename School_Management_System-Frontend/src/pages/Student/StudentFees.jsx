// // StudentFees.jsx
// import React, { useEffect, useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';

// const StudentFees = () => {
//   const [student, setStudent] = useState(null);
//   const [feeAmount, setFeeAmount] = useState(0);
//   const [paidFee, setPaidFee] = useState(0);

//   useEffect(() => {
//     fetch('/api/student/me', { credentials: 'include' })
//       .then(res => res.json())
//       .then(data => {
//         setStudent(data);
//         setPaidFee(data.paidFee || 0);

//         fetch('/api/fee-structure', { credentials: 'include' })
//           .then(res => res.json())
//           .then(feeData => setFeeAmount(feeData[data.className] || 0));
//       });
//   }, []);

//   const handlePay = async () => {
//     await fetch('/api/fee/pay', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify({ amount: feeAmount - paidFee }),
//     });
//     setPaidFee(feeAmount);
//   };

//   if (!student) return <div className="text-white p-6">Loading...</div>;

//   const due = feeAmount - paidFee;

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
//       <Sidebar role="student" />
//       <div className="flex-1 p-6">
//         <Header />
//         <div className="mt-10">
//           <h2 className="text-3xl font-bold mb-6">💳 Fee Payment</h2>

//           <div className="bg-white/10 p-6 rounded-xl shadow-lg space-y-4">
//             <p><strong>Name:</strong> {student.name}</p>
//             <p><strong>Class:</strong> {student.className}</p>
//             <p><strong>Total Fee:</strong> ₹{feeAmount}</p>
//             <p><strong>Paid:</strong> ₹{paidFee}</p>
//             <p><strong>Due:</strong> ₹{due}</p>

//             {due > 0 ? (
//               <button
//                 onClick={handlePay}
//                 className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
//               >
//                 Pay Now
//               </button>
//             ) : (
//               <span className="text-green-400">✅ All dues cleared!</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentFees;



// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";

// export default function StudentFees() {
//   const [structure, setStructure] = useState({});
//   const [paid, setPaid] = useState({ paidTerm1: 0, paidTerm2: 0 });
//   const [successMessage, setSuccessMessage] = useState({ term1: "", term2: "" });

//   useEffect(() => {
//     fetch("/api/fees/structure?className=my", { credentials: "include" })
//       .then((r) => r.json())
//       .then(setStructure);

//     fetch("/api/fees/payments", { credentials: "include" })
//       .then((r) => r.json())
//       .then(setPaid);
//   }, []);

//   const getDue = (term) =>
//     (structure[term] || 0) - (paid[`paid${term.charAt(0).toUpperCase() + term.slice(1)}`] || 0);

//   const pay = async (term) => {
//     const amount = getDue(term);
//     if (amount <= 0) return;

//     const res = await fetch("/api/fees/pay", {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ studentId: "myself", term, amount }),
//     });

//     if (res.ok) {
//       const updated = await fetch("/api/fees/payments", { credentials: "include" }).then((r) =>
//         r.json()
//       );
//       setPaid(updated);
//       setSuccessMessage((prev) => ({
//         ...prev,
//         [term]: `✅ ${term.toUpperCase()} fee paid successfully!`,
//       }));

//       // Auto-clear message after 4 seconds
//       setTimeout(() => {
//         setSuccessMessage((prev) => ({ ...prev, [term]: "" }));
//       }, 4000);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="student" />
//       <div className="flex-1 p-6">
//         <Header />
//         <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-md max-w-3xl mx-auto mt-6">
//           <h2 className="text-2xl font-semibold mb-6 text-center">Your Fee Status</h2>

//           {[ "term1", "term2" ].map((term) => {
//             const total = structure[term] || 0;
//             const paidAmt = paid[`paid${term.charAt(0).toUpperCase() + term.slice(1)}`] || 0;
//             const due = total - paidAmt;

//             return (
//               <div key={term} className="mb-6 bg-white/10 p-4 rounded-lg border border-white/20 shadow-inner">
//                 <p className="mb-2 text-white/90">
//                   <span className="font-semibold capitalize">{term}</span>: Paid ₹{paidAmt} of ₹{total}
//                 </p>

//                 {successMessage[term] && (
//                   <p className="text-green-400 mb-2">{successMessage[term]}</p>
//                 )}

//                 {due > 0 ? (
//                   <div className="flex justify-between items-center">
//                     <p className="text-red-400">₹{due} due</p>
//                     <button
//                       onClick={() => pay(term)}
//                       className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg"
//                     >
//                       Pay ₹{due}
//                     </button>
//                   </div>
//                 ) : (
//                   <p className="text-green-400">✅ Payment Completed</p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function StudentFees() {
  const [structure, setStructure] = useState({});
  const [paid, setPaid] = useState({ paidTerm1: 0, paidTerm2: 0 });
  const [successMessage, setSuccessMessage] = useState({ term1: "", term2: "", both: "" });

  const fetchFeeData = async () => {
    const structureRes = await fetch("/api/fees/my-structure", { credentials: "include" });
    const paidRes = await fetch("/api/fees/payments", { credentials: "include" });

    if (structureRes.ok) {
      const structureData = await structureRes.json();
      setStructure(structureData);
    }

    if (paidRes.ok) {
      const paidData = await paidRes.json();
      setPaid(paidData);
    }
  };

  useEffect(() => {
    fetchFeeData();
  }, []);

  const getDue = (term) =>
    (structure[term] || 0) - (paid[`paid${term.charAt(0).toUpperCase() + term.slice(1)}`] || 0);

  const pay = async (term) => {
    const amount = getDue(term);
    if (amount <= 0) return;

    const res = await fetch("/api/fees/pay", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ term, amount }),
    });

    if (res.ok) {
      await fetchFeeData();
      setSuccessMessage((prev) => ({
        ...prev,
        [term]: `✅ ${term.toUpperCase()} fee paid successfully!`,
      }));

      setTimeout(() => {
        setSuccessMessage((prev) => ({ ...prev, [term]: "" }));
      }, 4000);
    }
  };

  const payBoth = async () => {
    const due1 = getDue("term1");
    const due2 = getDue("term2");

    const promises = [];
    if (due1 > 0)
      promises.push(
        fetch("/api/fees/pay", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ term: "term1", amount: due1 }),
        })
      );

    if (due2 > 0)
      promises.push(
        fetch("/api/fees/pay", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ term: "term2", amount: due2 }),
        })
      );

    await Promise.all(promises);
    await fetchFeeData();
    setSuccessMessage({ term1: "", term2: "", both: "✅ Both term fees paid successfully!" });

    setTimeout(() => {
      setSuccessMessage({ term1: "", term2: "", both: "" });
    }, 4000);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="student" />
      <div className="flex-1 p-6">
        <Header />
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-md max-w-3xl mx-auto mt-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">Your Fee Status</h2>

          {[ "term1", "term2" ].map((term) => {
            const total = structure[term] || 0;
            const paidAmt = paid[`paid${term.charAt(0).toUpperCase() + term.slice(1)}`] || 0;
            const due = total - paidAmt;

            return (
              <div key={term} className="mb-6 bg-white/10 p-4 rounded-lg border border-white/20 shadow-inner">
                <p className="mb-2 text-white/90">
                  <span className="font-semibold capitalize">{term}</span>: Paid ₹{paidAmt} of ₹{total}
                </p>

                {successMessage[term] && (
                  <p className="text-green-400 mb-2">{successMessage[term]}</p>
                )}

                {due > 0 ? (
                  <div className="flex justify-between items-center">
                    <p className="text-red-400">₹{due} due</p>
                    <button
                      onClick={() => pay(term)}
                      className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg"
                    >
                      Pay ₹{due}
                    </button>
                  </div>
                ) : (
                  <p className="text-green-400">✅ Payment Completed</p>
                )}
              </div>
            );
          })}

          {/* Pay Both Terms */}
          {getDue("term1") > 0 || getDue("term2") > 0 ? (
            <div className="text-center mt-8">
              {successMessage.both && <p className="text-green-400 mb-2">{successMessage.both}</p>}
              <button
                onClick={payBoth}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg"
              >
                Pay All Remaining Fees
              </button>
            </div>
          ) : (
            <p className="text-center text-green-400 mt-6">🎉 All Fees Paid</p>
          )}
        </div>
      </div>
    </div>
  );
}
