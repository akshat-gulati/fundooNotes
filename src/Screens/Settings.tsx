import { Image, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, ScrollView, Switch } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

// Define types for our state objects
interface SettingsState {
  addToBottom: boolean;
  moveTickedItems: boolean;
  displayLinkPreviews: boolean;
  enableSharing: boolean;
}

interface RemindersState {
  morning: string;
  afternoon: string;
  evening: string;
}

// Props types for our reusable components
interface SwitchItemProps {
  title: string;
  value: boolean;
  settingKey: keyof SettingsState;
}

interface ReminderItemProps {
  title: string;
  value: string;
  reminderKey: keyof RemindersState;
  placeholder: string;
}

interface ArrowItemProps {
  title: string;
}

interface SectionHeaderProps {
  title: string;
}

const Settings: React.FC = () => {
    // Consolidated switch states into a single object
    const [settings, setSettings] = useState<SettingsState>({
        addToBottom: false,
        moveTickedItems: false,
        displayLinkPreviews: false,
        enableSharing: false
    });
    // Consolidated reminder times into a single object
    const [reminders, setReminders] = useState<RemindersState>({
        morning: '',
        afternoon: '',
        evening: '',
    });

    const navigation = useNavigation();
    // Helper function to toggle switch settings
    const toggleSetting = (key: keyof SettingsState): void => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
    // Helper function to update reminder times
    const updateReminder = (key: keyof RemindersState, value: string): void => {
        setReminders(prev => ({
            ...prev,
            [key]: value,
        }));
    };
    
    // Reusable component for switch items
    const SwitchItem: React.FC<SwitchItemProps> = ({ title, value, settingKey }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{title}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => toggleSetting(settingKey)}
                value={value}
            />
        </View>
    );
    
    // Reusable component for time input items
    const ReminderItem: React.FC<ReminderItemProps> = ({ title, value, reminderKey, placeholder }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{title}</Text>
            <TextInput 
                style={styles.textInput}
                value={value}
                onChangeText={(text) => updateReminder(reminderKey, text)}
                placeholder={placeholder}
                placeholderTextColor="#767577"
            />
        </View>
    );
    
    // Reusable component for arrow items
    const ArrowItem: React.FC<ArrowItemProps> = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.itemText}>{title}</Text>
            <TouchableOpacity>
                <Image 
                    style={styles.arrowIcon} 
                    source={require('../Assets/x.square.png')} 
                />
            </TouchableOpacity>
        </View>
    );
    
    // Reusable section header
    const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
        <Text style={styles.displayText}>{title}</Text>
    );
    
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Image style={styles.icon} source={require('../Assets/x.square.png')} />
                    </TouchableOpacity>
                    <Text style={styles.helperText}>Settings</Text>
                    <View />
                </View>

                <View style={styles.fullSize}>
                    <ScrollView style={styles.fullSize}>
                        <View style={styles.section}>
                            <SectionHeader title="Display Options" />
                            <SwitchItem 
                                title="Add new items to the bottom" 
                                value={settings.addToBottom} 
                                settingKey="addToBottom" 
                            />
                            <SwitchItem 
                                title="Moved ticked items to the bottom" 
                                value={settings.moveTickedItems} 
                                settingKey="moveTickedItems" 
                            />
                            <SwitchItem 
                                title="Display rich link previews" 
                                value={settings.displayLinkPreviews} 
                                settingKey="displayLinkPreviews" 
                            />
                            
                            <SectionHeader title="Reminder Settings" />
                            <ReminderItem 
                                title="Morning" 
                                value={reminders.morning} 
                                reminderKey="morning" 
                                placeholder="09:00 AM" 
                            />
                            <ReminderItem 
                                title="Afternoon" 
                                value={reminders.afternoon} 
                                reminderKey="afternoon" 
                                placeholder="01:00 PM" 
                            />
                            <ReminderItem 
                                title="Evening" 
                                value={reminders.evening} 
                                reminderKey="evening" 
                                placeholder="07:00 PM" 
                            />
                            
                            <SectionHeader title="Sharing" />
                            <SwitchItem 
                                title="Enable Sharing" 
                                value={settings.enableSharing} 
                                settingKey="enableSharing" 
                            />
                            
                            <SectionHeader title="Google" />
                            <ArrowItem title="Google App Settings" />
                            
                            <SectionHeader title="About" />
                            <View style={styles.item}>
                                <Text style={styles.itemText}>Application Version</Text>
                                <Text style={styles.versionText}>2.2025.06203</Text>
                            </View>
                            <ArrowItem title="Privacy Policy" />
                            
                            <View style={styles.spacer} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Settings;

// Styles remain unchanged
const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#2D2E33',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        width: '95%',
    },
    icon: {
        tintColor: 'white',
        resizeMode: 'contain',
        height: height * 0.03,
        width: height * 0.03,
    },
    arrowIcon: {
        tintColor: 'white',
        resizeMode: 'contain',
        height: height * 0.02,
        width: height * 0.02,
    },
    helperText: {
        color: 'white',
        fontSize: height * 0.02,
        fontWeight: 'bold',
        marginLeft: width * 0.02,
    },
    fullSize: {
        width: '100%',
        height: '100%',
    },
    displayText: {
        color: '#8CB2F4',
        width: '100%',
        fontSize: height * 0.018,
        marginTop: height * 0.02,
        marginBottom: height * 0.01,
        paddingHorizontal: width * 0.04,
    },
    section: {
        width: '100%',
        paddingVertical: height * 0.02,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.015,
        borderBottomWidth: 0.5,
        borderBottomColor: '#3E3E3E',
    },
    itemText: {
        color: 'white',
        fontSize: height * 0.016,
    },
    versionText: {
        color: 'gray',
        fontSize: height * 0.016,
    },
    textInput: {
        color: 'white',
        backgroundColor: '#3E3E3E',
        borderRadius: 5,
        paddingHorizontal: width * 0.02,
        paddingVertical: height * 0.005,
        width: width * 0.3,
        fontSize: height * 0.016,
    },
    spacer: {
        height: height * 0.1,
    },
});