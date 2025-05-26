
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type AccentColor = 'purple' | 'blue' | 'green' | 'orange' | 'pink' | 'cyan';

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'system';
  });

  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('accent-color') as AccentColor;
    return saved || 'purple';
  });

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(resolvedTheme);
    
    // Update data attribute for CSS targeting
    root.setAttribute('data-theme', resolvedTheme);
  }, [theme, resolvedTheme]);

  useEffect(() => {
    localStorage.setItem('accent-color', accentColor);
    const root = document.documentElement;
    
    // Remove existing accent color classes
    root.classList.remove('accent-purple', 'accent-blue', 'accent-green', 'accent-orange', 'accent-pink', 'accent-cyan');
    
    // Add current accent color class
    root.classList.add(`accent-${accentColor}`);
    
    // Update data attribute for CSS targeting
    root.setAttribute('data-accent', accentColor);
  }, [accentColor]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const handleSetAccentColor = (newColor: AccentColor) => {
    setAccentColor(newColor);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accentColor,
        setTheme: handleSetTheme,
        setAccentColor: handleSetAccentColor,
        resolvedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
