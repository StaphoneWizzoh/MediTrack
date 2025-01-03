import { configureStore } from "@reduxjs/toolkit";
// import { decryptData } from "../utilities/encryption";

import loginReducer from "./auth/loginSlice";
import signupReducer from "./auth/signupSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

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
