import React from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';

import Routes from './src/routes'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Routes/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
});