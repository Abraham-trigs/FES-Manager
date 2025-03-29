import { create } from "zustand";

const useColorStore = create((set) => {
  const updateCSSVariables = (colors) => {
    Object.keys(colors).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, colors[key]);
    });
  };

  const initialColors = {
    darkGreen: "#003832",
    semiGreen: "#00504A",
    cardBorder: "#67CFCA",
    green: "#226764",
    darkShade: "#B2D1CE",
    shade: "#8DBDBA",
    light: "#6BD0CC",
    cyanNeon: "#07F9ED",
    greenNeon: "#07F978",
    white: "#FFFFFF",  };

  // CSS variables initial setted
  updateCSSVariables(initialColors);

  return {
    colors: initialColors,
    setColor: (key, value) =>
      set((state) => {
        const newColors = { ...state.colors, [key]: value };
        updateCSSVariables(newColors);
        return { colors: newColors };
      }),
  };
});

export default useColorStore;


