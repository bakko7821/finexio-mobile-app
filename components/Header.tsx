import React, { useState } from 'react';
import { Text, StyleSheet, Platform, View, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { StackHeaderProps } from '@react-navigation/stack';
import BurgerMenuIcon from '../assets/burger-menu-svgrepo-com.svg';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
    title: string
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Header = ({title}: HeaderProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const theme = useTheme();

  return (
    <View 
      style={[
          styles.header,
          { backgroundColor: theme.card },
      ]}>
      <View style={styles.container}>
        <Text 
          style={[
            styles.title,
            {color: theme.text}
          ]}
        >
          {title}
        </Text>

        <TouchableOpacity onPress={() => setIsOpenMenu(true)}>
          <BurgerMenuIcon
            width={32}
            height={32}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>

      {isOpenMenu && (
        <BlurView 
          intensity={100}
          tint="light"
          style={styles.menu}>

        </BlurView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 8,
    paddingTop: 44,
    borderRadius: 12,
    position: 'relative',
  },
  
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    width: '100%',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  menu: {
    zIndex: 999,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    position: 'absolute',
    width: 200,
    height: SCREEN_HEIGHT + 40,
    padding: 8,
    paddingTop: 40,
  }
});