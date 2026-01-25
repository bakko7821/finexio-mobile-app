import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Header } from './components/Header';
import { NavMenu } from './components/NavMenu';
import { useTheme } from './hooks/useTheme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App() {
  const theme = useTheme();

  return (
    <View 
      style={[
          styles.screen,
          { backgroundColor: theme.background },
      ]}>
      <Header title='Категории'/>
      <NavMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 8,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    flex: 1,
    padding: 0,
    paddingBottom: 12,
    backgroundColor: '#ffffff'
  },
  content: {

  }
})