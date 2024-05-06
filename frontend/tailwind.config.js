/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "linkleap-gray": "#344054",
        "linkleap-border": "#D0D5DD",
        "linkleap-text": "#101828",
        "linkleap-login-btn": "#7F56D9",
      },
    },
  },
  plugins: [],
};
