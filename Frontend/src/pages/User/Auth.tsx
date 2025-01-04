import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import { userLogin } from "../../features/auth/loginSlice.js";
import { userSignup } from "../../features/auth/signupSlice.js";
import { AppDispatch } from "../../features/store.js";

const AuthForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);
    const [signInData, setSignInData] = useState({
        email: "",
        password: "",
    });

    const [signUpData, setSignUpData] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
    });

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const actionResult = await dispatch(
                userLogin({
                    email: signInData.email,
                    password: signInData.password,
                })
            );

            // Unwrap the result
            const response = unwrapResult(actionResult);
            console.log("Unwrapped response:", response);

            if (response.status === 202) {
                setSignInData({
                    email: "",
                    password: "",
                });
                navigate("/profile");
            } else {
                navigate("/auth");
            }
        } catch (error) {
            console.error("Login error:", error);
            navigate("/auth");
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        // const name = signUpData.username;
        // const phone = signUpData.phone;
        // const email = signUpData.email;
        // const password = signUpData.password;

        try {
            const actionResult = await dispatch(
                userSignup({
                    name: signUpData.username,
                    phone: signUpData.phone,
                    email: signUpData.email,
                    password: signUpData.password,
                })
            );

            // Unwrap the result
            const response = unwrapResult(actionResult);
            console.log("Unwrapped response:", response);

            if (response.status === 201) {
                setSignUpData({
                    username: "",
                    phone: "",
                    email: "",
                    password: "",
                });
                alert("Success! You can now login with your credentials");
                navigate("/auth");
            } else {
                navigate("/auth");
            }
        } catch (error) {
            console.error("Login error:", error);
            navigate("/auth");
        }

        // dispatch(userSignup({ name, phone, email, password }))
        //     .then((actionResult) => {
        //         const response = unwrapResult(actionResult);
        //         if (response.status === 201) {
        //             setSignUpData({
        //                 username: "",
        //                 phone: "",
        //                 email: "",
        //                 password: "",
        //             });
        //             navigate("/profile");
        //         } else {
        //             navigate("/auth");
        //         }
        //     })
        //     .catch((err: { message: React.SetStateAction<string> }) => {
        //         console.error(err);
        //     })
        //     .finally(() => {
        //         setSignUpData({
        //             username: "",
        //             phone: "",
        //             email: "",
        //             password: "",
        //         });
        //     });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-200 to-blue-200 flex items-center justify-center">
            <div
                className={`bg-white rounded-3xl shadow-lg relative overflow-hidden w-[768px] max-w-full min-h-[480px] ${
                    isActive ? "active" : ""
                }`}
            >
                {/* Sign Up Form */}
                <div
                    className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2
          ${isActive ? "translate-x-full opacity-100 z-50" : "opacity-0 z-10"}`}
                >
                    <form
                        onSubmit={handleSignUp}
                        className="bg-white h-full flex flex-col justify-center px-10 text-[#303030]"
                    >
                        <h1 className="text-2xl font-bold mb-4">
                            Create Account
                        </h1>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            className="bg-gray-100 border-none my-2 px-4 py-2 text-sm rounded-lg w-full outline-none"
                            value={signUpData.username}
                            onChange={(e) =>
                                setSignUpData({
                                    ...signUpData,
                                    username: e.target.value,
                                })
                            }
                        />
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Phone Number"
                            className="bg-gray-100 border-none my-2 px-4 py-2 text-sm rounded-lg w-full outline-none"
                            value={signUpData.phone}
                            onChange={(e) =>
                                setSignUpData({
                                    ...signUpData,
                                    phone: e.target.value,
                                })
                            }
                        />
                        <input
                            id="signup_email"
                            type="email"
                            placeholder="Email"
                            className="bg-gray-100 border-none my-2 px-4 py-2 text-sm rounded-lg w-full outline-none"
                            value={signUpData.email}
                            onChange={(e) =>
                                setSignUpData({
                                    ...signUpData,
                                    email: e.target.value,
                                })
                            }
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-gray-100 border-none my-2 px-4 py-2 text-sm rounded-lg w-full outline-none"
                            value={signUpData.password}
                            onChange={(e) =>
                                setSignUpData({
                                    ...signUpData,
                                    password: e.target.value,
                                })
                            }
                        />
                        <button
                            type="submit"
                            className="bg-purple-700 text-white text-xs py-2 px-11 border border-transparent rounded-lg font-semibold uppercase tracking-wider mt-3 cursor-pointer hover:bg-purple-800 transition-colors"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div
                    className={`absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-20
          ${isActive ? "translate-x-full" : ""}`}
                >
                    <form
                        onSubmit={handleSignIn}
                        className="bg-white h-full flex flex-col justify-center px-10 text-[#303030]"
                    >
                        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="bg-gray-100 border-none my-2 px-4 py-2 text-sm rounded-lg w-full outline-none"
                            value={signInData.email}
                            onChange={(e) =>
                                setSignInData({
                                    ...signInData,
                                    email: e.target.value,
                                })
                            }
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-gray-100 border-none my-2 px-4 py-2 text-sm rounded-lg w-full outline-none"
                            value={signInData.password}
                            onChange={(e) =>
                                setSignInData({
                                    ...signInData,
                                    password: e.target.value,
                                })
                            }
                        />
                        <button
                            type="submit"
                            className="bg-purple-700 text-white text-xs py-2 px-11 border border-transparent rounded-lg font-semibold uppercase tracking-wider mt-3 cursor-pointer hover:bg-purple-800 transition-colors"
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                {/* Toggle Container */}
                <div
                    className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out 
          ${
              isActive
                  ? "-translate-x-full rounded-r-[150px]"
                  : "rounded-l-[150px]"
          } z-[1000]`}
                >
                    <div
                        className={`bg-gradient-to-r from-blue-600 to-purple-700 h-full relative -left-full w-[200%] 
            transform ${
                isActive ? "translate-x-1/2" : ""
            } transition-all duration-600 ease-in-out text-white`}
                    >
                        {/* Left Panel */}
                        <div
                            className={`absolute w-1/2 h-full flex items-center justify-center flex-col px-8 text-center 
              transition-all duration-600 ease-in-out ${
                  isActive ? "translate-x-0" : "-translate-x-[20%]"
              }`}
                        >
                            <h1 className="text-2xl font-bold mb-4">
                                Welcome Back!
                            </h1>
                            <p className="text-sm leading-5 tracking-wide my-5">
                                Enter your personal details to access MediTrack.
                            </p>
                            <button
                                onClick={() => setIsActive(false)}
                                className="bg-transparent border border-white text-white text-xs py-2 px-11 rounded-lg 
                  font-semibold uppercase tracking-wider mt-3 cursor-pointer hover:bg-white/10 transition-colors"
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Right Panel */}
                        <div
                            className={`absolute right-0 w-1/2 h-full flex items-center justify-center flex-col px-8 text-center 
              transition-all duration-600 ease-in-out ${
                  isActive ? "translate-x-[20%]" : ""
              }`}
                        >
                            <h1 className="text-2xl font-bold mb-4">
                                Hello, Friend!
                            </h1>
                            <p className="text-sm leading-5 tracking-wide my-5">
                                Register with your personal details to access
                                MediTrack.
                            </p>
                            <button
                                onClick={() => setIsActive(true)}
                                className="bg-transparent border border-white text-white text-xs py-2 px-11 rounded-lg 
                  font-semibold uppercase tracking-wider mt-3 cursor-pointer hover:bg-white/10 transition-colors"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
