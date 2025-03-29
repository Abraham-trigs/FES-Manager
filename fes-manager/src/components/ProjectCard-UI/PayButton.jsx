// import { useState } from "react";
// import useAddProjectFormStore from "../../store/AddProjectFormStore";

// const PayButton = ({ projectId }) => {
//   const [donationAmount, setDonationAmount] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [thankYouMessage, setThankYouMessage] = useState("");

//   const { updateProjectFunding, projects } = useAddProjectFormStore();
//   const project = projects.find((p) => p.id === projectId);
//   if (!project) return null;

//   const totalBudget = project.fundingGoal - project.currentFunds;

//   const handlePayment = () => {
//     const paymentAmount = parseFloat(donationAmount);

//     if (isNaN(paymentAmount) || paymentAmount <= 0) {
//       setErrorMessage("Please enter a valid amount.");
//       return;
//     }

//     if (paymentAmount > totalBudget) {
//       setErrorMessage(`You can only donate up to ${totalBudget} FES Coins.`);
//       return;
//     }

//     setErrorMessage("");
//     updateProjectFunding(projectId, paymentAmount);
//     setThankYouMessage("Thank you for your donation!");

//     // Reset donation input after 3 seconds
//     setTimeout(() => {
//       setDonationAmount("");
//       setThankYouMessage("");
//     }, 3000);
//   };

//   return (
//     <div className="flex flex-col items-center space-y-2 mt-2 border-2 border-red-500 p-2">
//       <input
//         type="number"
//         value={donationAmount}
//         onChange={(e) => setDonationAmount(e.target.value)}
//         placeholder="Enter FES Coins"
//         className="border border-blue-500 p-2 rounded-md w-full"
//       />
//       <button
//         onClick={handlePayment}
//         className="bg-darkGreen-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition border-2 border-yellow-500"
//       >
//         Pay Now
//       </button>
//       {errorMessage && <p className="text-red-500 text-xs text-center">{errorMessage}</p>}
//       {thankYouMessage && <p className="text-green-500 text-xs text-center">{thankYouMessage}</p>}
//     </div>
//   );
// };

// export default PayButton;
