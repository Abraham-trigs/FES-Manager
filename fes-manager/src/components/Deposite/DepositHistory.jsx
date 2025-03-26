import React, { useState } from "react";

const DepositHistory = () => {
  const [filter, setFilter] = useState("All");
  
  const transactions = [
    { id: "TXN123456", date: "2025-03-26 14:30", amount: 50, fesCoins: 45, method: "PayPal", status: "Completed" },
    { id: "TXN789012", date: "2025-03-25 10:15", amount: 20, fesCoins: 18, method: "Crypto", status: "Pending" },
    { id: "TXN345678", date: "2025-03-24 16:45", amount: 100, fesCoins: 90, method: "Bank Transfer", status: "Failed" },
  ];

  const filteredTransactions = filter === "All" ? transactions : transactions.filter(txn => txn.status === filter);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Deposit History</h3>
      
      {/* Filter Buttons */}
      <div className="mb-4 flex gap-2">
        {["All", "Completed", "Pending", "Failed"].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded ${filter === status ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>
      
      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Transaction ID</th>
              <th className="p-2 text-left">Amount (USD)</th>
              <th className="p-2 text-left">FES Coins</th>
              <th className="p-2 text-left">Method</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn) => (
                <tr key={txn.id} className="border-b">
                  <td className="p-2">{txn.date}</td>
                  <td className="p-2">{txn.id}</td>
                  <td className="p-2">${txn.amount}</td>
                  <td className="p-2">{txn.fesCoins} FES Coins</td>
                  <td className="p-2">{txn.method}</td>
                  <td className={`p-2 ${txn.status === "Completed" ? "text-green-500" : txn.status === "Pending" ? "text-orange-500" : "text-red-500"}`}>{txn.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepositHistory;
