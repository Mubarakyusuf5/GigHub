import { useState, useEffect } from "react";
import axios from "axios";

export const Preview = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phoneNumber: "",
    businessType: "Individual",
    industry: "",
    website: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState("");

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file)); // Show preview before upload
    }
  };

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    formDataObject.append("companyName", formData.companyName);
    formDataObject.append("email", formData.email);
    formDataObject.append("phoneNumber", formData.phoneNumber);
    formDataObject.append("businessType", formData.businessType);
    formDataObject.append("industry", formData.industry);
    formDataObject.append("website", formData.website);
    formDataObject.append("bankName", formData.bankName);
    formDataObject.append("accountName", formData.accountName);
    formDataObject.append("accountNumber", formData.accountNumber);

    if (profilePicture) {
      formDataObject.append("profilePicture", profilePicture);
    }

    // Log FormData entries
    for (let [key, value] of formDataObject.entries()) {
      console.log(key,": " + value);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/clients", formDataObject, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error creating profile");
    }
  };

  return (
    <div>
      <h2>Create Client Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Company Name:
          <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" placeholder="Phone Number" required onChange={handleChange} />
        </label>

        <label>
          Business Type:
          <select name="businessType" onChange={handleChange}>
            <option value="Individual">Individual</option>
            <option value="Company">Company</option>
          </select>
        </label>

        <label>
          Industry:
          <input type="text" name="industry" placeholder="Industry" required onChange={handleChange} />
        </label>
        <label>
          Website:
          <input type="text" name="website" placeholder="Website" onChange={handleChange} />
        </label>

        <h3>Bank Details</h3>
        <label>
          Bank Name:
          <input type="text" name="bankName" placeholder="Bank Name" required onChange={handleChange} />
        </label>
        <label>
          Account Name:
          <input type="text" name="accountName" placeholder="Account Name" required onChange={handleChange} />
        </label>
        <label>
          Account Number:
          <input type="text" name="accountNumber" placeholder="Account Number" required onChange={handleChange} />
        </label>

        <h3>Upload Profile Picture</h3>
        <label>
          Profile Picture:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        {preview && <img src={preview} alt="Profile Preview" width="100" />}

        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};