// // store/themeStore.ts
// import { create } from "zustand";
// import { themes } from "../themes";
// import { ThemeColors, ThemeName } from "../types/theme";

// interface ThemeStore {
//   currentTheme: ThemeName;
//   colors: ThemeColors;
//   setTheme: (theme: ThemeName) => void;
//   setColor: (key: keyof ThemeColors, value: string) => void;
// }

// const getSystemTheme = (): ThemeName => {
//   if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     return "DarkTheme";
//   }
//   return "LightTheme";
// };

// export const useThemeStore = create<ThemeStore>((set) => {
//   const initialTheme: ThemeName = "FesTheme"; // default theme, or load from localStorage

//   const themeToApply = initialTheme === "SystemDefault" ? getSystemTheme() : initialTheme;

//   const updateCSSVars = (colors: ThemeColors) => {
//     Object.entries(colors).forEach(([key, val]) => {
//       document.documentElement.style.setProperty(`--${key}`, val);
//     });
//   };

//   const selectedColors = themes[themeToApply as keyof typeof themes];
//   updateCSSVars(selectedColors);

//   return {
//     currentTheme: initialTheme,
//     colors: selectedColors,
//     setTheme: (theme) =>
//       set(() => {
//         const resolvedTheme =
//           theme === "SystemDefault" ? getSystemTheme() : theme;
//         const newColors = themes[resolvedTheme];
//         updateCSSVars(newColors);
//         return { currentTheme: theme, colors: newColors };
//       }),
//     setColor: (key, value) =>
//       set((state) => {
//         const updatedColors = { ...state.colors, [key]: value };
//         updateCSSVars(updatedColors);
//         return { colors: updatedColors };
//       }),
//   };
// });
// export default useThemeStore;
