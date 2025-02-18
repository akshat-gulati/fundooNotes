import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import Home from './Screens/Home';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#212025',
  },
});
