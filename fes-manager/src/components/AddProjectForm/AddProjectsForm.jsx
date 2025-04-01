import React, { useState } from "react";

const CloseButton = ({ onClose }) => (
  <div className="absolute top-2 right-2 cursor-pointer" onClick={onClose}>
    <div className="w-3 h-3 bg-[#f02929] rounded-full"></div>
  </div>
);

const AddProjectForm = () => {
  const [step, setStep] = useState(1);

  const handleClose = () => {
    console.log("Closing form...");
    // Logic to close the form (e.g., setShowForm(false))
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="relative w-[270px] max-h-screen overflow-y-auto bg-white shadow-md p-6 rounded-lg">
      <CloseButton onClose={handleClose} />
      
      {/* Progress Indicator */}
      <div className="w-full bg-gray-200 h-2 rounded mt-4">
        <div
          className="h-2 bg-blue-500 rounded transition-all"
          style={{ width: `${(step / 4) * 100}%` }}  
        ></div>
      </div>
      <p className="text-center text-sm mt-2">Step {step} of 4</p>
      
      {/* Step Content */}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 setStep={setStep} />}
      {step === 4 && <StepFour />}
      
      {/* Navigation Buttons */}
      <div className="mt-4 flex justify-between">
        {step > 1 && (
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={prevStep}>
            Back
          </button>
        )}
        {step < 4 ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={nextStep}>
            Next
          </button>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

// FORM STEP 1
const Step1 = () => (
  <div>
    <h2 className="text-lg font-semibold">Create a Project</h2>

    {/* Project Title */}
    <label className="block text-sm font-medium text-gray-700 mt-2">Project Title</label>
    <input type="text" placeholder="Enter project title" className="w-full px-4 py-2 border rounded mt-1" />

    {/* Project Category */}
    <label className="block text-sm font-medium text-gray-700 mt-2">Category</label>
    <select className="w-full px-4 py-2 border rounded mt-1">
      <option>Education</option>
      <option>Health</option>
      <option>Infrastructure</option>
      <option>Community Impact</option>
    </select>

    {/* Project Type: Group or Individual */}
    <label className="block text-sm font-medium text-gray-700 mt-2">Project Type</label>
    <select className="w-full px-4 py-2 border rounded mt-1">
      <option value="">Select Project Type</option>
      <option value="Individual">Individual</option>
      <option value="Group">Group</option>
    </select>

    {/* Project Location */}
    <label className="block text-sm font-medium text-gray-700 mt-2">Project Location</label>
    <input type="text" placeholder="Enter project location" className="w-full px-4 py-2 border rounded mt-1" />

    {/* Project Description */}
    <label className="block text-sm font-medium text-gray-700 mt-2">Project Description</label>
    <textarea placeholder="Enter project description" className="w-full px-4 py-2 border rounded mt-1"></textarea>
  </div>
);

// FORM STEP 2
const Step2 = () => {
  const [fundingGoal, setFundingGoal] = useState(0);
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks, { name: "", amount: "" }]);
  };

  const updateTask = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = value;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const totalAllocated = tasks.reduce((sum, task) => sum + Number(task.amount || 0), 0);
  const progress = fundingGoal > 0 ? (totalAllocated / fundingGoal) * 100 : 0;
  const isExceeding = totalAllocated > fundingGoal;

  return (
    <div>
      <h2 className="text-lg font-semibold">Funding Details</h2>
      <label className="block text-sm font-medium text-gray-700 mt-2">Funding Goal</label>
      <input
        type="number"
        placeholder="Enter funding goal"
        className="w-full px-4 py-2 border rounded mt-1"
        value={fundingGoal}
        onChange={(e) => setFundingGoal(Number(e.target.value))}
      />
      
      <h3 className="mt-4 text-md font-semibold">Add Task</h3>
      {tasks.map((task, index) => (
        <div key={index} className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Task Name"
            className="w-[50%] flex-1 px-2 py-1 border rounded"
            value={task.name}
            onChange={(e) => updateTask(index, "name", e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-[50%] px-2 py-1 border rounded"
            value={task.amount}
            onChange={(e) => updateTask(index, "amount", e.target.value)}
          />
          <button className="text-red-500" onClick={() => deleteTask(index)}>
            <div className="w-3 h-3 bg-[#f02929] rounded-full"></div>
          </button>
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={addTask} disabled={isExceeding}>
        Add Task
      </button>
      
      <div className="w-full bg-gray-200 h-2 rounded mt-4">
        <div
          className={`h-2 rounded transition-all ${isExceeding ? "bg-red-500" : "bg-green-500"}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className={`text-sm mt-2 ${isExceeding ? "text-red-500" : "text-gray-700"}`}>
        {isExceeding ? "Total amount exceeds funding goal!" : `Used: ${totalAllocated} / ${fundingGoal}`}
      </p>
    </div>
  );
};

// FORM STEP 3: Project Verification
const Step3 = ({ setStep }) => {
  const [verifierType, setVerifierType] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState({
    nationalId: null,
    letterOfEndorsement: null,
    endorserNationalId: null,
    governmentAuthorization: null,
    signeeNationalId: null,
  });

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    setUploadedDocs((prev) => ({ ...prev, [docType]: file }));
  };

  const renderRequirements = () => {
    if (verifierType === "Individual") {
      return (
        <div>
          <h3 className="mt-4 text-md font-semibold">Eligible Categories for Individual</h3>
          <ul className="list-disc pl-5">
            <li>Community & Religious Leaders</li>
            <li>Certified Professionals</li>
            <li>Educational Leaders</li>
            <li>Recognized Public Figures</li>
            <li>Licensed Social Workers & Counselors</li>
          </ul>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Upload National ID</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'nationalId')} className="w-full px-4 py-2 border rounded mt-1" />
            <label className="block text-sm font-medium text-gray-700 mt-2">Upload Letter of Endorsement</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'letterOfEndorsement')} className="w-full px-4 py-2 border rounded mt-1" />
          </div>
        </div>
      );
    }

    if (verifierType === "Organization") {
      return (
        <div>
          <h3 className="mt-4 text-md font-semibold">Eligible Categories for Organization</h3>
          <ul className="list-disc pl-5">
            <li>NGOs</li>
            <li>Charitable Foundations</li>
            <li>Community-Based Organizations</li>
            <li>Accredited Media Organizations</li>
            <li>Professional Associations</li>
          </ul>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Upload Letter of Endorsement</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'letterOfEndorsement')} className="w-full px-4 py-2 border rounded mt-1" />
            <label className="block text-sm font-medium text-gray-700 mt-2">Endorser’s National ID</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'endorserNationalId')} className="w-full px-4 py-2 border rounded mt-1" />
          </div>
        </div>
      );
    }

    if (verifierType === "Government") {
      return (
        <div>
          <h3 className="mt-4 text-md font-semibold">Eligible Categories for Government</h3>
          <ul className="list-disc pl-5">
            <li>Government Agencies & Ministries</li>
            <li>Local Government Authorities</li>
            <li>Public Service Bodies</li>
          </ul>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Upload Government Authorization</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'governmentAuthorization')} className="w-full px-4 py-2 border rounded mt-1" />
            <label className="block text-sm font-medium text-gray-700 mt-2">Signee National ID</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'signeeNationalId')} className="w-full px-4 py-2 border rounded mt-1" />
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3 className="mt-4 text-md font-semibold">Choose Verifier Type</h3>
        <select
          className="w-full px-4 py-2 border rounded mt-1"
          value={verifierType}
          onChange={(e) => setVerifierType(e.target.value)}
        >
          <option value="">Select Verifier Type</option>
          <option value="Individual">Individual</option>
          <option value="Organization">Organization</option>
          <option value="Government">Government</option>
        </select>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Project Verification</h2>
      {renderRequirements()}
    </div>
  );
};

// FORM STEP 4: Final Review & Submit
const StepFour = () => (
  <div>
      <div>
        <h2 className="text-lg font-semibold">Review and Submit</h2>
        <p>Final review of your project details before submission.</p>
     </div>
     
      <button className="bg-blue-500 w-full text-white px-4 py-2 rounded" >
        Submit
      </button>
    </div>
);

export default AddProjectForm;
