// ContextMenuComponent.js
import React from 'react';
import { Image } from 'react-native';
import ContextMenu from 'react-native-context-menu-view';

const ContextMenuComponent = () => {
  return (
    <ContextMenu
      actions={[
        { title: 'Profile' },
        { title: 'Settings' },
        { title: 'Logout' },
      ]}
      onPress={(event) => {
        if (event.nativeEvent.name === 'Profile') {
          // Handle Profile action
        } else if (event.nativeEvent.name === 'Settings') {
          // Handle Settings action
        } else if (event.nativeEvent.name === 'Logout') {
          // Handle Logout action
        }
      }}
    >
      <Image style={styles.profileIcon} source={require('../Assets/person.crop.circle.png')} />
    </ContextMenu>
  );
};

const styles = {
  profileIcon: {
    // Your styles here
  },
};

export default ContextMenuComponent;