export const gridSize = 8;

export const spacing = {
  xs: gridSize / 2,     // 4
  sm: gridSize,         // 8
  md: gridSize * 2,     // 16
  lg: gridSize * 3,     // 24
  xl: gridSize * 4,     // 32
  xxl: gridSize * 6,    // 48
};

export const colors = {
  background: '#000000',
  surface: '#1a1a1a',
  text: {
    primary: '#ffffff',
    secondary: '#b3b3b3',
  },
  accent: '#1db954',
};

export const typography = {
  sizes: {
    small: 14,
    body: 16,
    title: 20,
    heading: 24,
    large: 32,
  },
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};