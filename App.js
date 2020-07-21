/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {MenuProvider} from 'react-native-popup-menu';

import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';

import Patients from './screens/dashboard/Patients';

import {setUserToken, logout} from './actions/Auth';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const MainStack = createStackNavigator();

const App = (props) => {
  React.useEffect(() => {
    //alert("MOUNT")
    AsyncStorage.getItem('userToken').then((token) => {
      props.setUserToken(token);
    });
    return () => {
      //alert("UNMOUNT")
    };
  });

  const {userToken: isAuthenticated} = props.auth;
  return (
    <MenuProvider>
      <NavigationContainer>
        {!isAuthenticated ? (
          <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen
              name="Login"
              component={Login}
              options={{
                // title: ' Please Login to Continue',
                // headerStyle: {
                //   backgroundColor: '#4eb6bb',
                // },
                // headerTintColor: '#fff',
                // headerTitleStyle: {
                //   fontWeight: 'bold',
                // },
                headerShown: false,
              }}
            />
            <MainStack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
          </MainStack.Navigator>
        ) : (
          <MainStack.Navigator
            initialRouteName="Patients"
            screenOptions={{
              headerRight: () => (
                <Text style={styles.logout} onPress={props.logout}>
                  LOGOUT
                </Text>
              ),
            }}>
            <MainStack.Screen
              name="Patients"
              component={Patients}
              options={
                {
                  //headerShown: false,
                }
              }
            />
          </MainStack.Navigator>
        )}
      </NavigationContainer>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  logout: {
    color: 'red',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
  },
});

export default connect((state) => ({auth: state.Auth}), {setUserToken, logout})(
  App,
);
