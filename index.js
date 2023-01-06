/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ThemeProvider} from './components/Context/GlobalState';

const MainNavigator = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

AppRegistry.registerComponent(appName, () => MainNavigator);
