import React from 'react';
import { Text, StyleSheet, Platform, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { StackHeaderProps } from '@react-navigation/stack';

interface HeaderProps {
    title: string
}

export const Header = ({title}: HeaderProps) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    overflow: 'hidden'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});