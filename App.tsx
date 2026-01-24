import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigation/StackNavigator';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { Header } from './components/Header';
import img from './assets/eb7a6bb8c4d598fcb0521894bd9275d8.jpg'
import { NavMenu } from './components/NavMenu';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.screen}>
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
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#ffffff'
  },
  content: {

  }
})