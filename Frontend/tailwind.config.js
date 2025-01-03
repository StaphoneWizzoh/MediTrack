/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                mulish: ["Mulish", "sans-serif"],
            },
            colors: {
                turquoise: "#5acccc",
                steelBlue: "#335c6e",
                teal: "#4aa088",
                yellowDark: "#faad00",
                orangeRed: "#f76434",
            },
            scrollbar: (theme) => ({
                thin: {
                    width: "0.375rem",
                    backgroundColor: "#f1f1f1",
                    thumbColor: "#888",
                    thumbHoverColor: "#555",
                },
                default: {
                    width: "0.5rem",
                    backgroundColor: "#f1f1f1",
                    thumbColor: "#585858",
                    thumbHoverColor: "#555",
                },
            }),
        },
    },
    variants: {
        extend: {
            scrollbar: ["rounded"],
        },
    },
    plugins: [],
};
