import { Keyboard, Image, SafeAreaView, StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const Label = () => {
  const navigation = useNavigation();
  const textInputRef = useRef<TextInput>(null);
  const [inputText, setinputText] = useState<string>('')

  // Focus when component mounts
  useEffect(() => {
    // Short timeout to ensure component is fully rendered
    const timer = setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Add focus handler for navigation events (screen becomes active)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Short timeout to ensure component is fully rendered after navigation
      setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }, 100);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image style={styles.icon} source={require('../Assets/x.square.png')} />
          </TouchableOpacity>
          <Text style={styles.heading}>Edit Labels</Text>
          <View />
        </View>
        <View>
          <View style={styles.inputBox}>
            <View style={styles.rowContainer}>
              <TouchableOpacity onPress={() => {
                setinputText('');
                Keyboard.dismiss();
              }}>
                <Image style={[styles.icon, styles.inputIcon]} source={require('../Assets/x.square.png')} />
              </TouchableOpacity>
              <TextInput
                value={inputText}
                onChangeText={setinputText}
                ref={textInputRef}
                placeholderTextColor={'white'}
                placeholder="Create new label"
                style={styles.textInput}
                autoFocus={true}
              />
            </View>
            <Image style={[styles.icon, styles.blueIcon]} source={require('../Assets/checkmark.png')} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Label;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#212025',
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  heading: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: width * 0.05,
  },
  icon: {
    tintColor: 'white',
    resizeMode: 'contain',
    height: height * 0.025,
    width: height * 0.025,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    height: height * 0.06,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: width * 0.05,
  },
  textInput: {
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  inputIcon: {
    tintColor: 'white',
    marginHorizontal: width * 0.05,
  },
  blueIcon: {
    tintColor: 'lightblue',
  },
});
