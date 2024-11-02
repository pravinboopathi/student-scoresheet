import React from 'react';
import logo from '../images/srcaslogo-bgremoved.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className=" bg-gray-300 text-gray-800">
            <div className="container py-6 mx-auto flex flex-col items-center px-4">
                <img src={logo} alt="SRCAS Logo" className="mb-4 h-12" />
               
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
                    <a href="/how-to-use" className="underline underline-offset-4">How to Use</a>
                    <a href="/support" className="underline underline-offset-4">Support</a>
                    <a 
                        href="https://www.srcas.ac.in" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="underline underline-offset-4"
                    >
                        Official SRCAS Website
                    </a>
                    <a href="/view-sheets" className="underline underline-offset-4">View Sheets</a>
                </div>
               
                {/* <p className="text-xs md:text-sm text-gray-600 text-center">Crafted with care by Velan (Developer) & Pravin (Designer)</p> */}
            </div>
            <p className="text-sm pb-2 md:text-base font-medium text-center text-purple-900">&copy; {currentYear} SRCAS. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
