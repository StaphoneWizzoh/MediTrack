import CryptoJS from "crypto-js";

import { ENCRYPTION_KEY } from "../assets/env";

// Function to encrypt user data
export const encryptData = (data: string) => {
    if (data == "") {
        return "";
    }
    try {
        const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(data),
            ENCRYPTION_KEY
        ).toString();
        return encryptedData || "";
    } catch (error) {
        console.error("Encryption error:", error);
        return null;
    }
};

// Function to decrypt user data
export const decryptData = (encryptedData: unknown) => {
    if (encryptedData) {
        try {
            const bytes = CryptoJS.AES.decrypt(
                encryptedData as string,
                ENCRYPTION_KEY
            );
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

            // Check if decryptedData is not empty
            if (decryptedData) {
                return JSON.parse(decryptedData);
            } else {
                console.log("Error decrypting data: Data NULL ");
                return null;
            }
        } catch (error) {
            console.error("Decryption error:", error);
            return null;
        }
    } else {
        console.error(
            `${encryptedData} passed to the decryptData function is null`
        );
        return null;
    }
};
