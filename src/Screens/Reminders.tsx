import { Image, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NoteContext, Note } from '../logic/NoteContext';
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

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#212025',
    },
    container: {
        flex: 1,
        padding: width * 0.025,
        alignItems:'center',
    },
    topBar:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignContent:'center',
        // backgroundColor:'pink',
        width:'95%',


    },
    icon: {
        tintColor: 'white',
        resizeMode: 'contain',
        height: height * 0.03,
        width: height * 0.03,
      },
      helperText:{
        color: 'white',
        fontSize: height * 0.02,
        fontWeight: 'bold',
        marginLeft: width * 0.02,
      },
      iconContainer: {
        flexDirection: 'row',
      },
      iconSpacing: {
        marginRight: width * 0.04,
      },


    //   ---------------------------------------------------
    contents:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding: width * 0.07,
    },
    bigImage:{
        height: height * 0.2,
        width: width * 0.3,
        resizeMode: 'contain',
        // backgroundColor
    },
    mainText:{
        color: 'white',
        marginTop: height * 0.01,
        fontSize: width * 0.05,
        textAlign: 'center',
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
        marginBottom:80
      },
      dateTime:{
        backgroundColor: '#4D4D4F',
        padding: width * 0.01,
        borderRadius: width * 0.025,
        marginTop: height * 0.01,
      }
});