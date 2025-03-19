import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FranchiseLogin() {
    const [credentials, setCredentials] = useState({
        emailid: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // try {
            
        //     let url = 'https://franchisebackend-production-a6c5.up.railway.app/franchise/franchiselogin';
        //     const response = await axios.post(url, credentials, {
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        //     });

        //     if (response.data.success) {
        //         // Store franchise info in localStorage
        //         alert("Login Successful");
        //         localStorage.setItem('franchiseInfo', JSON.stringify({
        //             emailid: credentials.emailid,
        //             isLoggedIn: true
        //         }));
        //         navigate('/franchiseDashboard');
        //     } else {
        //         setError(response.data.message || 'Invalid credentials');
        //     }
        // } catch (err) {
        //     setError(err.response?.data?.message || 'Login failed');
        // }
        try {
            // Check if trying to login as admin
            if (credentials.emailid === "admin@sstbathinda.com") {
                const response = await axios.post('https://franchisebackend-production-a6c5.up.railway.app/admin/login', credentials, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                if (response.data.success) {
                    localStorage.setItem('franchiseInfo', JSON.stringify({
                        emailid: credentials.emailid,
                        isAdmin: true,
                        isLoggedIn: true
                    }));
                    navigate('/applicantsTable');
                    return;
                }
            }

            console.log('Attempting to login as franchise', credentials);
            // If not admin or admin login failed, try franchise login
            const response = await axios.post('https://franchisebackend-production-a6c5.up.railway.app/franchise/franchiselogin', credentials, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            if (response.data.success) {
                localStorage.setItem('franchiseInfo', JSON.stringify({
                    emailid: credentials.emailid,
                    isLoggedIn: true
                }));
                localStorage.setItem('token', response.data.token);
                // alert(localStorage.getItem('token'));
                navigate('/franchiseDashboard');
            } else {
                setError(response.data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login faileddd');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Franchise Login
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="emailid" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                id="emailid"
                                name="emailid"
                                type="email"
                                required
                                value={credentials.emailid}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={credentials.password}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default FranchiseLogin;