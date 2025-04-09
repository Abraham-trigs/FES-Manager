import React, { useState } from 'react';
import PaymentForm from './PaymentForm'; // assuming it's in the same folder

const PaymentWrapper = () => {
  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState(false);

  // Handles validated amount from modal
  const handlePayment = (amount) => {
    const trimmedAmount = amount.toString().trim();

    if (!trimmedAmount || isNaN(trimmedAmount)) {
      alert("Please enter a valid payment amount.");
      return;
    }

    if (!isFinite(amount) || amount <= 0) {
      alert("Please enter an amount greater than zero.");
      return;
    }

    console.log('Payment processed:', amount);
    // You could add wallet logic or API calls here
  };

  return (
    <div className="relative">
      {/* Your ProjectCard stays fixed, and the button inside stays as part of the normal flow */}
      <div className="project-card-container relative z-10">
        <button
          className={`bg-darkGreen dark:ease-in-out dark:hover:bg-dark dark:hover:text-text dark:text-text dark:border-none text-white p-4 py-1 border-2 border-darkGreen dark:bg-verydark rounded-lg font-semibold text-[0.8rem] whitespace-nowrap ${
            isPaymentFormVisible
              ? 'bg-shade text-darkShade border-0 dark:hover:bg-verydark cursor-not-allowed border-none'
              : ''
          }`}
          disabled={isPaymentFormVisible}
          onClick={() => setIsPaymentFormVisible(true)}
        >
          FES Aid
        </button>
      </div>

      {/* Modal should only be placed on top and not affect surrounding components */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
          isPaymentFormVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Smooth scaling effect for the modal */}
        <div className={`transition-transform duration-300 transform ${isPaymentFormVisible ? 'scale-100' : 'scale-95'}`}>
          <PaymentForm
            onClose={() => setIsPaymentFormVisible(false)}
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentWrapper;
