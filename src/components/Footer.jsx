import React from 'react';
import logo from '../images/srcaslogo-bgremoved.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const links = [
        { href: "/how-to-use", text: "How to Use" },
        { href: "/support", text: "Support" },
        { href: "https://www.srcas.ac.in", text: "Official SRCAS Website", external: true },
        { href: "/view-sheets", text: "View Sheets" }
    ];

    return (
        <footer className="bg-blue-700">
            <div className="container py-6 mx-auto flex flex-col items-center px-4">
                <div className='bg-white px-2 py-2 rounded-full mb-6'>
                    <img src={logo} alt="SRCAS Logo" className="h-12" />
                </div>
                <div className="flex gap-4 text-xs md:text-base text-gray-300">
                    {links.map(({ href, text, external }) => (
                        <a
                            key={text}
                            href={href}
                            className="underline font-medium underline-offset-4 hover:text-white"
                            target={external ? "_blank" : "_self"}
                            rel={external ? "noopener noreferrer" : undefined}
                        >
                            {text}
                        </a>
                    ))}
                </div>
            </div>
            <p className="text-xs pb-2 md:text-base font-medium text-center text-purple-200">
                &copy; {currentYear} SRCAS. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
