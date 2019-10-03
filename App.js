import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from './src/screens/Login'
import Acceleration from './src/screens/Acceleration';
import Profile from './src/screens/Profile';

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login
  },
  Acceleration: {
    screen: Acceleration
  },
  Profile: {
    screen: Profile
  }
}, {
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);
