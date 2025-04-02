// const Client = require("../models/Client");
// const cloudinary = require("../config/cloudinary");

// // Create a new client profile
// const createClientProfile = async (req, res) => {
//   try {
//     const { userId, companyName, email, phoneNumber, businessType, industry, website, bankName, accountName, accountNumber } = req.body;

//     // Check if user already has a profile
//     const existingProfile = await Client.findOne({ userId });
//     if (existingProfile) {
//       return res.status(400).json({ message: "Profile already exists for this user." });
//     }

//     // Handle Cloudinary file upload
//     let profilePictureUrl = "";
//     if (req.file) {
//       profilePictureUrl = req.file.path;
//     }

//     // Create client profile
//     const clientProfile = await Client.create({
//       userId,
//       companyName,
//       email,
//       phoneNumber,
//       businessType,
//       industry,
//       website,
//       bankDetails: { bankName, accountName, accountNumber },
//       profilePicture: profilePictureUrl,
//     });

//     return res.status(201).json({ message: "Profile created successfully", data: clientProfile });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // Update client profile
// const updateClientProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { companyName, phoneNumber, businessType, industry, website, bankName, accountName, accountNumber } = req.body;

//     // Find client profile
//     const clientProfile = await Client.findOne({ userId });
//     if (!clientProfile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     // Handle Cloudinary image update
//     if (req.file) {
//       // Delete old profile picture from Cloudinary
//       const oldImage = clientProfile.profilePicture;
//       if (oldImage) {
//         const publicId = oldImage.split("/").pop().split(".")[0];
//         await cloudinary.uploader.destroy(`client_profiles/${publicId}`);
//       }

//       clientProfile.profilePicture = req.file.path;
//     }

//     // Update fields
//     clientProfile.companyName = companyName || clientProfile.companyName;
//     clientProfile.phoneNumber = phoneNumber || clientProfile.phoneNumber;
//     clientProfile.businessType = businessType || clientProfile.businessType;
//     clientProfile.industry = industry || clientProfile.industry;
//     clientProfile.website = website || clientProfile.website;
//     clientProfile.bankDetails = {
//       bankName: bankName || clientProfile.bankDetails.bankName,
//       accountName: accountName || clientProfile.bankDetails.accountName,
//       accountNumber: accountNumber || clientProfile.bankDetails.accountNumber,
//     };

//     await clientProfile.save();

//     return res.status(200).json({ message: "Profile updated successfully", data: clientProfile });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // Delete client profile
// const deleteClientProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Find client profile
//     const clientProfile = await Client.findOne({ userId });
//     if (!clientProfile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     // Delete profile picture from Cloudinary
//     if (clientProfile.profilePicture) {
//       const publicId = clientProfile.profilePicture.split("/").pop().split(".")[0];
//       await cloudinary.uploader.destroy(`client_profiles/${publicId}`);
//     }

//     await Client.deleteOne({ userId });

//     return res.status(200).json({ message: "Profile deleted successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// // module.exports = { createClientProfile, updateClientProfile, deleteClientProfile };

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// // Configure Multer to store images directly on Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "client_profiles",
//     allowed_formats: ["jpg", "jpeg", "png"],
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;

