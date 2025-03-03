import { Image, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NoteContext } from '../logic/NoteContext';
import { styles } from '../Stylesheets/RemindersArchiveBinStyling';
const { width, height } = Dimensions.get('window');
const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toTimeString().split(' ')[0];
    return `${formattedDate}, ${formattedTime}`;
};

const Archive = () => {
    const noteContext = useContext(NoteContext);
    const { archive, unarchiveNote } = noteContext;
    const handleNotePress = (note) => {
        navigation.navigate('NoteEdit', { note });
    };
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Image style={styles.icon} source={require('../Assets/line.3.horizontal.png')} />
                    </TouchableOpacity>
                    <Text style={styles.helperText}>Archive</Text>
                    <View style={styles.iconContainer}>
                        <Image style={[styles.icon, styles.iconSpacing]} source={require('../Assets/magnifyingglass.png')} />
                        <Image style={styles.icon} source={require('../Assets/rectangle.grid.1x2.png')} />
                    </View>
                </View>


                {archive.length > 0 ? (
                    <ScrollView>
                        <View style={styles.notesContainer}>
                            {archive && archive.length > 0 ? (
                                archive.map((note) => (
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
                                ))
                            ) : (
                                <Text style={styles.text}>No archived notes available.</Text>
                            )}
                        </View>
                    </ScrollView>
                ) : (
                    <View style={styles.contents}>
                        <Image style={styles.bigImage} source={require('../Assets/archivebox.png')} />
                        <Text style={styles.mainText}>Your archived notes appear here</Text>
                    </View>
                )}


            </View>
        </SafeAreaView>
    );
};

export default Archive;
