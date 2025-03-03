import React from 'react';
import notifee from '@notifee/react-native';

export async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Display a notification
    await notifee.displayNotification({
        title: "Notification title",
        body: "This is the notification body",
        ios: {
            sound: 'chime',
            foregroundPresentationOptions: {
                badge: true,
                sound: true,
            },
        },
    });
}