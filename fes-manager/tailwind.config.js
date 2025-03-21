/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGreen: "var(--darkGreen)",
        semiGreen: "var(--semiGreen)",
        green: "var(--green)",
        shade: "var(--shade)",
        light: "var(--light)",
        cyanNeon: "var(--cyanNeon)",
        greenNeon: "var(--greenNeon)",
        white: "var(--white)",
      },
    },
  },
  plugins: [],
};
