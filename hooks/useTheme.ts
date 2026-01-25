export const lightTheme = {
    second: '#9c9c9c',
    background: '#FFFFFF',
    card: '#f0f0f0',
    text: '#111111',
};

export const darkTheme = {
    second: '#9c9c9c',        
    background: '#020617',
    text: '#E5E7EB',
    card: 'rgba(15,23,42,0.7)',
};

import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
};