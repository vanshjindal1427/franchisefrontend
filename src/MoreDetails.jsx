import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Add this import at the top
import React, { useState, useEffect, use } from 'react'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid';
import emailjs from 'emailjs-com';

// useEffect(() => {
//     emailjs.init("cX38yvWHGI3oN5rDL")
// },[]);

const EMAILJS_SERVICE_ID = "service_sgbjyal";
const EMAILJS_TEMPLATE_ID = "template_202zlf8";
const EMAILJS_USER_ID = "cX38yvWHGI3oN5rDL";

function MoreDetails() {
    const navigate = useNavigate();  // Add this hook
    const params = useParams();
    let [obj, setObj] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [darkMode] = useState(false); // Add darkMode state
    const [isChecked] = useState(false); // Add 
    // async function fetchDetails() {
    //     let url = "http://franchisebackend-production-a6c5.up.railway.app/admin/moreDetails"
    //     let result = await axios.post(url, { emailid: params.emailid }, { headers: { "Content-Type": "application/x-www-form-urlencoded" }, });
    //     setObj(result.data.document);
    // }
    async function fetchDetails() {
        try {
            setLoading(true);
            let url = "http://franchisebackend-production-a6c5.up.railway.app/admin/moreDetails"
            let result = await axios.post(url, { emailid: params.emailid },
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                });
            console.log('API Response:', result.data); // Add this for debugging
            setObj(result.data.document);
        } catch (err) {
            console.error('Error fetching details:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(function () {
        console.log('Params:', params); // Add this
        console.log('Email ID:', params.emailid); // Add this
        fetchDetails();
    }, [params.emailid]);
    async function handleApprove(email) {
        // alert(email);
        let obj = { emailid: email };
        let url = "http://franchisebackend-production-a6c5.up.railway.app/admin/approveApplication";
        let resp = await axios.post(url, obj, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        alert(resp.data);
        // getApplications();
        navigate('/applicantsTable')
    }
    async function handleDecline(email) {
        // alert(email);
        let obj = { emailid: email };
        let url = "http://franchisebackend-production-a6c5.up.railway.app/admin/declineApplication";
        let resp = await axios.post(url, obj, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        alert(resp.data);
        // getApplications();
        navigate('/applicantsTable')
    }
    async function handleFranchise(email) {
        alert(email);
        var password = nanoid(10);
        let obj = { emailid: email, password: password };
        let url = "http://franchisebackend-production-a6c5.up.railway.app/admin/franchiseApplication";
        let resp = await axios.post(url, obj, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        alert(resp.data);
        // getApplications();
        navigate('/applicantsTable')
        try {
            // Generate random password
            

            // Save franchise credentials
            let obj = {
                emailid: email,
                
            };

            let url = "http://franchisebackend-production-a6c5.up.railway.app/admin/franchiseApplication";
            let resp = await axios.post(url, obj, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            // Send email with credentials
            const emailParams = {
                emailid: email,
                fullname: obj.fullname,
                password: password,
                portal_url : "http://localhost:5173/franchise/login"
            };

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                emailParams,
                EMAILJS_USER_ID
            );

            alert("Franchise credentials sent successfully!");
            navigate('/applicantsTable');

        } catch (error) {
            console.error("Error:", error);
            alert("Error creating franchise: " + error.message);
        }
    }
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    // Add this before the main return statement
    if (loading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-white">Error: {error.message}</div>;
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <button
                onClick={() => navigate('/applicantsTable')}
                className="fixed top-4 left-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-sm flex items-center gap-2 transition-all duration-300"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Back
            </button>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="px-6 py-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Application Details
                    </h1>
                    <div className="space-y-8 ">
                        {/* Personal Info Section */}
                        <section className="space-y-4 bg-blue-50/50 p-6 rounded-xl">
                            <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-2">
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-gray-600 text-sm font-medium">Email</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                        value={obj.emailid || 'Not Available'}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-600 text-sm font-medium">Full Name</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                        value={obj.fullname || 'Not Available'}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-600 text-sm font-medium">Contact</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                        value={obj.contact || 'Not Available'}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-600 text-sm font-medium">Application Date</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                        value={formatDate(obj.doa) || 'Not Available'}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-600 text-sm font-medium">Residence</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                        value={obj.residence || 'Not Available'}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="mt-6 border-t border-blue-100 pt-4">
                                <h3 className="text-lg font-medium text-gray-700 mb-3">Identity Verification</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-gray-600 text-sm font-medium">ID Proof</label>
                                        <div className="flex items-center gap-4">
                                            {obj.validID ? (
                                                <div className="relative group">
                                                    <img
                                                        src={obj.validID}
                                                        alt="ID Proof"
                                                        className="h-32 w-48 object-cover rounded-lg border border-blue-200 shadow-sm"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                        <a
                                                            href={obj.validID}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-white text-sm font-medium hover:underline"
                                                        >
                                                            View Full Size
                                                        </a>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-32 w-48 bg-gray-100 rounded-lg border border-blue-200 flex items-center justify-center">
                                                    <span className="text-gray-500 text-sm">No ID Proof Available</span>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Business Details Section */}
                        <section className="space-y-4 bg-blue-50 p-6 rounded-xl">
                            <h2 className="text-xl font-semibold text-gray-700 border-b border-blue-200 pb-2">
                                Business Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-gray-600 text-sm font-medium">Current Business</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-white border border-blue-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                        value={obj.currBuss || 'Not Available'}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-600 text-sm font-medium">Since</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-white border border-blue-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                        value={obj.since || 'Not Available'}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Site Details Section */}
                        <section className="space-y-4 bg-indigo-50 p-6 rounded-xl">
                            <h2 className="text-xl font-semibold text-gray-700 border-b border-indigo-200 pb-2">
                                Site Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-gray-600 text-sm font-medium">Location</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                        value={`${obj.city || 'N/A'} - ${obj.pincode || 'N/A'}`}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-600 text-sm font-medium">Floor</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                        value={typeof obj.floor !== 'undefined' && obj.floor !== null ? `Floor ${obj.floor}` : 'Ground Floor'}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-600 text-sm font-medium">Area (sq.ft)</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                        value={obj.area || 'Not Available'}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-600 text-sm font-medium">Ownership</label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                        value={obj.ownership || 'Not Available'}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 mt-4">
                                <label className="text-gray-600 text-sm font-medium">Complete Address</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg bg-white border border-indigo-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                                    value={obj.siteAdd || 'Not Available'}
                                    readOnly
                                    rows="2"
                                />
                            </div>
                        </section>

                        {/* Action Button */}
                        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                onClick={() => handleDecline(obj.emailid)}
                                className="w-full bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                Decline
                            </button>

                            <button
                                onClick={() => handleApprove(obj.emailid)}
                                className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Approve
                            </button>

                            <button
                                onClick={() => handleFranchise(obj.emailid)}
                                className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                                Franchise
                            </button>
                        </div>

                        {/* Add these handler functions near the top of your component */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoreDetails