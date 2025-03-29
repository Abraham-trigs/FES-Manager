import React, { useState } from 'react';
import useAddProjectFormStore from '../../store/AddProjectFormStore'; // Import the store

const ProjectCard = () => {
  const { projects, makePayment, showPaymentForm, setShowPaymentForm } = useAddProjectFormStore();
  const project = projects[0] || {};
  const formattedFundingGoal = project.fundingGoal ? `$${project.fundingGoal.toLocaleString()}` : "No Funds";

  const [donationAmount, setDonationAmount] = useState("");

  const openPaymentForm = () => {
    setShowPaymentForm(true); // Open payment form
  };
  
  const closePaymentForm = () => setShowPaymentForm(false);

  const handlePayment = () => {
    const amount = parseFloat(donationAmount);
    if (!isNaN(amount) && amount > 0) {
      makePayment(amount);
      setDonationAmount(""); // Clear the input after payment
      closePaymentForm(); // Close modal after payment
    }
  };

  return (
    <>
      <div>
        {/* Payment Form Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg w-80 relative">
              {/* Close Button */}
              <div className="absolute top-2 right-2 text-semiGreen cursor-pointer" onClick={closePaymentForm}>
                <div className="w-3 h-3 bg-darkGreen rounded-full"></div>
              </div>
              <h2 className="text-lg font-bold mb-2">Enter Donation Amount</h2>
              <input 
                type="number" 
                className="border p-2 w-full mb-2" 
                placeholder="Enter amount" 
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)} 
              />
              <button 
                className="bg-darkGreen text-white p-3 py-1 border-2 border-darkGreen rounded-lg font-semibold text-[0.8rem] w-full hover:bg-greenNeon hover:text-darkGreen"
                onClick={handlePayment}>
                Pay
              </button>
            </div>
          </div>
        )}

        {/* Card Container and mapping */}
        <div className="relative flex flex-col items-center shadow-2-l z-10">
          <p className="uppercase absolute top-0 text-[#06484b] -mt-[-5px] z-10 px-2 font-bold text-xl">{project.category || "No Category"}</p>
          <p className="absolute text-left text-[0.8rem] top-0 -mt-[-185px] z-10 ml-[-125px] px-2 font-bold bg-greenNeon">{formattedFundingGoal}</p>
          <p className="absolute top-0 -mt-[-203px] z-10 px-2 font-bold">{project.id || "No ID"}</p>
          
          <div className="w-[220px] bg-darkGreen rounded-br-2xl rounded-bl-2xl h-6 absolute my-[160px]">
            <div className="bg-green-500 h-full rounded-full text-white text-center text-sm leading-6" style={{ width: "70%" }}>
              70%
            </div>
          </div>

          <div className="w-[230px] h-[370px] bg-green rounded-3xl flex flex-col items-center">
            <div className="w-[230px] h-[270px] bg-darkShade border-[3px] border-cyanNeon rounded-3xl flex justify-center items-center">
              <div className="w-[200px] h-[140px] bg-shade rounded-3xl -mt-16 border-[3px] border-highlight"></div>
            </div>

            <div className="flex flex-col justify-center items-center -my-[55px]">
              <div className="w-[30px] h-[30px] bg-shade font-bold text-[2rem] text-semiGreen flex flex-row justify-center items-center my-4">+</div>
              <div className="flex flex-row items-center -mt-11 space-x-[65px]">
                <button 
                  className="bg-darkGreen text-white p-3 py-1 border-2 border-darkGreen rounded-lg font-semibold text-[0.8rem]"
                  onClick={openPaymentForm}>
                  FES Aid
                </button>
                <button 
                  className="bg-cyanNeon p-3 py-1 border-2 border-darkGreen rounded-lg font-semibold text-[0.8rem]">
                  Details
                </button>
              </div>
            </div>
          </div>

          <div className="w-[230px] h-[40px] will-change-contents my-[-100px]" >
            <p className='w-full text-center truncate p-2 text-2xl text-cyanNeon font-bold'>{project.title || "Untitled Project"}</p>
          </div>
          <div className="w-[220px] h-[60px] rounded-br-3xl rounded-3xl my-[45px]" >
            <p className='line-clamp-3 leading-tight text-center py-[51px] px-2 text-white font-normal text-[0.8rem]'>{project.description || "No details available"}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
