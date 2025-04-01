// import React, { useState } from "react";
// import useAddProjectFormStore from "../../store/AddProjectFormStore";

// const Step1 = () => {
//   const { updateFormData, setStep, formData } = useAddProjectFormStore();
//   const [error, setError] = useState("");
//   const [imagePreview, setImagePreview] = useState(formData.image || "");

//   const handleNext = (e) => {
//     e.preventDefault();
//     if (!formData.title || !formData.category || !formData.description) {
//       setError("Please fill in all required fields.");
//       return;
//     }
//     setStep(2);
//   };

//   return (
//     <div className="flex justify-center items-center h-[700px] min-h-[1000px] bg-gray-100 px-4">
//       <form
//         onSubmit={handleNext}
//         className="w-full max-w-md sm:max-w-lg bg-white p-5 sm:p-6 rounded-2xl shadow-lg space-y-6"
//       >
//         <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-700">
//           Create Your Project
//         </h2>
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//         {/* Project Title */}
//         <div className="flex flex-col">
//           <label className="text-gray-600 font-medium">Project Title</label>
//           <input
//             type="text"
//             className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
//             value={formData.title}
//             onChange={(e) => updateFormData("title", e.target.value)}
//             required
//           />
//         </div>

//         {/* Category */}
//         <div className="flex flex-col">
//           <label className="text-gray-600 font-medium">Category</label>
//           <select
//             className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
//             value={formData.category}
//             onChange={(e) => updateFormData("category", e.target.value)}
//             required
//           >
//             <option value="">Select a category</option>
//             <option value="Education">Education</option>
//             <option value="Health">Health</option>
//             <option value="Infrastructure">Infrastructure</option>
//             <option value="Community Impact">Community Impact</option>
//           </select>
//         </div>

//         {/* Project Description */}
//         <div className="flex flex-col">
//           <label className="text-gray-600 font-medium">Project Description</label>
//           <textarea
//             className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:ring-2 focus:darkGreen focus:outline-none resize-none"
//             rows="4"
//             value={formData.description}
//             onChange={(e) => updateFormData("description", e.target.value)}
//             required
//           ></textarea>
//         </div>

//         {/* Image URL */}
//         <div className="flex flex-col">
//           <label className="text-gray-600 font-medium">Image URL</label>
//           <input
//             type="text"
//             className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
//             value={formData.image}
//             onChange={(e) => {
//               updateFormData("image", e.target.value);
//               setImagePreview(e.target.value);
//             }}
//           />
//         </div>

//         {/* Image Preview */}
//         {imagePreview && (
//           <div className="mt-2 flex justify-center">
//             <img
//               src={imagePreview}
//               alt="Project Preview"
//               className="w-full max-h-48 object-cover rounded-lg shadow-md"
//             />
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white p-2 sm:p-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
//         >
//           Next
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Step1;
