import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUpdateUserMutation } from '../../slices/userApiSlice';
import { app } from '../../firebase'; // Ensure firebase app is initialized
import { motion } from 'framer-motion'; // For animations

const storage = getStorage(app);

export default function FrenchiseProfileScreen() {
    const { userInfo } = useSelector((state) => state.auth); // Fetch user info from state
    const [updateUser, { isSuccess }] = useUpdateUserMutation(); // Mutation to update user information

    // State to hold the selected file and logo preview
    const [selectedFile, setSelectedFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(userInfo.Logo || ''); // Use current profile photo as the initial preview

    // Handle file selection for logo upload
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            setSelectedFile(file); // Set the selected file in state
            setLogoPreview(URL.createObjectURL(file)); // Create and set a preview URL
        }
    };

    // Upload image to Firebase and return the URL
    const uploadImage = async (file) => {
        const storageRef = ref(storage, `logos/${file.name}`); // Reference for Firebase storage location
        await uploadBytes(storageRef, file); // Upload the image
        const url = await getDownloadURL(storageRef); // Get the image URL from Firebase
        return url;
    };

    // Handle the logo upload submission
    const handleLogoUpload = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!selectedFile) {
            toast.error("Please select a logo file to upload.");
            return;
        }

        try {
            // Upload image to Firebase
            const imageUrl = await uploadImage(selectedFile);
            const data = {
                id: userInfo._id,
                raw: {
                    Logo: imageUrl
                }
            };
            // Call the mutation to update the user's logo with the Firebase URL
            await updateUser(data).unwrap();

        } catch (error) {
            toast.error("Failed to upload the logo.");
            console.error("Logo upload error:", error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Logo uploaded successfully!");
            setSelectedFile(null);
            setLogoPreview(userInfo.Logo); // Update the preview with the new logo URL after successful upload
        }
    }, [isSuccess]);

    return (
        <motion.div
            className="container mx-auto p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Partner Profile</h2>

            <div className="bg-white grid grid-cols-2 gap-5 shadow-lg rounded-lg p-8">
                {/* Basic Information Section */}
                <motion.div className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h3>
                    <p className="text-gray-600 mb-2"><strong>Name:</strong> {userInfo.name || 'N/A'}</p>
                    <p className="text-gray-600"><strong>Email:</strong> {userInfo.email || 'N/A'}</p>
                </motion.div>

                {/* Profile Logo Section */}
                <motion.div className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* <h3 className="text-xl font-semibold text-gray-700 mb-4">Profile Logo</h3> */}

                    {/* Display current logo or new preview */}
                    <div className="flex items-center mb-4">
                        {/* <img
                            src={logoPreview}
                            alt="Profile Logo"
                            className="h-24 w-24 object-cover rounded-full shadow-md border-2 border-blue-500 mr-4"
                        />
                        <form onSubmit={handleLogoUpload} className="flex flex-col">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mb-2 text-sm text-gray-700"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                            >
                                Upload Logo
                            </button>
                        </form> */}
                    </div>
                </motion.div>

                {/* Address Information */}
                <motion.div className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Address Information</h3>
                    <p className="text-gray-600 mb-2"><strong>City:</strong> {userInfo.city || 'N/A'}</p>
                    <p className="text-gray-600 mb-2"><strong>State:</strong> {userInfo.state || 'N/A'}</p>
                    <p className="text-gray-600"><strong>Zip Code:</strong> {userInfo.zipCode || 'N/A'}</p>
                </motion.div>

                {/* Bank and Institution Information */}
                <motion.div className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Bank & Institution Information</h3>
                    <p className="text-gray-600 mb-2"><strong>Institution Name:</strong> {userInfo.InsitutionName || 'N/A'}</p>
                    <p className="text-gray-600 mb-2"><strong>Bank Name:</strong> {userInfo.bankName || 'N/A'}</p>
                    <p className="text-gray-600"><strong>IFSC Code:</strong> {userInfo.IFSC || 'N/A'}</p>
                </motion.div>

                {/* Owner Information */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Owner Information</h3>
                    <p className="text-gray-600 mb-2"><strong>Owner Name:</strong> {userInfo.OwnerName || 'N/A'}</p>
                    <p className="text-gray-600 mb-2"><strong>Owner's Father Name:</strong> {userInfo.OwnerFatherName || 'N/A'}</p>
                    <p className="text-gray-600 mb-2"><strong>Contact Number:</strong> {userInfo.ContactNumber || 'N/A'}</p>
                    <p className="text-gray-600"><strong>WhatsApp Number:</strong> {userInfo.WhatappNumber || 'N/A'}</p>
                </motion.div>
            </div>
        </motion.div>
    );
}
