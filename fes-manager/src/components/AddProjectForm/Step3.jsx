// import React, { useState } from "react";
// import useAddProjectFormStore from "../../store/AddProjectFormStore";

// const Step3 = () => {
//   const { updateFormData, setStep, formData } = useAddProjectFormStore();
//   const [error, setError] = useState("");

//   const handleNext = (e) => {
//     e.preventDefault();

//     // Ensure the user selects a verification status
//     if (formData.verified === null) {
//       setError("Please confirm whether the project is verified.");
//       return;
//     }

//     // Ensure file is uploaded if verified
//     if (formData.verified && !formData.verificationDocs) {
//       setError("Please upload the verification document.");
//       return;
//     }

//     setStep(4); // Proceed to next step
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       updateFormData("verificationDocs", file);
//     }
//   };

//   return (
//     <form onSubmit={handleNext} className="space-y-4">
//       {/* Error Message */}
//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       {/* Verification Status Dropdown */}
//       <div>
//         <label className="block font-medium">Is this project verified?</label>
//         <select
//           className="w-full border p-2 rounded"
//           value={formData.verified === null ? "" : formData.verified.toString()} // Ensure boolean values are handled correctly
//           onChange={(e) => updateFormData("verified", e.target.value === "true")}
//           required
//         >
//           <option value="">Select an option</option>
//           <option value="true">Yes</option>
//           <option value="false">No</option>
//         </select>
//       </div>

//       {/* File Upload (Only if Verified) */}
//       {formData.verified && (
//         <div>
//           <label className="block font-medium">Upload Verification Document</label>
//           <input
//             type="file"
//             accept=".pdf,.jpg,.png"
//             className="w-full border p-2 rounded"
//             onChange={handleFileUpload}
//           />
//           <p className="text-sm text-gray-600 mt-1">
//             Accepted formats: PDF, JPG, PNG
//           </p>

//           {/* Show Uploaded File Name */}
//           {formData.verificationDocs && (
//             <p className="text-sm text-gray-700 mt-1">
//               Uploaded: {formData.verificationDocs.name}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Navigation Button */}
//       <button
//         type="submit"
//         className="w-full bg-greenNeon text-darkGreen p-2 rounded hover:bg-semiGreen"
//       >
//         Next
//       </button>
//     </form>
//   );
// };

// export default Step3;
