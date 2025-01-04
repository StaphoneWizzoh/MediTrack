import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { encryptData } from "../../utilities/encryption";
import { BASE_URL } from "../../assets/constants";

// interface ApiResponse {
//     status: number;
//     patient: Patient;
// }

interface Patient {
    id: number;
    name: string;
    phone: string;
    email: string;
}

const initialState = {
    patient: {},
    status: "idle",
    error: null,
};

export const userSignup = createAsyncThunk(
    "signup/usersignup",
    async (credentials: {
        name: string;
        phone: string;
        email: string;
        password: string;
    }) => {
        if (credentials) {
            console.log("Received credentials", credentials);
            try {
                const response = await axios.post(BASE_URL + "auth/register/", {
                    name: credentials.name,
                    phone: credentials.phone,
                    email: credentials.email,
                    password: credentials.password,
                });

                return response.data;
            } catch (err) {
                console.error("Signup error:", err);
                throw err; // Important: Throw the error so it's properly caught
            }
        } else {
            console.error("No Data received: ", credentials);
        }
    }
);

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(userSignup.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.status = "succeeded";
                // console.log("Login slice payload: " + action.payload);
                state.patient = action.payload.patient;

                // Encrypt user data before saving to local storage
                const encryptedUser = encryptData(action.payload?.token);
                if (encryptedUser) {
                    localStorage.setItem("cookie", encryptedUser);
                }
                // console.log(state.user);
            })
            .addCase(userSignup.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default signupSlice.reducer;

export const currentPatient = (state: { login: { patient: Patient } }) =>
    state.login.patient;
export const userSignupStatus = (state: { status: unknown }) => state.status;
export const userSignupError = (state: { error: unknown }) => state.error;
