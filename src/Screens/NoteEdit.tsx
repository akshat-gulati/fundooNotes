import { Image, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const NoteEdit = () => {
    const navigation = useNavigation();
    const route = useRoute();
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
            // If archiving, go back after a short delay
            setTimeout(() => navigation.goBack(), 1000);
        }
    };

    // Handle save and back navigation
    const handleBack = () => {
        // Create a note object to pass back
        const noteData = {
            id: noteParam?.id || Date.now().toString(),
            title,
            content: noteContent,
            isPinned,
            hasReminder,
            isArchived,
            updatedAt: new Date().toISOString()
        };

        // Navigate back with the updated note
        // navigation.navigate('NotesList', { savedNote: noteData });
        navigation.goBack();
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
                        placeholderTextColor={"red"}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.noteInput}
                        multiline={true}
                        textAlignVertical="top"
                        placeholder='Note'
                        placeholderTextColor={"red"}
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
        // marginTop: width * 0.04,
        width: '100%',
        // height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: width * 0.04,
    },
    titleInput: {
        fontSize: 24, // Adjust the size as needed
        fontWeight: 'bold',
        color: 'black',

    },
    noteInput: {
        fontSize: 20,
        backgroundColor: 'pink',
        // height: '100%',
        // width: '100%',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        // backgroundColor:'red',
        bottom: 0,
        paddingHorizontal: width * 0.04,
        paddingVertical: width * 0.01,

    },
    bottomEachSection: {
        flexDirection: 'row',
    }
});