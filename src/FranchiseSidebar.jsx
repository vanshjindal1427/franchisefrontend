// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { HiMenuAlt3 } from 'react-icons/hi';
// import { MdOutlineDashboard, MdOutlineSettings } from 'react-icons/md';
// import { TbReportMoney } from 'react-icons/tb';
// import { BiHistory } from 'react-icons/bi';
// import { FiLogOut } from 'react-icons/fi';
// import { BsBarChart } from 'react-icons/bs';

// const FranchiseSidebar = ({ open, setOpen }) => {
//     const navigate = useNavigate();

//     const menus = [
//         // { name: "Dashboard", link: "/franchise", icon: MdOutlineDashboard },
//         { name: "Sales", link: "/franchiseDashboard/sales", icon: TbReportMoney },
//         { name: "Sales History", link: "/franchiseDashboard/history", icon: BiHistory },
//         { name: "Charts", link: "/franchiseDashboard/charts", icon: BsBarChart },
//         { name: "Settings", link: "/franchiseDashboard/settings", icon: MdOutlineSettings },
//     ];

//     const handleLogout = () => {
//         localStorage.removeItem('franchiseInfo');
//         navigate('/franchise/login');
//     };

//     return (
//         <div className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
//             <div className="py-3 flex justify-end">
//                 <HiMenuAlt3
//                     size={26}
//                     className="cursor-pointer"
//                     onClick={() => setOpen(!open)}
//                 />
//             </div>
//             <div className="mt-4 flex flex-col gap-4 relative">
//                 {menus?.map((menu, i) => (
//                     <div
//                         key={i}
//                         onClick={() => navigate(menu?.link)}
//                         className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer"
//                     >
//                         <div>{React.createElement(menu?.icon, { size: "20" })}</div>
//                         <h2
//                             style={{ transitionDelay: `${i + 3}00ms` }}
//                             className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
//                         >
//                             {menu?.name}
//                         </h2>
//                         <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
//                             {menu?.name}
//                         </h2>
//                     </div>
//                 ))}
//                 <div
//                     onClick={handleLogout}
//                     className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer mt-auto"
//                 >
//                     <div><FiLogOut size="20" /></div>
//                     <h2
//                         style={{ transitionDelay: '700ms' }}
//                         className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
//                     >
//                         Logout
//                     </h2>
//                     <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>
//                         Logout
//                     </h2>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FranchiseSidebar;

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineDashboard, MdOutlineSettings } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';
import { BiHistory } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { BsBarChart } from 'react-icons/bs';

const FranchiseSidebar = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        { 
            name: "Dashboard", 
            link: "/franchiseDashboard/charts", 
            icon: MdOutlineDashboard,
            description: "Overview & Statistics"
        },
        { 
            name: "Sales", 
            link: "/franchiseDashboard/sales", 
            icon: TbReportMoney,
            description: "Manage Sales"
        },
        { 
            name: "Sales History", 
            link: "/franchiseDashboard/history", 
            icon: BiHistory,
            description: "View Past Records"
        },
        
        { 
            name: "Settings", 
            link: "/franchiseDashboard/settings", 
            icon: MdOutlineSettings,
            description: "Manage Account"
        },
    ];

    const handleLogout = () => {
        localStorage.removeItem('franchiseInfo');
        navigate('/franchise/login');
    };
    
    return (
        <div 
            className={`bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen 
            ${open ? "w-72" : "w-20"} duration-300 text-gray-100 
            transition-all ease-in-out relative`}
        >
            {/* Logo Section */}
            <div className="px-4 py-6 flex items-center justify-between border-b border-gray-700">
                {open ? (
                    <div className="flex items-center">
                        <span className="text-xl font-bold">SST Bathinda</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-start ml-1">
                        <span className="text-xl font-bold">SST</span>
                    </div>
                )}
                <button
                    onClick={() => setOpen(!open)}
                    className={`p-2 rounded-lg hover:bg-gray-700 transition-all duration-300
            ${!open ? 'absolute right-[-12px] top-5 bg-gray-800 border border-gray-700' : ''}`}
                >
                    <HiMenuAlt3
                        size={20}
                        className={`transform transition-transform duration-300 
                ${open ? 'rotate-0' : 'rotate-180'}`}
                    />
                </button>
            </div>
    
          
        
    
            {/* Menu Items */}
            <nav className="px-4 flex flex-col gap-1">
                {menus?.map((menu, i) => {
                    const isActive = location.pathname === menu.link;
                    return (
                        <button
                            key={i}
                            onClick={() => navigate(menu?.link)}
                            className={`group flex items-center w-full p-3 rounded-lg 
                            transition-all duration-200 relative
                            ${isActive 
                                ? 'bg-indigo-600 text-white' 
                                : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                            }`}
                        >
                            <div className="min-w-[24px]">
                                {React.createElement(menu?.icon, { 
                                    size: "20",
                                    className: `${isActive ? 'text-white' : 'text-gray-300'}`
                                })}
                            </div>
                            
                            <div className={`flex flex-col ml-3 overflow-hidden transition-all duration-300 
                                ${!open ? "w-0" : "w-[180px]"}`}>
                                <span className="text-sm font-medium truncate">
                                    {menu?.name}
                                </span>
                                {open && (
                                    <span className="text-xs text-gray-400 truncate">
                                        {menu?.description}
                                    </span>
                                )}
                            </div>
                            
                            {/* Tooltip */}
                            {!open && (
                                <div className="absolute left-full rounded-md px-2 py-1 ml-6 
                                    bg-gray-900 text-white text-sm invisible opacity-20 
                                    -translate-x-3 transition-all group-hover:visible 
                                    group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-50">
                                    <div className="font-medium">{menu?.name}</div>
                                    <div className="text-xs text-gray-400">{menu?.description}</div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>
    
            {/* Logout Button */}
            <button 
                onClick={handleLogout}
                className="absolute bottom-8 left-0 w-full px-4 group"
            >
                <div className="flex items-center gap-3 p-3 rounded-lg 
                    text-red-500 hover:bg-red-500/10 transition-colors">
                    <div className="min-w-[24px]">
                        <FiLogOut size="20" />
                    </div>
                    <span className={`text-sm font-medium transition-all duration-300 
                        ${!open ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
                        Logout
                    </span>
                    
                    {/* Logout Tooltip */}
                    {!open && (
                        <div className="absolute left-full rounded-md px-2 py-1 ml-6 
                            bg-gray-900 text-white text-sm invisible opacity-20 
                            -translate-x-3 transition-all group-hover:visible 
                            group-hover:opacity-100 group-hover:translate-x-0 z-50">
                            Logout
                        </div>
                    )}
                </div>
            </button>
        </div>
    );
    
    // ...rest of the component
};

export default FranchiseSidebar;