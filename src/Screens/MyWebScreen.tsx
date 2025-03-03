import React from 'react';
import { WebView } from 'react-native-webview';

const MyWebScreen = () => {
  return (
    <WebView
      source={{ uri: 'https://support.google.com/keep/?hl=en#topic=6262468' }}
      style={{ flex: 1 }}
    />
  );
};

export default MyWebScreen;