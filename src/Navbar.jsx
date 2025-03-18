import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const franchiseInfo = JSON.parse(localStorage.getItem('franchiseInfo'));
    
    const handleLogout = () => {
        localStorage.removeItem('franchiseInfo');
        navigate('/');
    };

    // Check if we're on the index page
    const isIndexPage = location.pathname === '/';
    const isDashboardRoute = location.pathname.includes('/franchiseDashboard');

    if (isDashboardRoute) return null;
    
    return (
        <nav className={`${isIndexPage ? 'absolute w-full z-50 bg-transparent' : 'bg-gray-900'}`}>
            <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="inline-flex items-center">
                            <span className="text-xl font-bold tracking-tight text-white hover:text-white/90 transition-colors">
                                SST Bathinda
                            </span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button type="button" className="p-1.5 text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <Link
                            to="/"
                            className="font-sans text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            to="/applicationform"
                            className="font-sans text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Apply for Franchise
                        </Link>

                        {/* Auth Button */}
                        {franchiseInfo?.isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className={`inline-flex items-center justify-center px-4 py-2 font-sans text-sm font-medium 
                                border-2 rounded-lg text-white border-primary hover:bg-primary transition-colors`}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/franchise/login"
                                className={`inline-flex items-center justify-center px-4 py-2 font-sans text-sm font-medium 
                                border-2 rounded-lg text-white border-primary hover:bg-primary transition-colors`}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;