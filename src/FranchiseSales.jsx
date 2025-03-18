import axios from 'axios';
import React, { useState } from 'react';
import { FiCalendar, FiDollarSign, FiUsers, FiMail } from 'react-icons/fi';

function FranchiseSales() {
    const franchiseInfo = JSON.parse(localStorage.getItem('franchiseInfo'));
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        totalSales: '',
        customersVisited: '',
        emailid: franchiseInfo?.emailid || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var token = localStorage.getItem('token');
        // Add your submit logic here
        try {
            const url = 'http://localhost:2007/franchise/addSales';
            const response = await axios.post(url, formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded", 'authorization': `Bearer ${token}`},  
            });

            if (response.data.success) {
                alert(response.data.message);
                setFormData({
                    date: new Date().toISOString().split('T')[0],
                    totalSales: '',
                    customersVisited: '',
                    emailid: franchiseInfo?.emailid || ''
                });
            } else {
                alert(response.data.message);
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to add sales data');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* Form Container with subtle gradient background */}
            <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-100">
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Daily Sales Report</h2>
                    <p className="mt-2 text-sm text-gray-600">Enter your daily sales information below</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Date Input */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-900 mb-1">
                            Date
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiCalendar className="h-4 w-4 text-blue-500" />
                            </div>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 
                                rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 
                                focus:border-blue-500 bg-white group-hover:border-blue-400 
                                transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Total Sales Input */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-900 mb-1">
                            Today's Sales (₹)
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiDollarSign className="h-4 w-4 text-blue-500" />
                            </div>
                            <input
                                type="number"
                                name="totalSales"
                                value={formData.totalSales}
                                onChange={handleChange}
                                placeholder="Enter total sales amount"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 
                                rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 
                                focus:border-blue-500 bg-white group-hover:border-blue-400 
                                transition-all duration-200 placeholder-gray-400"
                                required
                                min="0"
                            />
                        </div>
                    </div>

                    {/* ... similar updates for Customers Visited input ... */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-900 mb-1">
                            Customers Visited
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUsers className="h-4 w-4 text-blue-500" />
                            </div>
                            <input
                                type="number"
                                name="customersVisited"
                                value={formData.customersVisited}
                                onChange={handleChange}
                                placeholder="Enter number of customers"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 
            rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 
            focus:border-blue-500 bg-white group-hover:border-blue-400 
            transition-all duration-200 placeholder-gray-400"
                                required
                                min="0"
                            />
                        </div>
                    </div>
                    {/* Email Input with different styling for readonly */}
                    <div className="relative">
                        <label className="block text-sm font-semibold text-gray-900 mb-1">
                            Franchise Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="emailid"
                                value={formData.emailid}
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 
                                rounded-lg bg-gray-50 cursor-not-allowed shadow-sm text-gray-500"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Submit Button with enhanced styling */}
                    <button
                        type="submit"
                        className="w-full mt-8 flex justify-center py-3 px-4 rounded-lg 
                        text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                        transition-all duration-200 shadow-lg shadow-blue-500/30 
                        hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
                    >
                        Submit Sales Report
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FranchiseSales;