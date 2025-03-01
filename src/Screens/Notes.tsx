import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Rect, Defs, Mask, Circle } from 'react-native-svg';
import AccountModal from '../Components/AccountModal';

interface Note {
  uuid: string;
  title: string;
  desc: string;
  edited: Date;
}

const notes: Note[] = [
  { uuid: '1a2b3c', title: 'Meeting Notes', desc: "We have a meeting today", edited: new Date('2025-02-28') },
  { uuid: '4d5e6f', title: 'Project Plan', desc: "We have a meeting today", edited: new Date('2025-03-01') },
  { uuid: '7g8h9i', title: 'Shopping List', desc: "We have a meeting today", edited: new Date('2025-02-27') }
];

console.log(notes);
const { width, height } = Dimensions.get('window');

// SearchBar Component
const SearchBar = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image style={[styles.searchIcon, styles.profileIcon]} source={require('../Assets/person.crop.circle.png')} />
        </TouchableOpacity>
        <AccountModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
    </View>
  );
};

// BottomBar Component
const BottomBar = () => {
  const navigation = useNavigation();
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
      <TouchableOpacity style={styles.plusicon} onPress={() => navigation.navigate('NoteEdit')}>
        <Image source={require('../Assets/gplus.png')} />
      </TouchableOpacity>
    </View>
  );
};

// Main Notes Component
const Notes = () => {

  const navigation = useNavigation();

  const handleNotePress = (note) => {
    navigation.navigate('NoteEdit', { note });
  };

  return (
    <SafeAreaView style={styles.safeAreacontainer}>
      <View style={styles.container}>
        <SearchBar />

        {notes.length > 0 ? (
          <View style={styles.notesContainer}>
            {notes.map((note) => (
              <TouchableOpacity
              style={styles.contentBox}
              key={note.uuid}
              onPress={() => handleNotePress(note)}
            >
                <Text style={styles.text}>{note.title}</Text>
                <Text style={styles.text}>{note.desc}</Text>
                </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.centreContainer}>
            <Image style={styles.icon} source={require('../Assets/lightbulb.png')} />
            <Text style={styles.helperText}>Notes you add appear here</Text>
          </View>
        )}
      </View>
      <BottomBar />
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
  searchContainer: {
    backgroundColor: '#2B2B2F',
    borderRadius: width * 0.025,
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
  bottomContainer: {
    alignSelf: 'center',
    height: height * 0.1,
    width: '105%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: width * -0.005,
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
    marginRight: width * 0.075,
    marginTop: height * 0.012,
  },
  plusicon: {
    width: height * 0.05,
    height: height * 0.05,
    resizeMode: 'contain',
    position: 'absolute',
    top: -height * 0.025,
    right: width * 0.07,
    backgroundColor: '#3A393F',
    borderRadius: height * 0.025,
  },
  svg: {
    width: '100%',
    top: 0,
    right: 0,
  },
  firstIcon: {
    marginLeft: width * 0.06,
  },
  contentBox: {
    borderWidth: 1,
    borderColor: 'white',
    padding: width * 0.025,
    marginVertical: height * 0.012,
    borderRadius: width * 0.025,
    width: '45%',
  },
  text: {
    color: 'white',
    fontSize: width * 0.03,
  },
  notesContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
