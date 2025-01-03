import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
            <header className="bg-white shadow-md">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="text-2xl font-bold text-purple-700">
                        Gemini Health
                    </div>
                    <div>
                        <Link
                            to="/auth"
                            className="bg-purple-700 text-white text-sm py-2 px-4 rounded-lg font-semibold uppercase tracking-wider hover:bg-purple-800 transition-colors"
                        >
                            Sign In / Sign Up
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-6 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Welcome to Gemini Health
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Your trusted partner in healthcare management
                    </p>
                    <Link
                        to="/auth"
                        className="bg-purple-700 text-white text-lg py-3 px-8 rounded-lg font-semibold uppercase tracking-wider hover:bg-purple-800 transition-colors"
                    >
                        Get Started
                    </Link>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-purple-700 mb-4">
                            Easy Appointment Booking
                        </h2>
                        <p className="text-gray-600">
                            Schedule your medical appointments with just a few
                            clicks.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-purple-700 mb-4">
                            Secure Health Records
                        </h2>
                        <p className="text-gray-600">
                            Access and manage your health records securely
                            online.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-purple-700 mb-4">
                            Telemedicine Services
                        </h2>
                        <p className="text-gray-600">
                            Connect with healthcare professionals from the
                            comfort of your home.
                        </p>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; 2023 Gemini Health. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
