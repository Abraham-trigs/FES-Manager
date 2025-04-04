/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',  // Enables dark mode based on class
  theme: {
    extend: {
      colors: {
        darkGreen: 'var(--darkGreen)',
        semiGreen: 'var(--semiGreen)',
        highLight: 'var(--highLight)',
        green: 'var(--green)',
        darkShade: 'var(--darkShade)',
        shade: 'var(--shade)',
        light: 'var(--light)',
        cyanNeon: 'var(--cyanNeon)',
        greenNeon: 'var(--greenNeon)',
        white: 'var(--white)',

        // Dark mode colors (available when .dark class is active)
        sidebar: 'var(--sidebar)',
        prime: 'var(--prime)',
        verydark: 'var(--verydark)',
        dark: 'var(--dark)',
        surface: 'var(--surface)',
        cyaNeon: 'var(--cyaNeon)',
        greeNeon: 'var(--greeNeon)',
        clear: 'var(--white)',
        text: 'var(--text)',
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
