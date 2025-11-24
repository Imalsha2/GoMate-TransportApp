import React, { createContext, useContext } from 'react';
import { colors } from '../styles/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children, theme = 'dark' }) => {
  const themeColors = colors[theme] || colors.dark; // Fallback to dark theme
  return (
    <ThemeContext.Provider value={{ theme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
