import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                hemihead: ["Hemi Head"],
                signika: ["Signika Negative"],
                explora: ["Explora"],
            },
            backgroundImage: {
                card: "url('/resources/assets/card.png')",
            },

            screens: {
                xs: "400px",
                // "2xl": "1320px",
                // "3xl": "1536px",
                "8xl": "2400px",
            },
        },
    },

    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#f97316",

                    secondary: "#FBEDD7",

                    accent: "#ffffff",

                    neutral: "#ffffff",

                    base: "#FBEDD7",

                    "base-100": "#F1C594",

                    info: "#ffffff",

                    success: "#00ffff",

                    warning: "#ffffff",

                    error: "#ffffff",
                },
            },
        ],
    },

    plugins: [forms, require("daisyui")],
};
