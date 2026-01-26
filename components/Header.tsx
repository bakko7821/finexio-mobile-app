import React, { useState } from 'react';
import { Text, StyleSheet, Platform, View, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { StackHeaderProps } from '@react-navigation/stack';
import BurgerMenuIcon from '../assets/burger-menu-svgrepo-com.svg';
import { useTheme } from '../hooks/useTheme';
import { SCREEN_WIDTH } from '../utils/types';

interface HeaderProps {
    title: string
}

export const Header = ({title}: HeaderProps) => {
  const theme = useTheme();

  return (
    <View 
      style={[
          styles.header,
          { backgroundColor: theme.card },
      ]}>
        <Text 
          style={[
            styles.title,
            {color: theme.text}
          ]}
        >
          {title}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: SCREEN_WIDTH,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 16,
    paddingTop: 44,
    position: 'relative',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

});