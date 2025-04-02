import React from 'react';
import useAddProjectFormStore from '../../store/AddProjectFormStore';

const Step3 = () => {
  const { formData, setFormData } = useAddProjectFormStore(); // Access form data from Zustand store
  const { verifierType, uploadedDocs, name, occupation, email, phone, digitalAddress } = formData;

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    setFormData({
      uploadedDocs: { ...uploadedDocs, [docType]: file }
    });
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
        </div>
      );
    }

    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold">Project Verification</h2>

      {/* Choose Verifier Type */}
      <div>
        <h3 className="mt-4 text-md font-semibold">Choose Verifier Type</h3>
        <select
          className="w-full px-4 py-2 border rounded mt-1"
          value={verifierType}
          onChange={(e) => setFormData({ verifierType: e.target.value })}
        >
          <option value="">Select Verifier Type</option>
          <option value="Individual">Individual</option>
          <option value="Organization">Organization</option>
          <option value="Government">Government</option>
        </select>
      </div>

      {/* Render document upload options last */}
      {renderRequirements()}

      {/* New fields for user information */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mt-1"
        />

        <label className="block text-sm font-medium text-gray-700 mt-2">Occupation / Industry</label>
        <input
          type="text"
          name="occupation"
          value={occupation}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mt-1"
        />

        <label className="block text-sm font-medium text-gray-700 mt-2">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mt-1"
        />

        <label className="block text-sm font-medium text-gray-700 mt-2">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mt-1"
        />

        <label className="block text-sm font-medium text-gray-700 mt-2">Digital Address</label>
        <input
          type="text"
          name="digitalAddress"
          value={digitalAddress}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded mt-1"
        />
      </div>

      {/* File upload section */}
      <div className="mt-4">
        {verifierType === "Individual" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload National ID</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'nationalId')} className="w-full px-4 py-2 border rounded mt-1" />
            <label className="block text-sm font-medium text-gray-700 mt-2">Upload Letter of Endorsement</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'letterOfEndorsement')} className="w-full px-4 py-2 border rounded mt-1" />
          </div>
        )}

        {verifierType === "Organization" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Letter of Endorsement</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'letterOfEndorsement')} className="w-full px-4 py-2 border rounded mt-1" />
            <label className="block text-sm font-medium text-gray-700 mt-2">Endorser’s National ID</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'endorserNationalId')} className="w-full px-4 py-2 border rounded mt-1" />
          </div>
        )}

        {verifierType === "Government" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Government Authorization</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'governmentAuthorization')} className="w-full px-4 py-2 border rounded mt-1" />
            <label className="block text-sm font-medium text-gray-700 mt-2">Signee National ID</label>
            <input type="file" onChange={(e) => handleFileUpload(e, 'signeeNationalId')} className="w-full px-4 py-2 border rounded mt-1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3;
