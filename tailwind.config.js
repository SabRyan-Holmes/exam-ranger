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
            },
            backgroundImage: {
                card: "url('/resources/assets/card.png')",
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

                    base: "#F1C594",

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
