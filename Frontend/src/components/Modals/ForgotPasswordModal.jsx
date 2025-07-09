import React, { useState } from 'react';
import { FiX, FiMail, FiSend, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import Input from '../Inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { validateEmail } from '../../utils/helper';
import toast from 'react-hot-toast';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, {
        email
      });

      if (response.data) {
        setSuccess(true);
        toast.success('Password reset email sent successfully!');
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError('Failed to send reset email. Please try again.');
        toast.error('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  const handleBackToLogin = () => {
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FiMail className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {success ? 'Email Sent!' : 'Forgot Password?'}
              </h2>
              <p className="text-sm text-gray-600">
                {success 
                  ? 'Check your email for reset instructions' 
                  : 'Enter your email to reset your password'
                }
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <FiX className="text-gray-500 text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            /* Success State */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <FiCheckCircle className="text-green-500 text-2xl" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Check Your Email</h3>
                <p className="text-sm text-gray-600">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-xs text-gray-500">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={() => {
                    setSuccess(false);
                    setEmail('');
                  }}
                  className="w-full text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  Send Another Email
                </button>
                
                <button
                  onClick={handleBackToLogin}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FiArrowLeft />
                  Back to Login
                </button>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  value={email}
                  onChange={({ target }) => {
                    setEmail(target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  type="email"
                  disabled={loading}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="font-medium text-blue-800 mb-1">What happens next?</p>
                <ul className="text-blue-700 space-y-1 text-xs">
                  <li>• We'll send a secure reset link to your email</li>
                  <li>• Click the link to create a new password</li>
                  <li>• The link expires in 1 hour for security</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={loading}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Send Reset Link
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
