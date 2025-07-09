import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import { FiLock, FiCheckCircle, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [tokenValid, setTokenValid] = useState(null);
  
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      return;
    }
    
    // Validate token on component mount
    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      // You can add a token validation endpoint if needed
      setTokenValid(true);
    } catch (error) {
      setTokenValid(false);
      toast.error('Invalid or expired reset link');
    }
  };

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
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
      const response = await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, {
        token,
        password: formData.password
      });

      if (response.data) {
        setSuccess(true);
        toast.success('Password reset successfully!');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to reset password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (tokenValid === false) {
    return (
      <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <FiAlertCircle className="text-red-500 text-2xl" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            This password reset link is invalid or has expired. Please request a new password reset.
          </p>
          
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            Back to Login
            <FiArrowRight />
          </button>
        </div>
      </AuthLayout>
    );
  }

  if (tokenValid === null) {
    return (
      <AuthLayout>
        <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center items-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4">Validating reset link...</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FiLock className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {success ? 'Password Reset!' : 'Reset Your Password'}
              </h3>
              <p className="text-sm text-gray-600">
                {success 
                  ? 'Your password has been successfully reset' 
                  : 'Enter your new password below'
                }
              </p>
            </div>
          </div>
        </div>

        {success ? (
          /* Success State */
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <FiCheckCircle className="text-green-500 text-2xl" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">Password Reset Successfully!</h3>
              <p className="text-sm text-gray-600">
                You can now sign in with your new password.
              </p>
              <p className="text-xs text-gray-500">
                Redirecting to login page in 3 seconds...
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              Go to Login
              <FiArrowRight />
            </button>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FiLock className="text-gray-500" />
                New Password
              </label>
              <Input
                value={formData.password}
                onChange={({ target }) => handleInputChange('password', target.value)}
                placeholder="Enter your new password"
                type="password"
                disabled={loading}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FiLock className="text-gray-500" />
                Confirm New Password
              </label>
              <Input
                value={formData.confirmPassword}
                onChange={({ target }) => handleInputChange('confirmPassword', target.value)}
                placeholder="Confirm your new password"
                type="password"
                disabled={loading}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Password Requirements */}
            <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="font-medium text-blue-800 mb-1">Password Requirements:</p>
              <ul className="text-blue-700 space-y-1 text-xs">
                <li>• At least 6 characters long</li>
                <li>• Use a mix of letters, numbers, and symbols</li>
                <li>• Avoid common passwords</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Resetting Password...
                </>
              ) : (
                <>
                  Reset Password
                  <FiArrowRight />
                </>
              )}
            </button>

            {/* Back to Login Link */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm text-gray-600 hover:text-gray-700 transition-colors duration-200 hover:underline"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
