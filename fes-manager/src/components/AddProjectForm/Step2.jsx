// import React from "react";
// import useAddProjectFormStore from "../../store/AddProjectFormStore";

// const Step2 = () => {
//   const { updateFormData, setStep, formData, addTask, removeTask } = useAddProjectFormStore();
//   const [error, setError] = React.useState("");

//   const handleNext = (e) => {
//     e.preventDefault();

//     // Ensure fundingGoal is valid
//     const fundingGoal = Number(formData.fundingGoal);
//     if (!fundingGoal || isNaN(fundingGoal) || fundingGoal <= 0) {
//       setError("Please enter a valid funding goal greater than zero.");
//       return;
//     }

//     // Ensure at least one task is added
//     if (formData.tasks.length === 0) {
//       setError("Please add at least one task.");
//       return;
//     }

//     setStep(3); // Move to next step
//   };

//   const handleAddTask = () => {
//     addTask({ name: "", amount: 0 }); // Ensure amount is a number
//   };

//   const handleTaskChange = (index, field, value) => {
//     const updatedTasks = [...formData.tasks];
//     updatedTasks[index] = { ...updatedTasks[index], [field]: value };
//     updateFormData("tasks", updatedTasks);
//   };

//   const handleRemoveTask = (index) => {
//     removeTask(index);
//   };

//   return (
//     <form onSubmit={handleNext} className="space-y-4">
//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       {/* Funding Goal */}
//       <div>
//         <label className="block font-medium">Funding Goal</label>
//         <input
//           type="number"
//           className="w-full border p-2 rounded"
//           value={formData.fundingGoal || ""}
//           onChange={(e) => updateFormData("fundingGoal", Number(e.target.value))}
//           min="1"
//           required
//         />
//       </div>

//       {/* Task Management */}
//       <div>
//         <label className="block font-medium">Tasks</label>
//         <button
//           type="button"
//           className="w-full bg-shade text-white p-2 rounded"
//           onClick={handleAddTask}
//         >
//           Add Task
//         </button>

//         {formData.tasks.map((task, index) => (
//           <div key={index} className="flex justify-between items-center space-x-2">
//             <div className="flex-1">
//               <input
//                 type="text"
//                 placeholder="Task Name"
//                 value={task.name}
//                 onChange={(e) => handleTaskChange(index, "name", e.target.value)}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//             </div>
//             <div className="flex-1">
//               <input
//                 type="number"
//                 placeholder="Amount"
//                 value={task.amount || ""}
//                 onChange={(e) => handleTaskChange(index, "amount", Number(e.target.value))}
//                 className="w-full border p-2 rounded"
//                 min="0"
//                 required
//               />
//             </div>
//             <button
//               type="button"
//               onClick={() => handleRemoveTask(index)}
//               className="bg-red-500 text-white p-2 rounded"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Next Button */}
//       <button
//         type="submit"
//         className="w-full bg-greenNeon text-darkGreen p-2 rounded hover:bg-semiGreen"
//       >
//         Next
//       </button>
//     </form>
//   );
// };

// export default Step2;
