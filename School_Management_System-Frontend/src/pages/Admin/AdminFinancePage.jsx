// AdminFinancePage.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const tabs = [
  'Fee Structure',
  'Collection',
  'Pending Payments',
  'Receipts',
  'Reports'
];

const AdminFinancePage = () => {
  const [activeTab, setActiveTab] = useState('Fee Structure');

  const feeData = [
    { class: '1', term1: 5000, term2: 5000 },
    { class: '2', term1: 5200, term2: 5200 },
    { class: '3', term1: 5500, term2: 5500 },
  ];

  return (
    //     <div className="flex min-h-screen bg-black text-white">
    //       <Sidebar role="admin" />
    //       <div className="flex-1 p-6">
    //         <div className="flex justify-between items-center mb-6">
    //           <input
    //             type="text"
    //             placeholder="Search options, students etc.."
    //             className="w-1/2 p-2 bg-gray-900 text-white rounded focus:outline-none"
    //           />
    //           <div className="flex items-center gap-4">
    //             <span>🔔</span>
    //             <div className="text-sm text-right">
    //               <p className="font-bold">Admin</p>
    //               <p className="text-gray-400 text-xs">Principal Name</p>
    //             </div>
    //             <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
    //           </div>
    //         </div>

    //         <div className="mb-6">
    //           <div className="flex space-x-2 bg-gray-800 rounded">
    //             {tabs.map((tab) => (
    //               <button
    //                 key={tab}
    //                 onClick={() => setActiveTab(tab)}
    //                 className={`px-4 py-2 text-sm rounded ${
    //                   activeTab === tab ? 'bg-gray-700 font-semibold' : 'hover:bg-gray-700'
    //                 }`}
    //               >
    //                 {tab}
    //               </button>
    //             ))}
    //           </div>
    //         </div>

    //         {/* Fee Structure Table */}
    //         {activeTab === 'Fee Structure' && (
    //           <div className="overflow-x-auto">
    //             <table className="w-full text-left">
    //               <thead>
    //                 <tr className="bg-gray-900 text-white">
    //                   <th className="p-2">Class</th>
    //                   <th className="p-2">Term 1 Fee (₹)</th>
    //                   <th className="p-2">Term 2 Fee (₹)</th>
    //                   <th className="p-2">Total Annual Fee (₹)</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {feeData.map((row, idx) => (
    //                   <tr key={idx} className="bg-gray-800 border-t border-gray-700">
    //                     <td className="p-2">{row.class}</td>
    //                     <td className="p-2">{row.term1.toLocaleString()}</td>
    //                     <td className="p-2">{row.term2.toLocaleString()}</td>
    //                     <td className="p-2">{(row.term1 + row.term2).toLocaleString()}</td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //           </div>
    //         )}

    //         {/* Other Tab Placeholders */}
    //         {activeTab !== 'Fee Structure' && (
    //           <div className="text-gray-400 text-sm mt-10">
    //             <p>This is the <span className="text-white font-semibold">{activeTab}</span> section. Functionality will be implemented here.</p>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   );
    // };

    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-6">
        <Header/>

        {/* Tab Selector */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 bg-white/10 backdrop-blur-md p-2 rounded-xl shadow-inner border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${activeTab === tab
                    ? 'bg-white text-black font-semibold shadow-lg'
                    : 'text-white hover:bg-white/20'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Fee Structure Table */}
        {activeTab === 'Fee Structure' && (
          <div className="overflow-x-auto bg-white/5 rounded-xl shadow-md p-4 backdrop-blur-md border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Fee Structure</h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-white/80">
                  <th className="p-2">Class</th>
                  <th className="p-2">Term 1 Fee (₹)</th>
                  <th className="p-2">Term 2 Fee (₹)</th>
                  <th className="p-2">Total Annual Fee (₹)</th>
                </tr>
              </thead>
              <tbody>
                {feeData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="bg-white/5 hover:bg-white/10 transition-all border-b border-white/10"
                  >
                    <td className="p-2">{row.class}</td>
                    <td className="p-2">{row.term1.toLocaleString()}</td>
                    <td className="p-2">{row.term2.toLocaleString()}</td>
                    <td className="p-2 font-semibold text-green-400">
                      {(row.term1 + row.term2).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Other Tabs Placeholder */}
        {activeTab !== 'Fee Structure' && (
          <div className="mt-10 bg-white/5 p-6 rounded-xl backdrop-blur-md text-white/80 text-sm border border-white/10">
            <p>
              This is the{' '}
              <span className="text-white font-semibold">{activeTab}</span>{' '}
              section. Functionality will be implemented here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFinancePage;
