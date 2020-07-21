/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

export const Main = () => {
  return (
    <Provider store={store}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#01bad5" /> */}
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Main);