
// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";

// export default function StudentFees() {
//   const [structure, setStructure] = useState({});
//   const [paid, setPaid] = useState({ paidTerm1: 0, paidTerm2: 0 });
//   const [successMessage, setSuccessMessage] = useState({ term1: "", term2: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [paymentProcessing, setPaymentProcessing] = useState(false);
//   const [paymentError, setPaymentError] = useState("");

//   const fetchFeeData = async () => {
//     try {
//       setError("");
//       setLoading(true);

//       const [structureRes, paidRes] = await Promise.all([
//         fetch("/api/fees/my-structure", { credentials: "include" }),
//         fetch("/api/fees/payments", { credentials: "include" })
//       ]);

//       if (!structureRes.ok) {
//         const errorData = await structureRes.json();
//         throw new Error(errorData.message || "Failed to fetch fee structure");
//       }

//       if (!paidRes.ok) {
//         const errorData = await paidRes.json();
//         throw new Error(errorData.message || "Failed to fetch payment data");
//       }

//       const structureData = await structureRes.json();
//       const paidData = await paidRes.json();

//       setStructure(structureData);
//       setPaid(paidData);
//     } catch (err) {
//       console.error("Error fetching fee data:", err);
//       setError(err.message || "Error fetching fee data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFeeData();
//   }, []);

//   const getDue = (term) => {
//     const termKey = `paid${term.charAt(0).toUpperCase() + term.slice(1)}`;
//     return (structure[term] || 0) - (paid[termKey] || 0);
//   };

//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   const pay = async (term) => {
//     try {
//       setPaymentProcessing(true);
//       setPaymentError("");

//       const amount = getDue(term);
//       if (amount <= 0) return;

//       // Validate minimum payment amount
//       if (amount < 1) {
//         throw new Error("Minimum payment amount is ₹1");
//       }

//       const loaded = await loadRazorpayScript();
//       if (!loaded) {
//         throw new Error("Failed to load Razorpay SDK");
//       }

//       const res = await fetch("/api/payment/create-order", {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount, term }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to create payment order");
//       }

//       const data = await res.json();

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: data.amount,
//         currency: data.currency,
//         name: "School Fee Payment",
//         description: `Payment for ${term}`,
//         order_id: data.orderId,
//         prefill: {
//           name: data.student?.name || "Student",
//           email: data.student?.email || "student@example.com",
//         },
//         handler: async function (response) {
//           try {
//             const verifyRes = await fetch("/api/payment/verify", {
//               method: "POST",
//               credentials: "include",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 term,
//                 amount,
//               }),
//             });

//             const result = await verifyRes.json();
//             if (result.success) {
//               await fetchFeeData();
//               setSuccessMessage((prev) => ({
//                 ...prev,
//                 [term]: `✅ ${term.toUpperCase()} fee paid successfully!`,
//               }));

//               setTimeout(() => {
//                 setSuccessMessage((prev) => ({ ...prev, [term]: "" }));
//               }, 4000);
//             } else {
//               throw new Error(result.message || "Payment verification failed");
//             }
//           } catch (error) {
//             console.error("Payment verification error:", error);
//             setPaymentError(`Payment failed: ${error.message}`);
//           }
//         },
//         theme: { color: "#0d9488" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       setPaymentError(
//         err.message.includes("Razorpay error")
//           ? "Payment system error. Please try again later."
//           : err.message || "Payment failed"
//       );
//     } finally {
//       setPaymentProcessing(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="student" />
//       <div className="flex-1 p-6">
//         <Header />
//         <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-md max-w-3xl mx-auto mt-6">
//           <h2 className="text-2xl font-semibold mb-6 text-center">Your Fee Status</h2>

//           {paymentError && (
//             <div className="mb-4 p-3 bg-red-900/30 rounded-md text-red-400 flex justify-between items-center">
//               <span>{paymentError}</span>
//               <button
//                 onClick={() => setPaymentError("")}
//                 className="text-white text-lg"
//               >
//                 ×
//               </button>
//             </div>
//           )}

//           {loading ? (
//             <div className="flex justify-center items-center h-40">
//               <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : error ? (
//             <div className="bg-red-900/30 p-4 rounded-lg text-center">
//               <p className="text-red-400">{error}</p>
//               <button
//                 onClick={fetchFeeData}
//                 className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md"
//               >
//                 Retry
//               </button>
//             </div>
//           ) : (
//             ["term1", "term2"].map((term) => {
//               const total = structure[term] || 0;
//               const paidKey = `paid${term.charAt(0).toUpperCase() + term.slice(1)}`;
//               const paidAmt = paid[paidKey] || 0;
//               const due = total - paidAmt;

//               return (
//                 <div key={term} className="mb-6 bg-white/10 p-4 rounded-lg border border-white/20 shadow-inner">
//                   <p className="mb-2 text-white/90">
//                     <span className="font-semibold capitalize">{term}</span>: Paid ₹{paidAmt} of ₹{total}
//                   </p>

//                   {successMessage[term] && (
//                     <p className="text-green-400 mb-2">{successMessage[term]}</p>
//                   )}

