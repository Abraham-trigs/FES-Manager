import React, { useState } from 'react';

const PaymentForm = ({ onClose, onPayment }) => {
  const [paymentAmount, setPaymentAmount] = useState('');

  const handleSubmit = () => {
    const trimmedAmount = paymentAmount.trim();

    // Check if the input is empty or non-numeric
    if (!trimmedAmount || isNaN(trimmedAmount)) {
      alert("Please enter a valid payment amount.");
      return;
    }

    // Convert the input to a number
    const amount = Number(trimmedAmount);

    // Check if the amount is finite and greater than 0
    if (!isFinite(amount) || amount <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }

    // Pass the valid amount to the onPayment function
    onPayment(amount); // Trigger the payment
    onClose(); // Close the form after successful payment
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center w-80 relative">
        <button 
          id="closeForm" 
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-3">Enter Payment Amount</h2>
        <input 
          type="number" 
          className="w-full border p-2 mb-3 rounded-lg" 
          placeholder="Enter amount"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)} // Update state with input value
        />
        <button
          className="bg-darkGreen text-white px-4 py-2 rounded-lg font-semibold"
          onClick={handleSubmit}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
