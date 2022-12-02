import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';

export const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...MD3LightTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...MD3LightTheme.colors,
    background: '#ffffff',
    text: '#333333',
  },
};

export const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...MD3DarkTheme.colors,
  colors: {
    ...NavigationDarkTheme.colors,
    ...(MD3DarkTheme.colors = {
      surface: '#161938',
      onSurface: '#ffffff',
      primary: '#7568f6',
      surfaceVariant: '#ffffff',
      onSurfaceVariant: '#ffffff',
      background: '#121430',
      card: '#161938',
      text: '#ffffff',
      onPrimary: '#ffffff',
    }),
  },
};
