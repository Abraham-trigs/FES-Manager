/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGreen: "var(--darkGreen)",
        semiGreen: "var(--semiGreen)",
        highLight: "var(--highLight)",
        green: "var(--green)",
        darkShade: "var(--darkShade)",
        shade: "var(--shade)",
        light: "var(--light)",
        cyanNeon: "var(--cyanNeon)",
        greenNeon: "var(--greenNeon)",
        white: "var(--white)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
