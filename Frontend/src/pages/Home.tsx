import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-200 to-blue-200 flex items-center justify-center">
            <main className="bg-white container mx-auto px-6 py-12 rounded-3xl shadow-lg relative overflow-hidden w-[768px] max-w-full min-h-[480px]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Welcome to MediTrack
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
        </div>
    );
};

export default LandingPage;
