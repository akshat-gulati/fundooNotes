import React, { useEffect, useContext, useRef } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import Navigator from './Navigation/Navigator';
import { NoteProvider, NoteContext } from './logic/NoteContext';
import notifee, { EventType, Event, AndroidLaunchActivityAction, IOSAuthorizationStatus } from '@notifee/react-native';
import { checkAndRescheduleNotifications } from './Components/scheduleReminderNotification';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainerRef } from '@react-navigation/native';

// Create a ref for navigation that can be accessed globally
let navigationRef = null;

const AppContent = () => {
  const { notes } = useContext(NoteContext);
  const navRef = useRef(null);
  
  useEffect(() => {
    // Set up foreground event handler
    const unsubscribeForeground = notifee.onForegroundEvent(handleNotificationEvent);
    
    // Initial check to reschedule all reminders on app launch
    checkAndRescheduleNotifications(notes);
    
    // Set up background and quit state handler
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        // Handle notification press when app was in background
        try {
          const noteId = detail.notification?.id?.replace('reminder-', '');
          if (noteId) {
            // Store the noteId to be processed when the app is fully launched
            await notifee.setNotificationCategories([
              {
                id: 'open_note',
                actions: [
                  {
                    id: 'view',
                    title: 'View Note',
                  },
                ],
              },
            ]);
            
            // Store the noteId to be retrieved later
            if (Platform.OS === 'ios') {
              // Use iOS-specific storage
              await notifee.setBadgeCount(0);
            }
          }
        } catch (error) {
          console.error('Error handling background notification:', error);
        }
      }
    });
    
    // Listen for app state changes to refresh reminders
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
    
    // Clean up subscriptions
    return () => {
      unsubscribeForeground();
      appStateSubscription.remove();
    };
  }, [notes]);
  
  // Handle notification events when app is in foreground
  const handleNotificationEvent = async ({ type, detail }: Event) => {
    if (type === EventType.PRESS) {
      try {
        const noteId = detail.notification?.id?.replace('reminder-', '');
        
        // Find the note in the current notes array
        const targetNote = notes.find(note => note.id === noteId);
        
        if (targetNote && navigationRef) {
          // Navigate to the appropriate note for editing
          navigationRef.navigate('NoteEdit', { note: targetNote });
        }
      } catch (error) {
        console.error('Error handling notification press:', error);
      }
    } else if (type === EventType.ACTION_PRESS && detail.pressAction) {
      // Handle custom action buttons
      if (detail.pressAction.id === 'view') {
        const noteId = detail.notification?.id?.replace('reminder-', '');
        const targetNote = notes.find(note => note.id === noteId);
        
        if (targetNote && navigationRef) {
          navigationRef.navigate('NoteEdit', { note: targetNote });
        }
      }
    }
  };
  
  // Handle app state changes
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      // Reschedule all reminders when app comes to foreground
      checkAndRescheduleNotifications(notes);
      // Reset badge count on iOS
      if (Platform.OS === 'ios') {
        notifee.setBadgeCount(0);
      }
    }
  };
  
  // Set navigation reference to use for directing users to notes when notifications are pressed
  const setNavigatorRef = (ref) => {
    navigationRef = ref;
    navRef.current = ref;
  };
  
  return <Navigator ref={setNavigatorRef} />;
};

const App = () => {
  // Set up notifications for when app is launched from a quit state
  useEffect(() => {
    // Check if app was launched from a notification
    const checkInitialNotification = async () => {
      const initialNotification = await notifee.getInitialNotification();
      
      if (initialNotification) {
        // App was launched via notification
        console.log('App launched via notification', initialNotification.id);
        
        // Store the notification ID to be handled after context is ready
        global.initialNotificationId = initialNotification.id?.replace('reminder-', '');
      }
    };
    
    // Bootstrap notification settings on app launch
    const bootstrapNotifications = async () => {
      // Request permissions with all required options for iOS
      if (Platform.OS === 'ios') {
        const settings = await notifee.requestPermission({
          sound: true,
          announcement: true,
          alert: true,
          badge: true,
          criticalAlert: true,
          provisional: true,
        });
        
        if (
          settings.authorizationStatus === IOSAuthorizationStatus.AUTHORIZED ||
          settings.authorizationStatus === IOSAuthorizationStatus.PROVISIONAL
        ) {
          // Register for remote notifications on iOS
          await notifee.registerForRemoteNotifications();
        }
      } else {
        // Android permissions
        await notifee.requestPermission();
      }
      
      // Create default channel
      if (Platform.OS === 'android') {
        await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
      }
      
      // Check if app was launched from notification
      await checkInitialNotification();
    };
    
    bootstrapNotifications();
    
    // Set up for handling when the app returns to foreground after being closed
    const subscription = AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        // Clear badge count on iOS
        if (Platform.OS === 'ios') {
          await notifee.setBadgeCount(0);
        }
      }
    });
    
    return () => {
      subscription.remove();
    };
  }, []);
  
  // Monitor navigation ready state to handle initial notification
  const handleNavigationReady = () => {
    if (global.initialNotificationId && navigationRef) {
      setTimeout(() => {
        // Find the note in the notes array (will need context)
        // This is a placeholder - the actual implementation will use the context
        if (navigationRef.current) {
          navigationRef.current.navigate('Reminders');
        }
      }, 1000); // Give time for navigation to be fully ready
    }
  };
  
  return (
    <NoteProvider>
      <AppContent />
    </NoteProvider>
  );
};

export default App;