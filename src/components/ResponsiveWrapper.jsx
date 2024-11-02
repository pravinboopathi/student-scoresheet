import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { MdDesktopMac } from 'react-icons/md'; // Desktop icon

const ResponsiveWrapper = ({ children }) => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isMarksEntryPage = location.pathname === '/marks-entry';

    if (!isLargeScreen && isMarksEntryPage) {
        return (
            <>
                <Navbar />
                <div className="flex items-center justify-center h-screen p-4 bg-white">
                    <div className="text-center p-6 bg-white border border-gray-300 rounded-lg shadow-md max-w-sm">
                        <MdDesktopMac className="mx-auto text-blue-500 text-6xl mb-4" />
                        <h1 className="text-xl font-bold text-gray-800 mb-2">Please Use a Desktop</h1>
                        <p className="text-gray-700 mb-4">
                            For the best experience, please open this page on a PC or laptop.
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return <div>{children}</div>;
};

export default ResponsiveWrapper;
