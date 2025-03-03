import { Image, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NoteContext, Note } from '../logic/NoteContext';

import { styles } from '../Stylesheets/RemindersArchiveBinStyling';


const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toTimeString().split(' ')[0];
    return `${formattedDate}, ${formattedTime}`;
  };
const { width, height } = Dimensions.get('window');

const Reminders = () => {
    
    const noteContext = useContext(NoteContext);
    const { notes, addNote, updateNote } = noteContext;
    const navigation = useNavigation();
    const handleNotePress = (note) => {
        navigation.navigate('NoteEdit', { note });
      };
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Image style={styles.icon}  source={require('../Assets/line.3.horizontal.png')} />
                    </TouchableOpacity>
                    <Text style={styles.helperText}>Reminders</Text>
                    <View style={styles.iconContainer}>
                        <Image style={[styles.icon, styles.iconSpacing]} source={require('../Assets/magnifyingglass.png')} />
                        <Image style={styles.icon} source={require('../Assets/rectangle.grid.1x2.png')} />
                    </View>
                </View>

                {/* --------------------------------------------------- */}

                {notes.length > 0 ? (
  <ScrollView>
    <View style={styles.notesContainer}>
      {notes
        .filter((note) => !note.isArchived && note.hasReminder) // Added filter for hasReminder
        .map((note) => (
          <TouchableOpacity
            style={styles.contentBox}
            key={note.id}
            onPress={() => handleNotePress(note)}
          >
            <Text style={styles.text}>{note.title}</Text>
            <Text style={styles.text}>{note.content}</Text>
            {note.reminderDateTime && (
              <View style={styles.dateTime}>
                <Text style={styles.text}>{formatDateTime(note.reminderDateTime)}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
    </View>
  </ScrollView>
) : (
            <View style={styles.contents}>
                <Image style={styles.bigImage} source={require('../Assets/bell.fill.png')} />
                <Text style={styles.mainText}>Notes with upcoming Reminders appear here</Text>

            </View>

)}
            </View>
        </SafeAreaView>
    );
};

export default Reminders;