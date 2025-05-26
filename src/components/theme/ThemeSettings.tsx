
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme, type Theme, type AccentColor } from '@/contexts/ThemeContext';
import { Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemeSettings = () => {
  const { theme, accentColor, setTheme, setAccentColor, resolvedTheme } = useTheme();

  const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
    { value: 'system', label: 'System', icon: <Monitor className="h-4 w-4" /> },
  ];

  const accentColors: { value: AccentColor; label: string; color: string }[] = [
    { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { value: 'green', label: 'Green', color: 'bg-green-500' },
    { value: 'orange', label: 'Orange', color: 'bg-orange-500' },
    { value: 'pink', label: 'Pink', color: 'bg-pink-500' },
    { value: 'cyan', label: 'Cyan', color: 'bg-cyan-500' },
  ];

  const handleThemeChange = (newTheme: Theme) => {
    console.log('Theme button clicked:', newTheme, 'current theme:', theme);
    setTheme(newTheme);
  };

  const handleAccentColorChange = (newColor: AccentColor) => {
    console.log('Accent color button clicked:', newColor, 'current color:', accentColor);
    setAccentColor(newColor);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Choose how the interface looks and feels. Current: {theme} (resolved: {resolvedTheme})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {themes.map((themeOption) => (
              <Button
                key={themeOption.value}
                variant={theme === themeOption.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleThemeChange(themeOption.value)}
                className={cn(
                  'flex items-center gap-2 transition-all',
                  theme === themeOption.value 
                    ? 'bg-accent-primary text-accent-primary-foreground hover:bg-accent-primary/90' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {themeOption.icon}
                {themeOption.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accent Color</CardTitle>
          <CardDescription>
            Customize the accent color throughout the application. Current: {accentColor}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-3">
            {accentColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleAccentColorChange(color.value)}
                className={cn(
                  'relative h-10 w-10 rounded-full transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary focus:ring-offset-background',
                  color.color,
                  accentColor === color.value && 'ring-2 ring-offset-2 ring-accent-primary ring-offset-background scale-110'
                )}
                title={color.label}
              >
                {accentColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white shadow-lg" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSettings;
