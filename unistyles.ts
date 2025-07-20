import { StyleSheet } from 'react-native-unistyles';

// Define breakpoints
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

// extract spacing from lightTheme
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// defined border radius
const borderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

const borderWidth = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
} as const;

// Define color constants
const colors = {
  light: {
    // Primary colors
    primary: '#18181b',
    primaryForeground: '#fafafa',

    // Secondary colors
    secondary: '#f4f4f5',
    secondaryForeground: '#18181b',

    // Muted colors
    muted: '#f4f4f5',
    mutedForeground: '#71717a',

    // Accent colors
    accent: '#f4f4f5',
    accentForeground: '#18181b',

    // Destructive colors
    destructive: '#ef4444',
    destructiveForeground: '#fafafa',

    // Background colors
    background: '#ffffff',
    foreground: '#18181b',

    // Card colors
    card: '#ffffff',
    cardForeground: '#18181b',

    // Popover colors
    popover: '#ffffff',
    popoverForeground: '#18181b',

    // Border colors
    border: '#e4e4e7',
    input: '#e4e4e7',

    // Ring color
    ring: '#18181b',

    // Chart colors
    chart1: '#e11d48',
    chart2: '#f97316',
    chart3: '#eab308',
    chart4: '#22c55e',
    chart5: '#3b82f6',
  },
  dark: {
    // Primary colors
    primary: '#fafafa',
    primaryForeground: '#18181b',

    // Secondary colors
    secondary: '#27272a',
    secondaryForeground: '#fafafa',

    // Muted colors
    muted: '#27272a',
    mutedForeground: '#a1a1aa',

    // Accent colors
    accent: '#27272a',
    accentForeground: '#fafafa',

    // Destructive colors
    destructive: '#ef4444',
    destructiveForeground: '#fafafa',

    // Background colors
    background: '#09090b',
    foreground: '#fafafa',

    // Card colors
    card: '#09090b',
    cardForeground: '#fafafa',

    // Popover colors
    popover: '#09090b',
    popoverForeground: '#fafafa',

    // Border colors
    border: '#27272a',
    input: '#27272a',

    // Ring color
    ring: '#d4d4d8',

    // Chart colors
    chart1: '#e11d48',
    chart2: '#f97316',
    chart3: '#eab308',
    chart4: '#22c55e',
    chart5: '#3b82f6',
  },
} as const;

// Define themes
const lightTheme = {
  colors: colors.light,
  spacing,
  borderWidth,
  borderRadius,
  fontSize,
  fontWeight,
} as const;

const darkTheme = {
  ...lightTheme,
  colors: colors.dark,
} as const;

export type AppBreakpoints = typeof breakpoints;
export type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type BorderWidth = typeof borderWidth;
export type Colors = typeof colors;

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  breakpoints,
  settings: {
    adaptiveThemes: true,
  },
});
