import { Image, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NoteContext, Note } from '../logic/NoteContext';

const { width, height } = Dimensions.get('window');

const NoteEdit = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const noteContext = useContext(NoteContext);
    
    // Check if context exists
    if (!noteContext) {
        throw new Error("NoteEdit must be used within a NoteProvider");
    }
    
    const { addNote, archiveNote, deleteNote } = noteContext;
    
    // Get note from params if editing existing note
    const noteParam = route.params?.note;
    
    // State for the note content
    const [title, setTitle] = useState(noteParam?.title || '');
    const [noteContent, setNoteContent] = useState(noteParam?.content || '');
    const [isPinned, setIsPinned] = useState(noteParam?.isPinned || false);
    const [hasReminder, setHasReminder] = useState(noteParam?.hasReminder || false);
    const [isArchived, setIsArchived] = useState(noteParam?.isArchived || false);

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
        setHasReminder(!hasReminder);
        Alert.alert("Reminder " + (hasReminder ? "removed" : "set"));
    };

    // Handle archive action
    const handleArchive = () => {
        setIsArchived(!isArchived);
        Alert.alert("Note " + (isArchived ? "unarchived" : "archived"));
        
        if (!isArchived) {
            // Create a note object to archive
            const noteData = {
                id: noteParam?.id || Date.now().toString(),
                title,
                content: noteContent,
                isPinned,
                hasReminder,
                isArchived: true,
                updatedAt: new Date().toISOString()
            };
            
            // Archive the note using context
            archiveNote(noteData);
            
            // If archiving, save and go back after a short delay
            setTimeout(() => saveAndGoBack(), 1000);
        }
    };

    // Save the note and navigate back
    const saveAndGoBack = () => {
        // Create a note object to pass back
        const noteData: Note = {
            id: noteParam?.id || Date.now().toString(),
            title,
            content: noteContent,
            isPinned,
            hasReminder,
            isArchived,
            updatedAt: new Date().toISOString()
        };

        // Add/Update the note in context
        addNote(noteData);
        
        // Set params before navigating back
        navigation.setParams({ savedNote: noteData });
        
        // Navigate back to the Notes screen with the saved note
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
                            updatedAt: new Date().toISOString()
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