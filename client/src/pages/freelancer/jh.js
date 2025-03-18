{step === 4 && (
    <div>
      <h3>Account Details</h3>
      <input type="text" name="bankName" placeholder="Bank Name" onChange={handleChange} />
      <input type="text" name="accountFullName" placeholder="Full Name (As per Bank)" onChange={handleChange} />
      <input type="text" name="accountNumber" placeholder="Account Number" onChange={handleChange} />
      <button onClick={handleBack}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )}

  {step === 5 && (
    <div>
      <h3>Profile Picture & Verification</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {formData.profilePicture && <p>File: {formData.profilePicture.name}</p>}
      <button onClick={handleBack}>Back</button>
      <button onClick={() => navigate("/dashboard")}>Finish</button>
    </div>
  )}
  const [formData, setFormData] = useState({
    title: "",
    skills: [],
    bio: "",
    experienceLevel: "",
    availability: "",
    rate: "",
    paymentMethod: "",
    portfolio: "",
    github: "",
    linkedin: "",
    bankName: "",
    accountFullName: "",
    accountNumber: "",
    profilePicture: null, // New state for image upload
  });
