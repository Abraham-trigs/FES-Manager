import React, { useState } from "react";

const DepositForm = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("PayPal");

  const handleDeposit = (e) => {
    e.preventDefault();
    if (amount < 1) {
      alert("Minimum deposit amount is $1.");
      return;
    }
    console.log(`Depositing ${amount} USD via ${method}`);
    // Handle deposit logic here
  };

  return (
    <form onSubmit={handleDeposit} className="bg-white shadow-md rounded-lg p-6 w-full">
      <h3 className="text-lg font-semibold mb-4">Deposit Funds</h3>
      
      {/* Amount Input */}
      <label className="block mb-2 text-gray-700">Amount (USD)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="1"
        className="w-full p-2 border rounded-md mb-4"
        required
      />

      {/* Payment Method Selection */}
      <label className="block mb-2 text-gray-700">Payment Method</label>
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
      >
        <option value="PayPal">PayPal</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Crypto">Crypto</option>
        <option value="Mobile Money">Mobile Money</option>
      </select>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-greenNeon text-white py-2 rounded-md hover:bg-green-600">
        Deposit
      </button>
    </form>
  );
};

export default DepositForm;
