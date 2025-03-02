import { Keyboard, Image, SafeAreaView, StyleSheet, Text, TextInput, View, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NoteContext, NoteContextType } from '../logic/NoteContext';

const { width, height } = Dimensions.get('window');

const Label = () => {
  const navigation = useNavigation();
  const textInputRef = useRef<TextInput>(null);
  const [inputText, setInputText] = useState<string>('');
  const [editingLabel, setEditingLabel] = useState<string | null>(null);
  
  // Access the context to use the label functions
  // Add deleteLabel and addNoteToLabel to the destructuring
  const { 
    labels, 
    addLabel, 
    removeNoteFromLabel, 
    deleteLabel, 
    addNoteToLabel 
  } = useContext(NoteContext) as NoteContextType;

  // Focus when component mounts
  useEffect(() => {
    // Short timeout to ensure component is fully rendered
    const timer = setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Add focus handler for navigation events (screen becomes active)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Short timeout to ensure component is fully rendered after navigation
      setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }, 100);
    });

    return unsubscribe;
  }, [navigation]);

  // Handle creating a new label or updating existing label
  const handleCreateOrUpdateLabel = () => {
    if (inputText.trim()) {
      if (editingLabel) {
        // Update existing label (delete old and create new)
        const notesInLabel = labels[editingLabel] || [];
        
        // First add the new label
        addLabel(inputText.trim());
        
        // Move all notes from old label to new label
        notesInLabel.forEach(note => {
          addNoteToLabel(inputText.trim(), note);
          removeNoteFromLabel(editingLabel, note.id);
        });
        
        // Delete the old label
        deleteLabel(editingLabel);
        
        // Reset editing state
        setEditingLabel(null);
      } else {
        // Add new label
        addLabel(inputText.trim());
      }
      
      // Clear input and dismiss keyboard
      setInputText('');
      Keyboard.dismiss();
    }
  };
  
  // Handle deleting a label
  const handleDeleteLabel = (labelName: string) => {
    deleteLabel(labelName);
  };
  
  // Start editing a label
  const handleEditLabel = (labelName: string) => {
    setEditingLabel(labelName);
    setInputText(labelName);
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image style={styles.icon} source={require('../Assets/x.square.png')} />
          </TouchableOpacity>
          <Text style={styles.heading}>Edit Labels</Text>
          <View />
        </View>
        
        <View>
          <View style={styles.inputBox}>
            <View style={styles.rowContainer}>
              <TouchableOpacity onPress={() => {
                setInputText('');
                setEditingLabel(null);
                Keyboard.dismiss();
              }}>
                <Image style={[styles.icon, styles.inputIcon]} source={require('../Assets/x.square.png')} />
              </TouchableOpacity>
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                ref={textInputRef}
                placeholderTextColor={'white'}
                placeholder={editingLabel ? "Edit label" : "Create new label"}
                style={styles.textInput}
                autoFocus={true}
              />
            </View>
            <TouchableOpacity onPress={handleCreateOrUpdateLabel}>
              <Image 
                style={[styles.icon, styles.blueIcon]} 
                source={require('../Assets/checkmark.png')} 
              />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Display existing labels */}
        <FlatList
          data={Object.keys(labels)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.labelItem}>
              <View style={styles.labelIconContainer}>
                <Image 
                  style={[styles.icon, styles.labelIcon]} 
                  source={require('../Assets/tag.png')} 
                />
              </View>
              <Text style={styles.labelText}>{item}</Text>
              <View style={styles.labelActions}>
                <TouchableOpacity onPress={() => handleEditLabel(item)}>
                  <Image 
                    style={[styles.icon, styles.actionIcon]} 
                    source={require('../Assets/pencil.png')} 
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteLabel(item)}>
                  <Image 
                    style={[styles.icon, styles.actionIcon, styles.deleteIcon]} 
                    source={require('../Assets/trash.png')} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Label;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#212025',
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  heading: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: width * 0.05,
  },
  icon: {
    tintColor: 'white',
    resizeMode: 'contain',
    height: height * 0.025,
    width: height * 0.025,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    height: height * 0.06,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: width * 0.05,
  },
  textInput: {
    color: 'white',
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputIcon: {
    tintColor: 'white',
    marginHorizontal: width * 0.05,
  },
  blueIcon: {
    tintColor: 'lightblue',
  },
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    borderBottomWidth: 0.5,
    borderBottomColor: '#555',
    paddingHorizontal: width * 0.05,
  },
  labelIconContainer: {
    marginRight: width * 0.03,
  },
  labelIcon: {
    tintColor: 'lightblue',
  },
  labelText: {
    color: 'white',
    fontSize: width * 0.04,
    flex: 1,
  },
  labelActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    marginLeft: width * 0.03,
  },
  deleteIcon: {
    tintColor: '#ff6b6b',
  }
});