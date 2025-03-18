// import React, { useState, useEffect } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { BsChevronDown } from 'react-icons/bs';
// import FranchiseSidebar from './FranchiseSidebar';

// function FranchiseDashboard() {
//     const [open, setOpen] = useState(true);
//     const [franchiseEmail, setFranchiseEmail] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const franchiseInfo = JSON.parse(localStorage.getItem('franchiseInfo'));
//         if (!franchiseInfo) {
//             navigate('/franchise/login');
//         } else {
//             setFranchiseEmail(franchiseInfo.emailid);
//         }
//     }, [navigate]);

//     return (
//         <div className="flex">
//             <FranchiseSidebar open={open} setOpen={setOpen} />
//             <div className="flex-1">
//                 <div className="p-7">
//                     <div className="flex justify-between items-center mb-6">
//                         <h1 className="text-2xl font-semibold">Dashboard</h1>
//                         <div className="text-lg font-normal flex items-center gap-2">
//                             <span>{franchiseEmail}</span>
//                             <BsChevronDown />
//                         </div>
//                     </div>
//                     <div className="content">
//                         <Outlet />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default FranchiseDashboard;

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { BsChevronDown, BsBell } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import FranchiseSidebar from './FranchiseSidebar';

function FranchiseDashboard() {
    const [open, setOpen] = useState(true);
    const [franchiseEmail, setFranchiseEmail] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const franchiseInfo = JSON.parse(localStorage.getItem('franchiseInfo'));
        if (!franchiseInfo) {
            navigate('/franchise/login');
        } else {
            setFranchiseEmail(franchiseInfo.emailid);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('franchiseInfo');
        navigate('/franchise/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <FranchiseSidebar open={open} setOpen={setOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="px-4 py-4 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-gray-800">SST Bathinda</h1>
                        <div className="flex items-center gap-4">
                            {/* Notification Bell */}
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <BsBell className="w-6 h-6 text-gray-600" />
                            </button>
                            
                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                                        <FiUser className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{franchiseEmail}</span>
                                    <BsChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {/* Dropdown Menu */}
                                {showProfileMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <button
                                            onClick={() => navigate('/franchise/settings')}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        >
                                            Settings
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="container mx-auto px-6 py-8">
                        {/* Breadcrumb can be added here */}
                        
                        {/* Content Area */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <Outlet />
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white shadow-sm">
                    <div className="mx-auto px-4 py-3">
                        <p className="text-center text-sm text-gray-600">
                            © 2024 SST Franchise Dashboard. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default FranchiseDashboard;