import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Rect, Defs, Mask, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// SearchBar Component
const SearchBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.searchContainer}>
      <View style={styles.leftmost}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image style={styles.searchIcon} source={require('../Assets/line.3.horizontal.png')} />
        </TouchableOpacity>
        <Text style={styles.searchText}>Search Your Notes</Text>
      </View>
      <View style={styles.rightmost}>
        <Image style={[styles.searchIcon, styles.gridIcon]} source={require('../Assets/rectangle.grid.1x2.png')} />
        <Image style={[styles.searchIcon, styles.profileIcon]} source={require('../Assets/person.crop.circle.png')} />
      </View>
    </View>
  );
};

// BottomBar Component
const BottomBar = () => {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.leftMost}>
        <Image style={[styles.bottomIcon, styles.firstIcon]} source={require('../Assets/checkmark.square.png')} />
        <Image style={styles.bottomIcon} source={require('../Assets/paintbrush.pointed.png')} />
        <Image style={styles.bottomIcon} source={require('../Assets/microphone.png')} />
        <Image style={styles.bottomIcon} source={require('../Assets/photo.artframe.png')} />
      </View>
      <View style={styles.rightMost}>
        <Svg style={styles.svg} height={height * 0.1} width={width * 0.5}>
          <Defs>
            <Mask id="mask" x="0" y="0" width={width * 0.5} height={height * 0.1}>
              <Rect x="0" y="0" width={width * 0.5} height={height * 0.1} fill="white" />
              <Circle cx={width * 0.38} cy={height * 0.0} r={height * 0.04} fill="black" />
            </Mask>
          </Defs>
          <Rect
            x="0"
            y="0"
            width={width * 0.5}
            height={height * 0.1}
            fill="#313134"
            mask="url(#mask)"
          />
        </Svg>
      </View>
      <Image style={styles.plusicon} source={require('../Assets/gplus.png')} />
    </View>
  );
};

// Main Notes Component
const Notes = () => {
  return (
    <SafeAreaView style={styles.safeAreacontainer}>
      <View style={styles.container}>
        <SearchBar />
        <View style={styles.centreContainer}>
          <Image style={styles.icon} source={require('../Assets/lightbulb.png')} />
          <Text style={styles.helperText}>Notes you add appear here</Text>
        </View>
        <BottomBar />
      </View>
    </SafeAreaView>
  );
};

export default Notes;

const styles = StyleSheet.create({
  safeAreacontainer: {
    flex: 1,
    backgroundColor: '#212025',
  },
  container: {
    flex: 1,
    padding: width * 0.025,
  },
  centreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    tintColor: 'white',
    resizeMode: 'contain',
    height: height * 0.2,
    width: height * 0.2,
  },
  helperText: {
    color: 'white',
    marginTop: height * 0.02,
    fontSize: width * 0.05,
  },
  // SearchBar styles
  searchContainer: {
    backgroundColor: '#2B2B2F',
    borderRadius: 10,
    padding: width * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftmost: {
    flexDirection: 'row',
  },
  rightmost: {
    flexDirection: 'row',
  },
  searchIcon: {
    tintColor: 'white',
    resizeMode: 'contain',
    height: height * 0.03,
    width: height * 0.03,
  },
  searchText: {
    fontSize: width * 0.045,
    color: '#83848A',
    alignSelf: 'center',
    marginLeft: width * 0.05,
  },
  gridIcon: {
    tintColor: '#9C9FA5',
  },
  profileIcon: {
    marginLeft: width * 0.05,
  },
  // BottomBar styles
  bottomContainer: {
    alignSelf: 'center',
    height: height * 0.1,
    width: '105%',
    bottom: -46,
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'space-between',
    left: -1
  },
  leftMost: {
    flexDirection: 'row',
    backgroundColor: '#313134',
    width: '50%',
  },
  rightMost: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
  },
  bottomIcon: {
    tintColor: 'white',
    resizeMode: 'contain',
    height: height * 0.025,
    width: height * 0.025,
    marginRight: 30,
    marginTop: 10,
  },
  plusicon: {
    width: height * 0.05,
    height: height * 0.05,
    resizeMode: 'contain',
    position: 'absolute',
    top: -height * 0.025,
    right: 28,
    backgroundColor: '#3A393F',
    borderRadius: height * 0.025,
  },
  svg: {
    width: '100%',
    top: 0,
    right: 0,
  },
  firstIcon: {
    marginLeft: 25,
  },
});