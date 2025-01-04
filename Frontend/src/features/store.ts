import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { decryptData } from "../utilities/encryption";

import loginReducer from "./auth/loginSlice";
import signupReducer from "./auth/signupSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Check if encrypted user data exists in local storage
// const encryptedUserData = localStorage.getItem("User");
// let decryptedUser = null;

// If encrypted user data is found, decrypt it
// if (encryptedUserData) {
//     decryptedUser = decryptData(encryptedUserData);
// }

const preloadedState = {
    login: {
        patient: {},
        status: "idle",
        error: null,
    },
    // song: null,
};

const store = configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
    },
    preloadedState,
});

export default store;
