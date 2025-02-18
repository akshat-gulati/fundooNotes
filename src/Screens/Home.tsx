import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SearchBar from '../Components/SearchBar';

const Home = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.centreContainer}>
        <Image style={styles.icon} source={require('../Assets/lightbulb.png')} />
        <Text style={styles.helperText}>Notes you add appear here</Text>
        <Text style={styles.plusIcon}>+</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#212025',
    padding:10,
  },
  centreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    tintColor: 'white',
    resizeMode: 'contain',
    height: 150,
    width: 150,
  },
  plusIcon: {
    fontSize: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor:'#C0C0FF',
    color:'white',
    borderRadius:15,
    paddingHorizontal:20,
    paddingVertical:5,
  },
  helperText: {
    color: 'white',
    marginTop: 20,
    fontSize:19,
  },
});
