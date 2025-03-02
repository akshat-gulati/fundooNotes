import { Image, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NoteContext, Note } from '../logic/NoteContext';

const { width, height } = Dimensions.get('window');

const NoteEdit = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const noteContext = useContext(NoteContext);
    // Inside NoteEdit component

    const fromLabel = route.params?.fromLabel;

    // Check if context exists
    if (!noteContext) {
        throw new Error("NoteEdit must be used within a NoteProvider");
    }

    const { addNote, archiveNote, deleteNote, updateNote } = noteContext;

    // Get note from params if editing existing note
    const noteParam = route.params?.note;

    // State for the note content
    const [title, setTitle] = useState(noteParam?.title || '');
    const [noteContent, setNoteContent] = useState(noteParam?.content || '');
    const [isPinned, setIsPinned] = useState(noteParam?.isPinned || false);
    const [hasReminder, setHasReminder] = useState(noteParam?.hasReminder || false);
    const [isArchived, setIsArchived] = useState(noteParam?.isArchived || false);
    const [reminderDateTime, setReminderDateTime] = useState(noteParam?.reminderDateTime || '');

    // State for undo/redo functionality
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Save history when content changes
    useEffect(() => {
        if (title || noteContent) {
            // Only save history if there are actual changes
            if (historyIndex === -1 || title !== history[historyIndex]?.title || noteContent !== history[historyIndex]?.content) {
                const newHistory = history.slice(0, historyIndex + 1);
                newHistory.push({ title, content: noteContent });

                setHistory(newHistory);
                setHistoryIndex(newHistory.length - 1);
            }
        }
    }, [title, noteContent]);

    // Handle pin action
    const handlePin = () => {
        setIsPinned(!isPinned);
        Alert.alert(isPinned ? "Note unpinned" : "Note pinned");
    };

    // Handle reminder action
    const handleReminder = () => {
        const newReminderState = !hasReminder;
        setHasReminder(newReminderState);

        if (newReminderState) {
            // For simplicity, set reminder to one day from now
            const oneDayLater = new Date();
            oneDayLater.setDate(oneDayLater.getDate() + 1);
            setReminderDateTime(oneDayLater.toISOString());
            Alert.alert("Reminder set for tomorrow");
        } else {
            setReminderDateTime('');
            Alert.alert("Reminder removed");
        }
    };

    // Handle archive action
    const handleArchive = () => {
        const newArchivedState = !isArchived;
        setIsArchived(newArchivedState);
        Alert.alert("Note " + (isArchived ? "unarchived" : "archived"));

        // Create a note object to archive/unarchive
        const noteData = {
            id: noteParam?.id || Date.now().toString(),
            title,
            content: noteContent,
            isPinned,
            hasReminder,
            isArchived: newArchivedState,
            updatedAt: new Date().toISOString(),
            reminderDateTime: hasReminder ? reminderDateTime : undefined
        };

        // Archive the note using context
        archiveNote(noteData);

        // If archiving, save and go back after a short delay
        if (newArchivedState) {
            setTimeout(() => saveAndGoBack(), 1000);
        }
    };

