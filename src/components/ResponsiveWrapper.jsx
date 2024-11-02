import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { MdDesktopMac } from 'react-icons/md'; // Desktop icon

const ResponsiveWrapper = ({ children }) => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!isLargeScreen) {
        return (
            <>
                <Navbar />
                <div className="flex items-center justify-center h-screen p-4 bg-white">
                    <div className="text-center p-6 bg-white border border-gray-300 rounded-lg shadow-md max-w-sm">
                        <MdDesktopMac className="mx-auto text-blue-500 text-6xl mb-4" />
                        <h1 className="text-xl font-bold text-gray-800 mb-2">Please Use a Desktop</h1>
                        <p className="text-gray-700 mb-4">
                            For the best experience, please open this website on a PC or laptop.
                        </p>
                        {/* <button
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                            onClick={() => alert('Please switch to a larger screen for better viewing!')}
                        >
                            Got It!
                        </button> */}
                    </div>
                </div>
            </>
        );
    }

    return <div>{children}</div>;
};

export default ResponsiveWrapper;
