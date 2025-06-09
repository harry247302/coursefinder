import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAddUserMutation } from '../../slices/adminApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { AddExtraUser } from '../../slices/userSlice'; // Assuming this exists
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {app} from '../../firebase'; // Assuming your Firebase config is imported here

const storage = getStorage(app);

export default function PartnerAddUserScreen() {
  const [createUser, { isSuccess }] = useAddUserMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState(null);

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `profilePictures/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  // Validation schema for Formik using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    CounsellorCode: Yup.string(),
    ProfilePhoto: Yup.string(),
    WhatappNumber: Yup.string().matches(/^\+?\d{10,14}$/, 'Invalid WhatsApp number'),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('User created successfully!');
    }
  }, [isSuccess]);

  const initialValues = {
    name: '',
    email: '',
    password: '',
    role: 'counsellor',
    CounsellorCode: '',
    ProfilePhoto: '',
    WhatappNumber: '',
    createdBy: userInfo._id,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let profilePhotoUrl = values.ProfilePhoto;
      if (profilePic) {
        // Upload profile picture to Firebase if a file was selected
        profilePhotoUrl = await uploadImage(profilePic);
      }
      // Include the uploaded profile photo URL in the values
      const res = await createUser({ ...values, ProfilePhoto: profilePhotoUrl }).unwrap();
      dispatch(AddExtraUser(res)); // Assuming this action exists
      toast.success('User created successfully!');
      resetForm();
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Create New User</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter user name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter user email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter user password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Counsellor Code Field */}
            <div className="mb-4">
              <label htmlFor="CounsellorCode" className="block text-sm font-medium text-gray-700">
                Counsellor Code
              </label>
              <Field
                type="text"
                name="CounsellorCode"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter counsellor code"
              />
              <ErrorMessage name="CounsellorCode" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Profile Photo Upload */}
            <div className="mb-4">
              <label htmlFor="ProfilePhoto" className="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <input
                type="file"
                name="ProfilePhoto"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                onChange={(event) => {
                  setProfilePic(event.target.files[0]);
                  setFieldValue('ProfilePhoto', event.target.value);
                }}
              />
              <ErrorMessage name="ProfilePhoto" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* WhatsApp Number Field */}
            <div className="mb-4">
              <label htmlFor="WhatappNumber" className="block text-sm font-medium text-gray-700">
                WhatsApp Number
              </label>
              <Field
                type="text"
                name="WhatappNumber"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter WhatsApp number"
              />
              <ErrorMessage name="WhatappNumber" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Role Field */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <Field
                as="select"
                name="role"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="counsellor">Counsellor</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none"
              >
                {isSubmitting ? 'Creating User...' : 'Create User'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
