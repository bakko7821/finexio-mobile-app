import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Header } from './components/Header';
import { NavMenu } from './components/NavMenu';
import { useTheme } from './hooks/useTheme';
import { ScreenKey } from './utils/types';
import { Layout } from './components/Layout';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function App() {
  const theme = useTheme();

  const [screen, setScreen] = React.useState<ScreenKey>('categories');


  const screenConfig: Record<ScreenKey, { title: string }> = {
    categories: { title: 'Категории' },
    profile: { title: 'Профиль' },
    settings: { title: 'Настройки' },
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <Header title={screenConfig[screen].title} />

      <Layout screen={screen} style={{ flex: 1 }}/>

      <NavMenu
        active={screen}
        onNavigate={setScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    flex: 1,
    padding: 0,
    backgroundColor: '#ffffff'
  },
  content: {

  }
})