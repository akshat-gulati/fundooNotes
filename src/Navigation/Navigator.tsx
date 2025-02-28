import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Label from '../Screens/Label';
import Notes from '../Screens/Notes';
import Reminders from '../Screens/Reminders';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawerContent from './CustomDrawerContent';
import Archive from '../Screens/Archive';
import Bin from '../Screens/Bin';
import Settings from '../Screens/Settings';
import Feedback from '../Screens/Feedback';
import Help from '../Screens/Help';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: '#2F2F34'}}}
    >
      <Drawer.Screen name="Home" component={Notes} />
      <Drawer.Screen name="Reminders" component={Reminders} />
      <Drawer.Screen name="Label" component={Label} />
      <Drawer.Screen name="Archive" component={Archive} />
      <Drawer.Screen name="Bin" component={Bin} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="Help" component={Help} />
    </Drawer.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default Navigator;
