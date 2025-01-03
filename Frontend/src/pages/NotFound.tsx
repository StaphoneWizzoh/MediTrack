import React from "react";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Page not Found</h1>
            <div>
                <p className="text-lg text-gray-600">
                    The page you are looking for does not exist.
                </p>
            </div>
        </div>
    );
};

export default NotFound;
