import notifee, { 
    TriggerType, 
    TimestampTrigger, 
    AuthorizationStatus, 
    AndroidImportance, 
    AndroidCategory,
    
  } from '@notifee/react-native';
  import { Platform } from 'react-native';
  
  // Schedule a reminder notification with proper handling for background/closed app states
  export async function scheduleReminderNotification(note) {
    // Request permissions with all required options
    const settings = await notifee.requestPermission({
      sound: true,
      announcement: true,
      alert: true,
      badge: true,
      criticalAlert: true,
      provisional: true,
    });
  
    // Return early if permissions weren't granted
    if (Platform.OS === 'ios') {
      if (settings.authorizationStatus !== AuthorizationStatus.AUTHORIZED &&
          settings.authorizationStatus !== AuthorizationStatus.PROVISIONAL) {
        console.log('User declined notification permissions on iOS');
        return;
      }
    } else {
      if (settings.authorizationStatus !== AuthorizationStatus.AUTHORIZED &&
          settings.authorizationStatus !== AuthorizationStatus.PROVISIONAL) {
        console.log('User declined notification permissions on Android');
        return;
      }
    }
    
    // If no reminder date is set, return early
    if (!note.reminderDateTime) return;
    
    // Parse the date string to a Date object
    const reminderDate = new Date(note.reminderDateTime);
    
    // Ensure the date is in the future
    if (reminderDate.getTime() <= Date.now()) {
      console.log('Reminder date is in the past, not scheduling');
      return;
    }
    
    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: reminderDate.getTime(), // milliseconds
    };
    
    // Add Android-specific trigger options
    if (Platform.OS === 'android') {
      trigger.alarmManager = true; // Use AlarmManager for precise timing on Android
    }
    
    // Create a notification channel for Android with high importance
    let channelId = 'default';
    if (Platform.OS === 'android') {
      channelId = await notifee.createChannel({
        id: 'reminders',
        name: 'Reminder Notifications',
        description: 'Time-sensitive reminders for your notes',
        importance: AndroidImportance.HIGH,
        sound: 'default',
        vibration: true,
        lights: true,
        // Category for handling even when the app is in deep sleep
        category: AndroidCategory.ALARM,
      });
    }
    
    // Generate a payload to identify the note when notification is pressed
    const payload = JSON.stringify({
      noteId: note.id,
      action: 'open_note'
    });
    
    // Schedule the notification with proper configurations
    await notifee.createTriggerNotification(
      {
        id: `reminder-${note.id}`,
        title: note.title || 'Reminder',
        body: note.content || 'You have a reminder',
        data: { payload, noteId: note.id },
        ios: {
          // iOS specific configuration
          sound: 'default',
          // Critical alerts bypass Do Not Disturb
          critical: true,
          criticalVolume: 1.0,
          // Keep showing the notification until manually dismissed
          relevanceScore: 1.0,
          // Badge the app icon
          badgeCount: 1,
          // Presentation options when app is in foreground
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
          // Configure the notification to launch the app
          launchImageName: 'notification_icon',
          // Set thread id for grouping similar notifications
          threadId: 'reminders',
          // Enable this to wake screen for critical alerts
          interruptionLevel: 'timeSensitive',
        },
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          // Configure notification to open app on press
          pressAction: {
            id: 'default',
            launchActivity: 'default',
          },
          // Custom actions
          actions: [
            {
              title: 'View',
              pressAction: {
                id: 'view',
                launchActivity: 'default',
              },
            },
          ],
          // Use small icon from Android resources
          smallIcon: 'ic_notification',
          // Wake up screen for important reminders
          fullScreenAction: {
            id: 'full_screen',
            launchActivity: 'default',
          },
          // Set the importance to high for priority
          importance: AndroidImportance.HIGH,
          // Prevent the notification from being swiped away
          ongoing: true,
        },
      },
      trigger,
    );
    
    console.log(`Scheduled reminder for note ${note.id} at ${reminderDate.toString()}`);
  }
  
  // Cancel a scheduled notification
  export async function cancelReminderNotification(noteId) {
    try {
      await notifee.cancelNotification(`reminder-${noteId}`);
      console.log(`Cancelled reminder for note ${noteId}`);
    } catch (error) {
      console.error('Failed to cancel notification:', error);
    }
  }
  
  // Check if any notifications need to be rescheduled (call this on app launch)
  export async function checkAndRescheduleNotifications(notes) {
    try {
      // Get all upcoming reminders
      const notesWithReminders = notes.filter(note => note.hasReminder && note.reminderDateTime);
      
      // Cancel all existing notifications first to avoid duplicates
      const displayedNotifications = await notifee.getDisplayedNotifications();
      for (const notification of displayedNotifications) {
        if (notification.id.startsWith('reminder-')) {
          await notifee.cancelNotification(notification.id);
        }
      }
      
      // Also check for any scheduled (but not yet displayed) notifications
      const scheduledNotifications = await notifee.getTriggerNotifications();
      for (const notification of scheduledNotifications) {
        if (notification.notification.id.startsWith('reminder-')) {
          await notifee.cancelTriggerNotification(notification.notification.id);
        }
      }
      
      // Reschedule all valid reminders
      for (const note of notesWithReminders) {
        // Only schedule if the date is in the future
        const reminderDate = new Date(note.reminderDateTime);
        if (reminderDate.getTime() > Date.now()) {
          await scheduleReminderNotification(note);
        }
      }
      
      // Reset badge count on iOS
      if (Platform.OS === 'ios') {
        await notifee.setBadgeCount(0);
      }
    } catch (error) {
      console.error('Error rescheduling notifications:', error);
    }
  }