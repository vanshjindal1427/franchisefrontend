import React, { useState } from 'react';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
function FranchiseSettings() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear messages when user starts typing
        setError('');
        setSuccess('');
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        

        // Basic validation
        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            const franchiseInfo = JSON.parse(localStorage.getItem('franchiseInfo'));
            var url = 'https://franchisebackend-production-a6c5.up.railway.app/franchise/updatePassword';
            const response = await axios.post(url, {
                emailid: franchiseInfo.emailid,
                currentPassword : formData.currentPassword,
                newPassword: formData.newPassword
            }, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });
            if (response.data.success) {
                setSuccess(response.data.message);
                setError('');
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                })
                setShowPasswords({
                    current: false,
                    new: false,
                    confirm: false
                })
            }
            else {
                setError(response.data.message);
                setSuccess('');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update password');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <div className="bg-gradient-to-b from-gray-50 to-white p-6 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100">
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
                    <p className="mt-1 text-sm text-gray-600">Update your account password</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Current Password */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-900 mb-1">
                            Current Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="h-4 w-4 text-blue-500" />
                            </div>
                            <input
                                type={showPasswords.current ? "text" : "password"}
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-10 py-2 border border-gray-200 
    rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 
    focus:border-blue-500 bg-white group-hover:border-blue-400 
    transition-all duration-200 appearance-none
    [&::-ms-reveal]:hidden 
    [&::-ms-clear]:hidden
    [&::-webkit-inner-spin-button]:appearance-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('current')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPasswords.current ?
                                    <FiEyeOff className="h-4 w-4 text-gray-500" /> :
                                    <FiEye className="h-4 w-4 text-gray-500" />
                                }
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-900 mb-1">
                            New Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="h-4 w-4 text-blue-500" />
                            </div>
                            <input
                                type={showPasswords.new ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-10 py-2 border border-gray-200 
    rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 
    focus:border-blue-500 bg-white group-hover:border-blue-400 
    transition-all duration-200 appearance-none
    [&::-ms-reveal]:hidden 
    [&::-ms-clear]:hidden
    [&::-webkit-inner-spin-button]:appearance-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('new')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPasswords.new ?
                                    <FiEyeOff className="h-4 w-4 text-gray-500" /> :
                                    <FiEye className="h-4 w-4 text-gray-500" />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-900 mb-1">
                            Confirm New Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="h-4 w-4 text-blue-500" />
                            </div>
                            <input
                                type={showPasswords.confirm ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-10 py-2 border border-gray-200 
    rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 
    focus:border-blue-500 bg-white group-hover:border-blue-400 
    transition-all duration-200 appearance-none
    [&::-ms-reveal]:hidden 
    [&::-ms-clear]:hidden
    [&::-webkit-inner-spin-button]:appearance-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPasswords.confirm ?
                                    <FiEyeOff className="h-4 w-4 text-gray-500" /> :
                                    <FiEye className="h-4 w-4 text-gray-500" />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-6 flex justify-center py-2.5 px-4 rounded-lg 
            text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
            transition-all duration-200 shadow-lg shadow-blue-500/30 
            hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FranchiseSettings;