//                   {due > 0 ? (
//                     <div className="flex justify-between items-center">
//                       <p className="text-red-400">₹{due} due</p>
//                       <button
//                         onClick={() => pay(term)}
//                         disabled={paymentProcessing}
//                         className={`bg-green-500 text-black font-semibold px-4 py-2 rounded-lg transition-colors ${paymentProcessing
//                           ? "opacity-70 cursor-not-allowed"
//                           : "hover:bg-green-600"
//                           }`}
//                       >
//                         {paymentProcessing ? "Processing..." : `Pay ₹${due}`}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex justify-between items-center">
//                       <p className="text-green-400">✅ Payment Completed</p>
//                       <button
//                         className="bg-gray-600 cursor-not-allowed text-gray-400 font-semibold px-4 py-2 rounded-lg"
//                         disabled
//                       >
//                         Paid
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           )}
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
  const [successMessage, setSuccessMessage] = useState({ term1: "", term2: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [customAmounts, setCustomAmounts] = useState({ term1: 0, term2: 0 });

  const fetchFeeData = async () => {
    try {
      setError("");
      setLoading(true);

      const [structureRes, paidRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fees/my-structure`, { credentials: "include" }),
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fees/payments`, { credentials: "include" })
      ]);

      if (!structureRes.ok) {
        const errorData = await structureRes.json();
        throw new Error(errorData.message || "Failed to fetch fee structure");
      }

      if (!paidRes.ok) {
        const errorData = await paidRes.json();
        throw new Error(errorData.message || "Failed to fetch payment data");
      }

      const structureData = await structureRes.json();
      const paidData = await paidRes.json();

      setStructure(structureData);
      setPaid(paidData);
      
      // Initialize custom amounts with remaining dues
      setCustomAmounts({
        term1: Math.max(0, structureData.term1 - (paidData.paidTerm1 || 0)),
        term2: Math.max(0, structureData.term2 - (paidData.paidTerm2 || 0))
      });
    } catch (err) {
      console.error("Error fetching fee data:", err);
      setError(err.message || "Error fetching fee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeData();
  }, []);

  const getDue = (term) => {
    const termKey = `paid${term.charAt(0).toUpperCase() + term.slice(1)}`;
    return (structure[term] || 0) - (paid[termKey] || 0);
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const pay = async (term) => {
    try {
      setPaymentProcessing(true);
      setPaymentError("");

      const amount = customAmounts[term];
      if (amount <= 0) {
        throw new Error("Please enter a valid payment amount");
      }

      // Validate minimum payment amount
      if (amount < 1) {
        throw new Error("Minimum payment amount is ₹1");
      }

      // Validate against remaining due
      const due = getDue(term);
      if (amount > due) {
        throw new Error(`Payment amount exceeds due amount of ₹${due}`);
      }

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        throw new Error("Failed to load Razorpay SDK");
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, term }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create payment order");
      }

      const data = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "School Fee Payment",
        description: `Payment for ${term}`,
        order_id: data.orderId,
        prefill: {
          name: data.student?.name || "Student",
          email: data.student?.email || "student@example.com",
        },
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                term,
                amount,
              }),
            });

            const result = await verifyRes.json();
            if (result.success) {
              await fetchFeeData();
              setSuccessMessage((prev) => ({
                ...prev,
                [term]: `✅ ₹${amount} paid for ${term.toUpperCase()} successfully!`,
              }));

              setTimeout(() => {
                setSuccessMessage((prev) => ({ ...prev, [term]: "" }));
              }, 4000);
            } else {
              throw new Error(result.message || "Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            setPaymentError(`Payment failed: ${error.message}`);
          }
        },
        theme: { color: "#0d9488" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentError(
        err.message.includes("Razorpay error")
          ? "Payment system error. Please try again later."
          : err.message || "Payment failed"
      );
    } finally {
      setPaymentProcessing(false);
    }
  };

  const handleAmountChange = (term, value) => {
    const numericValue = parseFloat(value) || 0;
    const due = getDue(term);
    
    // Cap the value at the remaining due amount
    const cappedValue = Math.min(Math.max(numericValue, 0), due);
    
    setCustomAmounts(prev => ({
      ...prev,
      [term]: cappedValue
    }));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="student" />
      <div className="flex-1 p-6">
        <Header />
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-md max-w-3xl mx-auto mt-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">Your Fee Status</h2>

          {paymentError && (
            <div className="mb-4 p-3 bg-red-900/30 rounded-md text-red-400 flex justify-between items-center">
              <span>{paymentError}</span>
              <button
                onClick={() => setPaymentError("")}
                className="text-white text-lg"
              >
                ×
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/30 p-4 rounded-lg text-center">
              <p className="text-red-400">{error}</p>
              <button
                onClick={fetchFeeData}
                className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md"
              >
                Retry
              </button>
            </div>
          ) : (
            ["term1", "term2"].map((term) => {
              const total = structure[term] || 0;
              const paidKey = `paid${term.charAt(0).toUpperCase() + term.slice(1)}`;
              const paidAmt = paid[paidKey] || 0;
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
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-red-400">₹{due} due</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <label className="text-white/80">Pay Amount:</label>
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                          <input
                            type="number"
                            value={customAmounts[term]}
                            onChange={(e) => handleAmountChange(term, e.target.value)}
                            min="1"
                            max={due}
                            className="w-full pl-8 p-2 bg-gray-800 rounded-md text-white"
                            placeholder="Enter amount"
                          />
                        </div>
                        
                        <button
                          onClick={() => pay(term)}
                          disabled={paymentProcessing || customAmounts[term] <= 0}
                          className={`bg-green-500 text-black font-semibold px-4 py-2 rounded-lg transition-colors ${paymentProcessing || customAmounts[term] <= 0
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:bg-green-600"
                            }`}
                        >
                          {paymentProcessing ? "Processing..." : `Pay`}
                        </button>
                      </div>
                      
                      <div className="text-xs text-gray-400 mt-1">
                        {customAmounts[term] > 0 && (
                          <span>
                            After payment, ₹{due - customAmounts[term]} will remain unpaid
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <p className="text-green-400">✅ Payment Completed</p>
                      <button
                        className="bg-gray-600 cursor-not-allowed text-gray-400 font-semibold px-4 py-2 rounded-lg"
                        disabled
                      >
                        Paid
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}