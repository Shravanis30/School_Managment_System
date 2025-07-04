import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function StudentFees() {
  const [structure, setStructure] = useState({});
  const [paid, setPaid] = useState({ paidTerm1: 0, paidTerm2: 0 });
  const [successMessage, setSuccessMessage] = useState({ term1: "", term2: "" });

  const fetchFeeData = async () => {
    try {
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
    } catch (err) {
      console.error("Error fetching fee data:", err);
    }
  };

  useEffect(() => {
    fetchFeeData();
  }, []);

  const getDue = (term) =>
    (structure[term] || 0) - (paid[`paid${term.charAt(0).toUpperCase() + term.slice(1)}`] || 0);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const pay = async (term) => {
    const amount = getDue(term);
    if (amount <= 0) return;

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, term }),
    });

    if (!res.ok) {
      const errMsg = await res.text();
      console.error("Order creation failed:", errMsg);
      alert("Failed to create Razorpay order. See console.");
      return;
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
        const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
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
            [term]: `✅ ${term.toUpperCase()} fee paid successfully!`,
          }));

          setTimeout(() => {
            setSuccessMessage((prev) => ({ ...prev, [term]: "" }));
          }, 4000);
        }
      },
      theme: { color: "#0d9488" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="student" />
      <div className="flex-1 p-6">
        <Header />
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-md max-w-3xl mx-auto mt-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">Your Fee Status</h2>

          {["term1", "term2"].map((term) => {
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
        </div>
      </div>
    </div>
  );
}
