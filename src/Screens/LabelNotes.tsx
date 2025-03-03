// LabelNotes.tsx
import React, { useState, useContext } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Svg, { Rect, Defs, Mask, Circle } from 'react-native-svg';
import AccountModal from '../Components/AccountModal';
import { NoteContext } from '../logic/NoteContext';
import { styles } from '../Stylesheets/NotesAndLabelsStyling';
const { width, height } = Dimensions.get('window');

const formatDateTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const formattedDate = date.toISOString().split('T')[0];
  const formattedTime = date.toTimeString().split(' ')[0];
  return `${formattedDate}, ${formattedTime}`;
};

// SearchBar Component
const SearchBar = ({ labelName }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.searchContainer}>
      <View style={styles.leftmost}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image style={styles.searchIcon} source={require('../Assets/line.3.horizontal.png')} />
        </TouchableOpacity>
        <Text style={styles.searchText}>{labelName}</Text>
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
const BottomBar = ({ onCreateNewNote }) => {
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
              <Circle cx={width * 0.35} cy={-height * 0.020} r={height * 0.045} fill="black" />
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
      <TouchableOpacity style={styles.plusicon} onPress={onCreateNewNote}>
        <Image style={{
          resizeMode: 'contain',
          height: height * 0.09,
          width: height * 0.09
        }} source={require('../Assets/gplus.png')} />
      </TouchableOpacity>
    </View>
  );
};

// Main LabelNotes Component
const LabelNotes = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const noteContext = useContext(NoteContext);
  const labelName = route.name; // Get the label name from the route

  // Check if context exists
  if (!noteContext) {
    throw new Error("LabelNotes must be used within a NoteProvider");
  }

  const { labels, addNote, updateNote, addNoteToLabel } = noteContext;

  // Get notes for this label
  const labelNotes = labels[labelName] || [];

  const handleNotePress = (note) => {
    navigation.navigate('NoteEdit', { note, fromLabel: labelName });
  };

  // Function to create a new note and add it to this label
  const handleCreateNewNote = () => {
    // Create a new empty note
    const newNote = {
      id: Date.now().toString(), // Generate a unique ID
      title: '',
      content: '',
      isPinned: false,
      hasReminder: false,
      isArchived: false,
      updatedAt: new Date().toISOString()
    };

    // Navigate to NoteEdit with the new empty note
    navigation.navigate('NoteEdit', { note: newNote, fromLabel: labelName });
  };

  return (
    <SafeAreaView style={styles.safeAreacontainer}>
      <View style={styles.container}>
        <SearchBar labelName={labelName} />

        {labelNotes.length > 0 ? (
          <ScrollView>
            <View style={styles.notesContainer}>
              {labelNotes
                .filter((note) => !note.isArchived)
                .map((note) => (
                  <TouchableOpacity
                    style={styles.contentBox}
                    key={note.id}
                    onPress={() => handleNotePress(note)}
                  >
                    <Text style={styles.text}>{note.title}</Text>
                    <Text style={styles.text}>{note.content}</Text>
                    {note.hasReminder && note.reminderDateTime && (
                      <View style={styles.dateTime}>
                        <Text style={styles.text}>{formatDateTime(note.reminderDateTime)}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.centreContainer}>
            <Image style={styles.icon} source={require('../Assets/tag.png')} />
            <Text style={styles.helperText}>No notes with this label</Text>
          </View>
        )}
      </View>
      <BottomBar onCreateNewNote={handleCreateNewNote} />
    </SafeAreaView>
  );
};

export default LabelNotes;