// import React, { useState } from "react";
// import useAddProjectFormStore from "../../store/AddProjectFormStore";

// const Step4 = () => {
//   const { updateFormData, setStep, formData } = useAddProjectFormStore();
//   const [error, setError] = useState("");

//   const handleNext = (e) => {
//     e.preventDefault();

//     // Validate required fields
//     if (formData.category === "Education" && !formData.schoolName) {
//       setError("Please provide the school details.");
//       return;
//     }
//     if (formData.category !== "Education" && !formData.organizationName) {
//       setError("Please provide the implementing organization's details.");
//       return;
//     }

//     setStep(5); // Move to next step
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       updateFormData(
//         formData.category === "Education" ? "schoolInvoice" : "organizationAgreement",
//         file
//       );
//     }
//   };

//   // Helper function to generate form fields
//   const renderInputField = (label, fieldName, type = "text") => (
//     <div>
//       <label className="block font-medium mt-2">{label}</label>
//       <input
//         type={type}
//         className="w-full border p-2 rounded"
//         value={formData[fieldName] || ""}
//         onChange={(e) => updateFormData(fieldName, e.target.value)}
//         required
//       />
//     </div>
//   );

//   return (
//     <form onSubmit={handleNext} className="space-y-4">
//       {/* Error message */}
//       {error && <p className="text-red-500 text-sm">{error}</p>}

//       {/* Conditional UI for Education vs Organization */}
//       {formData.category === "Education" ? (
//         <div className="p-4 border rounded-lg">
//           <h3 className="font-semibold mb-2">School Information</h3>
//           {renderInputField("School Name", "schoolName")}
//           {renderInputField("School Address", "schoolAddress")}
//           {renderInputField("Contact Person", "schoolContactPerson")}
//           {renderInputField("School Email", "schoolEmail", "email")}
//           {renderInputField("School Phone", "schoolPhone", "tel")}

//           <label className="block font-medium mt-2">Attach School Invoice (if available)</label>
//           <input
//             type="file"
//             accept=".pdf,.jpg,.png"
//             className="w-full border p-2 rounded"
//             onChange={handleFileUpload}
//           />
//           {formData.schoolInvoice && (
//             <p className="text-sm text-gray-700 mt-1">
//               Uploaded: {formData.schoolInvoice.name}
//             </p>
//           )}
//         </div>
//       ) : (
//         <div className="p-4 border rounded-lg">
//           <h3 className="font-semibold mb-2">Implementing Organization</h3>
//           {renderInputField("Organization Name", "organizationName")}
//           {renderInputField("Organization Address", "organizationAddress")}
//           {renderInputField("Contact Person", "organizationContactPerson")}
//           {renderInputField("Organization Email", "organizationEmail", "email")}
//           {renderInputField("Organization Phone", "organizationPhone", "tel")}

//           <label className="block font-medium mt-2">Attach Agreement Document (if available)</label>
//           <input
//             type="file"
//             accept=".pdf,.jpg,.png"
//             className="w-full border p-2 rounded"
//             onChange={handleFileUpload}
//           />
//           {formData.organizationAgreement && (
//             <p className="text-sm text-gray-700 mt-1">
//               Uploaded: {formData.organizationAgreement.name}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Navigation button */}
//       <button
//         type="submit"
//         className="w-full bg-greenNeon text-darkGreen p-2 rounded hover:bg-semiGreen"
//       >
//         Next
//       </button>
//     </form>
//   );
// };

// export default Step4;
