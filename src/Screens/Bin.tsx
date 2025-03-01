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
                                        style={styles.restoreButton}
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            restoreNote(note);
                                        }}
                                    >
                                        <Text style={styles.restoreButtonText}>Restore</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                ) : (
                    <View style={styles.contents}>
                        <Image style={styles.bigImage} source={require('../Assets/xmark.bin.png')} />
                        <Text style={styles.mainText}>Your deleted notes appear here</Text>
                        <Text style={styles.subText}>Notes will be permanently deleted after 30 days</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Bin;

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

    // ---------------------------------------------------
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
    },
    mainText:{
        color: 'white',
        marginTop: height * 0.01,
        fontSize: width * 0.05,
        textAlign: 'center',
    },
    subText: {
        color: '#8A8A8E',
        marginTop: height * 0.01,
        fontSize: width * 0.035,
        textAlign: 'center',
    },
    contentBox: {
        borderWidth: 1,
        borderColor: 'white',
        padding: width * 0.025,
        marginVertical: height * 0.012,
        borderRadius: width * 0.025,
        width: '45%',
        // position: 'relative',
    },
    text: {
        color: 'white',
        fontSize: width * 0.03,
    },
    notesContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 80,
    },
    dateTime: {
        backgroundColor: '#4D4D4F',
        padding: width * 0.01,
        borderRadius: width * 0.025,
        marginTop: height * 0.01,
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