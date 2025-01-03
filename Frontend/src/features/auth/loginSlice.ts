import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { encryptData } from "../../utilities/encryption";
import { BASE_URL } from "../../assets/constants";
import api from "./api";

interface ApiResponse {
    status: number;
    patient: Patient;
}

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

export const userLogin = createAsyncThunk(
    "login/userLogin",
    async (credentials: { email: string; password: string }) => {
        try {
            console.log("Attempting login with:", credentials.email);
            const response = await axios.post(BASE_URL + "auth/login/", {
                email: credentials.email,
                password: credentials.password,
            });
            console.log("Login API response:", response.data);
            return response.data;
        } catch (err) {
            console.error("Login error:", err);
            throw err; // Important: Throw the error so it's properly caught
        }
    }
);

export const updatePatient = createAsyncThunk(
    "login/updatePatient",
    async (data: Partial<Patient>) => {
        try {
            const response = await api.put<ApiResponse>(
                `/patients/profile/${data.id}/`,
                data
            );
            return response.data;
        } catch (error) {
            console.log(error);
            // state.error = error;
        }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = "succeeded";

                state.patient = action.payload.patient;

                // Encrypt user data before saving to local storage
                const encryptedUser = encryptData(action.payload?.token);
                if (encryptedUser) {
                    localStorage.setItem("cookie", encryptedUser);
                }
            })
            .addCase(userLogin.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(updatePatient.fulfilled, (state, action) => {
                if (action.payload) {
                    state.patient = action.payload.patient;
                }
            });
    },
});

export default loginSlice.reducer;

export const currentPatient = (state: { login: { patient: Patient } }) =>
    state.login.patient;
export const userLoginStatus = (state: { status: "" }) => state.status;
export const userLoginError = (state: { error: "" }) => state.error;
