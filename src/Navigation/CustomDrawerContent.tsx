import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NoteContext, NoteContextType } from '../logic/NoteContext'; // Add this import

const { width, height } = Dimensions.get('window');

const CustomDrawerContent = (props: any) => {
  const [selectedItem, setSelectedItem] = useState('');
  const { labels } = useContext(NoteContext) as NoteContextType; // Add this line to access context

  const handlePress = (item: string) => {
    setSelectedItem(item);
    props.navigation.navigate(item);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { fontWeight: 'bold' }]}>fundoo</Text>
        <Text style={styles.headerText}> Notes</Text>
      </View>
      <View style={[styles.divider, { width: '100%' }]} />
      <View style={styles.section}>
        <DrawerItem
          label="Notes"
          icon={() => <Image source={require('../Assets/lightbulb.png')} style={styles.icon} />}
          onPress={() => handlePress('Home')}
          labelStyle={styles.drawerLabel}
          style={selectedItem === 'Home' ? styles.selectedItem : null}
        />
        <DrawerItem
          label="Reminders"
          icon={() => <Image source={require('../Assets/bell.fill.png')} style={styles.icon} />}
          onPress={() => handlePress('Reminders')}
          labelStyle={styles.drawerLabel}
          style={selectedItem === 'Reminders' ? styles.selectedItem : null}
        />
        <View style={styles.divider} />
        <Text style={styles.sectionHeading}>LABELS</Text>
        
        {/* Add this section to show labels from context */}
        {Object.keys(labels).map((labelName) => (
          <DrawerItem
            key={labelName}
            label={labelName}
            icon={() => <Image source={require('../Assets/tag.png')} style={styles.icon} />}
            onPress={() => handlePress(labelName)}
            labelStyle={styles.drawerLabel}
            style={selectedItem === labelName ? styles.selectedItem : null}
          />
        ))}
        
        <DrawerItem
          label="Create new Label"
          icon={() => <Image source={require('../Assets/plus.png')} style={styles.icon} />}
          onPress={() => handlePress('Label')}
          labelStyle={styles.drawerLabel}
          style={selectedItem === 'Label' ? styles.selectedItem : null}
        />
        <View style={styles.divider} />
        <DrawerItem
          label="Archive"
          icon={() => <Image source={require('../Assets/archivebox.png')} style={styles.icon} />}
          onPress={() => handlePress('Archive')}
          labelStyle={styles.drawerLabel}
          style={selectedItem === 'Archive' ? styles.selectedItem : null}
        />
        <DrawerItem
          label="Bin"
          icon={() => <Image source={require('../Assets/xmark.bin.png')} style={styles.icon} />}
          onPress={() => handlePress('Bin')}
          labelStyle={styles.drawerLabel}
          style={selectedItem === 'Bin' ? styles.selectedItem : null}
        />
        <View style={styles.divider} />
        <DrawerItem
          label="Settings"
          icon={() => <Image source={require('../Assets/gear.png')} style={styles.icon} />}
          onPress={() => handlePress('Settings')}
          labelStyle={styles.drawerLabel}
          style={selectedItem === 'Settings' ? styles.selectedItem : null}
        />
        <DrawerItem
          label="Feedback"
          icon={() => <Image source={require('../Assets/info.bubble.png')} style={styles.icon} />}
          onPress={() => handlePress('Feedback')}
          labelStyle={styles.drawerLabel}
          style={selectedItem === 'Feedback' ? styles.selectedItem : null}
        />
        <DrawerItem
          label="Help"
          icon={() => <Image source={require('../Assets/questionmark.circle.png')} style={styles.icon} />}
          onPress={() => handlePress('Help')}
          labelStyle={styles.drawerLabel}
          style={selectedItem === 'Help' ? styles.selectedItem : null}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  all: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: width * 0.02,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: width * 0.05,
    color: 'white',
  },
  section: {
    
  },
  sectionHeading: {
    // marginLeft: width * 0.04,
    marginVertical: height * 0.01,
    fontSize: width * 0.03,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    width: width * 0.04,
    height: height * 0.025,
    objectFit: 'contain',
    marginRight: width * 0.03,
  },
  divider: {
    height: 1,
    backgroundColor: '#5B6063',
    marginVertical: height * 0.0075,
    width: '85%',
    alignSelf: 'flex-end',
  },
  drawerLabel: {
    color: 'white',
  },
  selectedItem: {
    backgroundColor: '#8BB4FA50',
  },
});

export default CustomDrawerContent;