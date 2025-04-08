import React, { useState } from 'react'; 
import { ClipLoader } from 'react-spinners';
import useAddProjectFormStore from '../../store/AddProjectFormStore';

const Step3 = () => {
  const { formData, setFormData } = useAddProjectFormStore();
  const { verifierType, uploadedDocs, name, occupation, email, phone, digitalAddress } = formData;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadingDocType, setUploadingDocType] = useState(null);

  const validateFile = (file) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Only PDF, JPG, and PNG are allowed.';
    }

    if (file.size > maxSize) {
      return 'File size exceeds the 5MB limit.';
    }

    return null;
  };

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setUploadingDocType(docType);
    setLoading(true);

    setTimeout(() => {
      setFormData((prevState) => ({
        ...prevState,
        uploadedDocs: { ...uploadedDocs, [docType]: file },
      }));
      setLoading(false);
      setUploadingDocType(null);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (name === 'phone' && !/^\+?[1-9]\d{1,14}$/i.test(value)) {
      setError('Please enter a valid phone number.');
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setError(null);
  };

  const renderRequirements = () => {
    const sharedClasses = "list-disc pl-5 space-y-1 text-sm text-gray-700";

    switch (verifierType) {
      case 'Individual':
        return (
          <div className="mt-4">
            <h3 className="text-md font-semibold">Eligible Categories for Individual</h3>
            <ul className={sharedClasses}>
              <li>Community & Religious Leaders</li>
              <li>Certified Professionals</li>
              <li>Educational Leaders</li>
              <li>Recognized Public Figures</li>
              <li>Licensed Social Workers & Counselors</li>
            </ul>
          </div>
        );
      case 'Organization':
        return (
          <div className="mt-4">
            <h3 className="text-md font-semibold">Eligible Categories for Organization</h3>
            <ul className={sharedClasses}>
              <li>NGOs</li>
              <li>Charitable Foundations</li>
              <li>Community-Based Organizations</li>
              <li>Accredited Media Organizations</li>
              <li>Professional Associations</li>
            </ul>
          </div>
        );
      case 'Government':
        return (
          <div className="mt-4">
            <h3 className="text-md font-semibold">Eligible Categories for Government</h3>
            <ul className={sharedClasses}>
              <li>Government Agencies & Ministries</li>
              <li>Local Government Authorities</li>
              <li>Public Service Bodies</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const renderFilePreview = (docType) => {
    const file = uploadedDocs?.[docType];
    if (!file) return null;
    return <p className="text-xs text-gray-500 mt-1">Uploaded: {file.name}</p>;
  };

  return (
    <div className="mt-4 max-h-[80vh] overflow-y-auto px-4 pb-6">
      <h2 className="text-lg font-semibold">Project Verification</h2>

      <div className="mt-4">
        <h3 className="text-md font-semibold">Choose Verifier Type</h3>
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

      {renderRequirements()}

      <div className="mt-4 space-y-4">
        {['name', 'occupation', 'email', 'phone', 'digitalAddress'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field] || ''}
              onChange={handleChange}
              className="w-full px-4 py-1.5 border rounded mt-1"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {verifierType === 'Individual' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload National ID</label>
              <input type="file" onChange={(e) => handleFileUpload(e, 'nationalId')} className="w-full px-4 py-2 border rounded mt-1" />
              {renderFilePreview('nationalId')}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Letter of Endorsement</label>
              <input type="file" onChange={(e) => handleFileUpload(e, 'letterOfEndorsement')} className="w-full px-4 py-2 border rounded mt-1" />
              {renderFilePreview('letterOfEndorsement')}
            </div>
          </>
        )}

        {verifierType === 'Organization' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Letter of Endorsement</label>
              <input type="file" onChange={(e) => handleFileUpload(e, 'letterOfEndorsement')} className="w-full px-4 py-2 border rounded mt-1" />
              {renderFilePreview('letterOfEndorsement')}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Endorser’s National ID</label>
              <input type="file" onChange={(e) => handleFileUpload(e, 'endorserNationalId')} className="w-full px-4 py-2 border rounded mt-1" />
              {renderFilePreview('endorserNationalId')}
            </div>
          </>
        )}

        {verifierType === 'Government' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Government Authorization</label>
              <input type="file" onChange={(e) => handleFileUpload(e, 'governmentAuthorization')} className="w-full px-4 py-2 border rounded mt-1" />
              {renderFilePreview('governmentAuthorization')}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Signee National ID</label>
              <input type="file" onChange={(e) => handleFileUpload(e, 'signeeNationalId')} className="w-full px-4 py-2 border rounded mt-1" />
              {renderFilePreview('signeeNationalId')}
            </div>
          </>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {loading && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
          <ClipLoader size={20} color="#4B5563" />
          <span>Uploading {uploadingDocType}...</span>
        </div>
      )}
    </div>
  );
};

export default Step3;
