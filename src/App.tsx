import React from 'react';
import Navigator from './Navigation/Navigator';
import { NoteProvider } from './logic/NoteContext';
// import Settings from './Screens/Settings';

const App = () => {
  return (
    <NoteProvider>
      <Navigator />
    </NoteProvider>
  );
};

export default App;
