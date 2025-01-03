import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { encryptData } from "../../utilities/encryption";
import { BASE_URL } from "../../assets/constants";

const initialState = {
    user: {},
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
                console.error(err);
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
                state.user = action.payload;

                // Encrypt user data before saving to local storage
                const encryptedUser = encryptData(action.payload);
                localStorage.setItem("User", encryptedUser);
                // console.log(state.user);
            })
            .addCase(userSignup.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default signupSlice.reducer;

export const userSignupStatus = (state: { status: unknown }) => state.status;
export const userSignupError = (state: { error: unknown }) => state.error;