const saveAndGoBack = () => {
    // Check if title and content are not empty
    if (!title.trim() || !noteContent.trim()) {
        // If either is empty, do not save and return early
        navigation.goBack();
        return;
    }

    // Create a note object to save
    const updatedNote = {
        id: noteParam?.id || Date.now().toString(),
        title,
        content: noteContent,
        isPinned,
        hasReminder,
        isArchived,
        updatedAt: new Date().toISOString(),
        reminderDateTime: hasReminder ? reminderDateTime : undefined
    };
    
    // Save the note using context
    updateNote(updatedNote);

    // If this note came from a label screen, add it to that label using the context function
    if (fromLabel) {
        noteContext.addNoteToLabel(fromLabel, updatedNote);
    }

    // Navigate back
    navigation.goBack();
};

    // Handle back button click - save and navigate back
    const handleBack = () => {
        saveAndGoBack();
    };

    // Undo functionality
    const handleUndo = () => {
        if (historyIndex > 0) {
            const prevState = history[historyIndex - 1];
            setTitle(prevState.title);
            setNoteContent(prevState.content);
            setHistoryIndex(historyIndex - 1);
        } else {
            Alert.alert("Nothing to undo");
        }
    };

    // Redo functionality
    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            const nextState = history[historyIndex + 1];
            setTitle(nextState.title);
            setNoteContent(nextState.content);
            setHistoryIndex(historyIndex + 1);
        } else {
            Alert.alert("Nothing to redo");
        }
    };

    // Handle add attachment
    const handleAddAttachment = () => {
        Alert.alert("Add attachment", "This feature is coming soon");
    };

    // Handle color palette
    const handleColorPalette = () => {
        Alert.alert("Change note color", "This feature is coming soon");
    };

    // Handle more options
    const handleMoreOptions = () => {
        Alert.alert(
            "More Options",
            "Choose an action",
            [
                { text: "Share", onPress: () => console.log("Share") },
                {
                    text: "Delete", onPress: () => {
                        // Create a note object to delete
                        const noteData = {
                            id: noteParam?.id || Date.now().toString(),
                            title,
                            content: noteContent,
                            isPinned,
                            hasReminder,
                            isArchived,
                            updatedAt: new Date().toISOString(),
                            reminderDateTime: hasReminder ? reminderDateTime : undefined
                        };

                        // Delete the note using context
                        deleteNote(noteData);

                        Alert.alert("Note deleted");
                        navigation.goBack();
                    }
                },
                { text: "Make a copy", onPress: () => console.log("Make a copy") },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={handleBack}>
                        <Image style={styles.icon} source={require('../Assets/chevron.left.png')} />
                    </TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={handlePin}>
                            <Image
                                style={[styles.icon, styles.iconSpacing]}
                                source={require('../Assets/pin.png')}
                                tintColor={isPinned ? '#FFD700' : 'white'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleReminder}>
                            <Image
                                style={[styles.icon, styles.iconSpacing]}
                                source={require('../Assets/bell.fill.png')}
                                tintColor={hasReminder ? '#FFD700' : 'white'}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleArchive}>
                            <Image
                                style={styles.icon}
                                source={require('../Assets/archivebox.png')}
                                tintColor={isArchived ? '#FFD700' : 'white'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.EditContainer}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder='Title'
                        placeholderTextColor={"#888"}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.noteInput}
                        multiline={true}
                        textAlignVertical="top"
                        placeholder='Note'
                        placeholderTextColor={"#888"}
                        value={noteContent}
                        onChangeText={setNoteContent}
                    />
                </View>

                {/* Bottom Bar */}
                <View style={styles.bottomBar}>
                    <View style={styles.bottomEachSection}>
                        <TouchableOpacity onPress={handleAddAttachment}>
                            <Image style={[styles.icon, styles.iconSpacing]} source={require('../Assets/plus.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleColorPalette}>
                            <Image style={[styles.icon, styles.iconSpacing]} source={require('../Assets/paintpalette.fill.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomEachSection}>
                        <TouchableOpacity onPress={handleUndo}>
                            <Image style={[styles.icon, styles.iconSpacing]} source={require('../Assets/arrow.uturn.backward.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleRedo}>
                            <Image style={[styles.icon, styles.iconSpacing]} source={require('../Assets/arrow.uturn.forward.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomEachSection}>
                        <TouchableOpacity onPress={handleMoreOptions}>
                            <Image
                                style={[styles.icon, styles.iconSpacing, { transform: [{ rotate: '90deg' }] }]}
                                source={require('../Assets/ellipsis.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NoteEdit;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#212025',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
    },
    icon: {
        tintColor: 'white',
        resizeMode: 'contain',
        height: height * 0.03,
        width: height * 0.03,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    iconSpacing: {
        marginRight: width * 0.04,
    },
    // --------------------------------------------------------
    EditContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        padding: width * 0.04,
    },
    titleInput: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    noteInput: {
        fontSize: 20,
        color: 'white',
        flex: 1,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        bottom: 0,
        paddingHorizontal: width * 0.04,
        paddingVertical: width * 0.01,
    },
    bottomEachSection: {
        flexDirection: 'row',
    }
});