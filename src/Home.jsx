import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import heroImg from './images/hero img.png';
import easy from './images/easy.svg';
import excel from './images/excel.svg';
import gdrive from './images/gdrive.svg';

const HomePage = () => {
    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50  shadow-lg">
            {/* Hero Section */}
            <header className="bg-gradient-to-r from-purple-800 to-blue-600 text-white py-20 px-6 lg:px-32 shadow-lg">
                <div className="container mx-auto flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Welcome to SRCAS Mark Entry System
                        </h1>
                        <p className="text-sm md:text-base lg:text-xl">
                            Streamline student mark entry with an easy-to-use, secure platform exclusively for SRCAS faculties. This platform simplifies the process of entering students' exam marks, allowing faculty to efficiently record and manage scores. Exclusive for the <span className="font-bold text-yellow-500">faculties of SRCAS.</span>
                        </p>
                        <div className="flex flex-row gap-4 pt-10">
                            <Link to="/marks-entry" className="bg-yellow-500 duration-300 text-black py-3 px-6 rounded-full text-base font-semibold shadow-md hover:bg-yellow-600  sm:mb-0">
                                Go to Dashboard
                            </Link>
                            <Link to="/LearnMore" className="border duration-300 border-yellow-500 text-yellow-500 py-3 px-6 rounded-full text-base font-semibold hover:bg-yellow-500  hover:text-black">
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">
                        <img src={heroImg} alt="Dashboard preview" className="max-w-xs lg:max-w-md rounded-lg drop-shadow-2xl" />
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-16 bg-white bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] shadow-lg ">
                <div className="container mx-auto px-6 md:px-3 lg:px-12">
                    <h2 className="text-3xl font-bold text-center underline underline-offset-4 text-blue-700 mb-10">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
                        {[
                            { title: "Easy Mark Entry", img: easy, desc: "Quick and hassle-free entry of student scores." },
                            { title: "Export to Excel", img: excel, desc: "Generate and download reports in Excel format." },
                            { title: "Secure Cloud Storage", img: gdrive, desc: "Save and access data securely with cloud storage." }
                        ].map((feature, index) => (
                            <div key={index} className="flex flex-col border-2 border-gray-300 hover:border-blue-500 items-center bg-white lg:p-8 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                                <img src={feature.img} alt={feature.title} className="lg:h-20 h-12 lg:mb-4 mb-2" />
                                <h3 className="lg:text-xl text-lg font-semibold mb-3">{feature.title}</h3>
                                <p className="text-center text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section - Responsive Steps Layout */}
            <section className="py-16 bg-gray-50 ">
                <div className="container mx-auto px-6 md:px-12">
                    <h2 className="text-4xl font-extrabold text-center underline underline-offset-4 mb-12 text-blue-700">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: "Login", desc: "Login securely with credentials.", icon: "🔑" },
                            { title: "Enter Scores", desc: "Access student data and enter scores.", icon: "📝" },
                            { title: "Save & Export", desc: "Save data to cloud or download reports.", icon: "☁️" }
                        ].map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                {/* Step Icon */}
                                <div className="flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white h-16 w-16 rounded-full text-3xl shadow-lg mb-4">
                                    {step.icon}
                                </div>
                                {/* Step Details */}
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                                <p className="text-gray-900 bg-gray-100 p-2 lg:p-4 rounded-lg border border-gray-300">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Call to Action */}
            <section className="py-16 px-4 bg-white bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] shadow-lg  text-black">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-lg mb-6">Start entering student scores now for a seamless workflow.</p>
                    <Link to="/marks-entry" className="bg-yellow-500 text-black py-3 px-8 rounded-full text-lg font-semibold shadow-md hover:bg-yellow-600">
                        Go to Mark Entry
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
