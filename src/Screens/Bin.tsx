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

const Bin = () => {
    const noteContext = useContext(NoteContext);
    const { bin, restoreNote } = noteContext;
    const navigation = useNavigation();
    
    const handleNotePress = (note) => {
        navigation.navigate('NoteEdit', { note, isFromBin: true });
    };

    // Calculate deletion date (30 days from updatedAt)
    const calculateDeletionDate = (updatedAt) => {
        if (!updatedAt) return '';
        const date = new Date(updatedAt);
        date.setDate(date.getDate() + 30); // Add 30 days
        return formatDateTime(date.toISOString());
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Image style={styles.icon}  source={require('../Assets/line.3.horizontal.png')} />
                    </TouchableOpacity>
                    <Text style={styles.helperText}>Bin</Text>
                    <View style={styles.iconContainer}>
                        <Image style={[styles.icon, styles.iconSpacing]} source={require('../Assets/magnifyingglass.png')} />
                        <Image style={styles.icon} source={require('../Assets/rectangle.grid.1x2.png')} />
                    </View>
                </View>

                {/* --------------------------------------------------- */}
                
                {bin.length > 0 ? (
                    <ScrollView>
                        <View style={styles.notesContainer}>
                            {bin.map((note) => (
                                <TouchableOpacity
                                    style={styles.contentBox}
                                    key={note.id}
                                    onPress={() => handleNotePress(note)}
                                >
                                    <Text style={styles.text}>{note.title}</Text>
                                    <Text style={styles.text}>{note.content}</Text>
                                    <View style={styles.dateTime}>
                                        <Text style={styles.text}>Will be deleted on: {calculateDeletionDate(note.updatedAt)}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={binStyles.restoreButton}
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            restoreNote(note);
                                        }}
                                    >
                                        <Text style={binStyles.restoreButtonText}>Restore</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                ) : (
                    <View style={styles.contents}>
                        <Image style={styles.bigImage} source={require('../Assets/xmark.bin.png')} />
                        <Text style={styles.mainText}>Your deleted notes appear here</Text>
                        <Text style={binStyles.subText}>Notes will be permanently deleted after 30 days</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Bin;

const binStyles = StyleSheet.create({

    subText: {
        color: '#8A8A8E',
        marginTop: height * 0.01,
        fontSize: width * 0.035,
        textAlign: 'center',
    },
    restoreButton: {
        backgroundColor: '#3A7BFF',
        borderRadius: width * 0.02,
        padding: width * 0.01,
        marginTop: height * 0.01,
        alignSelf: 'flex-end',
    },
    restoreButtonText: {
        color: 'white',
        fontSize: width * 0.03,
        fontWeight: 'bold',
    },
});