import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../context/userContext';
import { FiX, FiUser, FiMail, FiLock, FiCamera, FiSave, FiCheckCircle, FiUpload } from 'react-icons/fi';
import Input from '../Inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { validateEmail } from '../../utils/helper';
import toast from 'react-hot-toast';

const ProfileEditModal = ({ isOpen, onClose }) => {
  const { user, updateUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
      setProfileImage(null);
      setImagePreview(null);
      setSuccess(false);
    }
  }, [user, isOpen]);

  // Cleanup image preview URL when component unmounts or modal closes
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file (JPG, PNG, GIF, etc.)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Clean up previous preview URL
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      setProfileImage(file);

      // Create preview URL
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);

      toast.success('Image selected successfully!');
    }
  };

  const uploadImage = async () => {
    if (!profileImage) return null;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', profileImage);

      const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let profileImageUrl = null;

      // Upload image first if a new image is selected
      if (profileImage) {
        profileImageUrl = await uploadImage();
        if (!profileImageUrl) {
          // If image upload fails, don't proceed with profile update
          setLoading(false);
          return;
        }
      }

      const updateData = {
        name: formData.name,
        email: formData.email
      };

      // Include profile image URL if uploaded
      if (profileImageUrl) {
        updateData.profileImageUrl = profileImageUrl;
      }

      // Only include password if it's provided
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, updateData);

      if (response.data) {
        updateUser(response.data);
        setSuccess(true);
        toast.success('Profile updated successfully!');

        // Close modal after a short delay to show success state
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to update profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FiUser className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
              <p className="text-sm text-gray-600">Update your personal information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <FiX className="text-gray-500 text-xl" />
          </button>
        </div>

        {/* Profile Image Section */}
        <div className="p-6 border-b border-gray-200">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex items-center gap-4">
            <div className="relative">
              {imagePreview || user?.profileImageUrl ? (
                <img
                  src={imagePreview || user.profileImageUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-gray-200 object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-4 border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <FiUser className="text-white text-2xl" />
                </div>
              )}
              <button
                type="button"
                onClick={handleImageSelect}
                disabled={loading || uploadingImage}
                className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-full flex items-center justify-center text-white transition-colors"
                title="Change profile picture"
              >
                {uploadingImage ? (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FiCamera className="text-sm" />
                )}
              </button>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <p className="text-xs text-blue-600 mt-1 capitalize">{user?.role}</p>

              {profileImage && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-xs text-green-600">New image selected</p>
                </div>
              )}

              <button
                type="button"
                onClick={handleImageSelect}
                disabled={loading || uploadingImage}
                className="mt-2 text-xs text-blue-600 hover:text-blue-700 disabled:opacity-50 flex items-center gap-1"
              >
                <FiUpload className="text-xs" />
                {profileImage ? 'Change Image' : 'Upload Image'}
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiUser className="inline mr-2" />
              Full Name
            </label>
            <Input
              value={formData.name}
              onChange={({ target }) => handleInputChange('name', target.value)}
              placeholder="Enter your full name"
              type="text"
              disabled={loading}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiMail className="inline mr-2" />
              Email Address
            </label>
            <Input
              value={formData.email}
              onChange={({ target }) => handleInputChange('email', target.value)}
              placeholder="Enter your email address"
              type="email"
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiLock className="inline mr-2" />
              New Password (Optional)
            </label>
            <Input
              value={formData.password}
              onChange={({ target }) => handleInputChange('password', target.value)}
              placeholder="Enter new password"
              type="password"
              disabled={loading}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          {formData.password && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiLock className="inline mr-2" />
                Confirm New Password
              </label>
              <Input
                value={formData.confirmPassword}
                onChange={({ target }) => handleInputChange('confirmPassword', target.value)}
                placeholder="Confirm new password"
                type="password"
                disabled={loading}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success || uploadingImage}
              className={`flex-1 px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 ${
                success
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {uploadingImage ? 'Uploading Image...' : 'Updating...'}
                </>
              ) : success ? (
                <>
                  <FiCheckCircle />
                  Updated Successfully!
                </>
              ) : (
                <>
                  <FiSave />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
