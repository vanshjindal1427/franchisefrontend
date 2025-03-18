import React from 'react';
import { Link } from 'react-router-dom';

function Index() {

    const galleryImages = [
        {
            url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
            title: "Freshly Baked Bread"
        },
        {
            url: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
            title: "Artisan Pastries"
        },
        {
            url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
            title: "Premium Cakes"
        },
        {
            url: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
            title: "Gourmet Cookies"
        }
    ];
    return (
        <div className="bg-black">
            {/* Hero Section */}
            <div className="relative pt-32 pb-12 xl:pt-40 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56">
                <div className="absolute inset-0">
                    <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Bakery background" />
                    <div className="absolute inset-0 bg-black opacity-75"></div>
                </div>

                <div className="relative">
                    <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
                        <div className="w-full lg:w-2/3 xl:w-1/2">
                            <h1 className="font-sans text-base font-normal tracking-tight text-white text-opacity-70 animation-fade-in">Excellence in Every Bite</h1>
                            <p className="mt-6 tracking-tighter text-white" style={{ animationDelay: '200ms' }}> 
                                <span className="font-sans font-normal text-7xl">The road to the</span><br />
                                <span className="font-serif italic font-normal text-8xl">perfect loaf</span>
                            </p>
                            <p className="mt-12 font-sans text-base font-normal leading-7 text-white text-opacity-70">
                                Start your own successful bakery business with SST Bathinda's proven franchise model.
                                Join our network of successful entrepreneurs and benefit from our decades of expertise in
                                crafting premium bread and bakery products.
                            </p>
                            <p className="mt-8 font-sans text-xl font-normal text-white">Initial Investment: ₹20-30 Lakhs</p>

                            <div className="flex items-center mt-5 space-x-3 sm:space-x-4">
                                <Link
                                    to="/applicationform"
                                    className="inline-flex items-center justify-center px-5 py-2 font-sans text-base font-semibold transition-all duration-200 border-2 border-transparent rounded-full sm:leading-8 bg-white sm:text-lg text-black hover:bg-opacity-90"
                                >
                                    Apply Now
                                </Link>
                                <a
                                    href="#franchise-steps"
                                    className="inline-flex items-center justify-center px-5 py-2 font-sans text-base font-semibold transition-all duration-200 bg-transparent border-2 rounded-full sm:leading-8 text-white border-primary hover:bg-white hover:text-black"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Franchise Steps Section */}
            <div id="franchise-steps" className="py-24 bg-black">
                <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
                    <h2 className="text-4xl font-bold text-white mb-16">How to Become a Franchise Partner</h2>
                    
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                        {/* Step 1 */}
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">1</div>
                            <div className="bg-gray-900 p-8 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-4">Training Program</h3>
                                <p className="text-gray-400">
                                    Complete our comprehensive 15-day training program covering product knowledge, 
                                    baking techniques, quality control, and business operations. Learn from master 
                                    bakers and business experts at our state-of-the-art training facility.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">2</div>
                            <div className="bg-gray-900 p-8 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-4">Location Requirements</h3>
                                <p className="text-gray-400">
                                    Select a prime location with minimum 1000 sq ft area in a market with 50,000+ 
                                    population. Ensure 2 km radius from existing franchise units. High visibility 
                                    and easy accessibility are key factors.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">3</div>
                            <div className="bg-gray-900 p-8 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-4">Investment Details</h3>
                                <p className="text-gray-400">
                                    Total investment ranges from ₹20-30 lakhs, including franchise fee, equipment, 
                                    interior setup, and initial inventory. Benefit from our established brand name, 
                                    proven business model, and ongoing support.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative">
                            <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">4</div>
                            <div className="bg-gray-900 p-8 rounded-lg h-full">
                                <h3 className="text-xl font-bold text-white mb-4">Application Process</h3>
                                <p className="text-gray-400">
                                    Fill out our online application form with your details and proposed location. 
                                    Our team will evaluate your application and schedule a meeting to discuss the 
                                    opportunity in detail.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-16 text-center">
                        <Link
                            to="/applicationform"
                            className="inline-flex items-center justify-center px-8 py-3 font-sans text-lg font-semibold transition-all duration-200 border-2 rounded-full text-white border-primary hover:bg-white hover:text-black"
                        >
                            Start Your Journey Today
                        </Link>
                    </div>
                </div>
            </div>
            <div className="py-24 bg-gray-900">
                <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Our Premium Products</h2>
                        <p className="text-gray-400 text-lg">
                            Discover our range of freshly baked, high-quality products
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {galleryImages.map((image, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:transform hover:scale-105"
                            >
                                <div className="relative pb-[66.67%]"> {/* Creates a 3:2 aspect ratio */}
                                    <img
                                        src={image.url}
                                        alt={image.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                    <div className="p-4 w-full">
                                        <h3 className="text-white font-semibold text-lg text-center">
                                            {image.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            to="/applicationform"
                            className="inline-flex items-center justify-center px-8 py-3 font-sans text-lg font-semibold transition-all duration-200 border-2 rounded-full text-white border-primary hover:bg-white hover:text-black"
                        >
                            Join Our Franchise Family
                        </Link>
                    </div>
                </div>
            </div>

                        // ... existing code ...
            
            {/* Team Section */}
            <div className="py-16 bg-black">
                <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-3">Our Team</h2>
                        <p className="text-gray-400 text-base">
                            Meet the experts behind SST Bathinda's success
                        </p>
                    </div>
            
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Team Member 1 */}
                        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                            <div className="flex flex-col sm:flex-row">
                                <div className="sm:w-1/3">
                                    <div className="relative pb-[100%] sm:pb-[130%]">
                                        <img
                                            src="../src/assets/itsme.jpg"
                                            alt="CEO"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="p-6 sm:w-2/3">
                                    <h3 className="text-xl font-bold text-white mb-1">Mr. Rajesh Bansal</h3>
                                    <p className="text-primary font-medium text-sm mb-3">Founder & CEO</p>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        With over 24 years of experience in the coding industry, Mr. Rajesh Bansal has
                                        transformed SST Bathinda into a fantastic network of coders.
                                    </p>
                                    <div className="mt-4 flex gap-3">
                                        <a href="https://www.linkedin.com/in/rajesh-bansal-8a87251a/" className="text-gray-400 hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
                                            </svg>
                                        </a>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
            
                        {/* Team Member 2 */}
                        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                            <div className="flex flex-col sm:flex-row">
                                <div className="sm:w-1/3">
                                    <div className="relative pb-[100%] sm:pb-[130%]">
                                        <img
                                            src="../src/assets/A portrait image of a man wearing formals, with short hair, not wearing glasses or spectacles, .jpeg"
                                            alt="Master Baker"
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="p-6 sm:w-2/3">
                                    <h3 className="text-xl font-bold text-white mb-1">Vansh Jindal</h3>
                                    <p className="text-primary font-medium text-sm mb-3">Master Baker & Training Head</p>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Electronics and Communication Engineering Student at DTU | Skilled in C/C++ and Full Stack Web Development | Passionate about Innovation and Continuous Learning | MERN Stack Developer
                                    </p>
                                    <div className="mt-4 flex gap-3">
                                        <a href="https://www.linkedin.com/in/vansh-jindal-63404a22a/" className="text-gray-400 hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
                                            </svg>
                                        </a>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                        {/* Footer Section */}
            <footer className="bg-gray-900 pt-16 pb-12 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        {/* Company Info */}
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-white text-lg font-bold mb-4">SST Bathinda</h3>
                            <p className="text-gray-400 mb-4 max-w-xs">
                                Your trusted partner in the bakery business. 
                                Bringing fresh, quality baked goods to communities across India.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="https://www.instagram.com/vanshjindal_1427/" className="text-gray-400 hover:text-white transition-colors">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
            
                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white text-sm font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/applicationform" className="text-gray-400 hover:text-white transition-colors">
                                        Apply for Franchise
                                    </Link>
                                </li>
                                <li>
                                    <a href="#franchise-steps" className="text-gray-400 hover:text-white transition-colors">
                                        How it Works
                                    </a>
                                </li>
                                <li>
                                    <Link to="/franchise/login" className="text-gray-400 hover:text-white transition-colors">
                                        Franchise Login
                                    </Link>
                                </li>
                            </ul>
                        </div>
            
                        {/* Contact Info */}
                        <div>
                            <h3 className="text-white text-sm font-semibold mb-4">Contact Us</h3>
                            <ul className="space-y-3">
                                <li className="text-gray-400">
                                    <span className="block">SST Bathinda</span>
                                    <span className="block">Om Complex, Ajit Road</span>
                                    <span className="block">Bathinda, Punjab 151001</span>
                                </li>
                                <li className="text-gray-400">
                                    <span className="block">Phone: +91 1234567890</span>
                                    <span className="block">Email: info@sstbathinda.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
            
                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 pt-8">
                        <p className="text-gray-400 text-sm text-center">
                            © {new Date().getFullYear()} SST Bathinda. All rights reserved. | 
                            <a href="#" className="hover:text-white ml-1">Privacy Policy</a> |
                            <a href="#" className="hover:text-white ml-1">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Index;