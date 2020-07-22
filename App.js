/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, TouchableOpacity, Text, AsyncStorage} from 'react-native';

import {MenuProvider} from 'react-native-popup-menu';

import Splash from './screens/Splash';

import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';

import Patients from './screens/dashboard/Patients';
import AddPatient from './screens/dashboard/AddPatient';

import {setUserToken, logout} from './actions/Auth';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const MainStack = createStackNavigator();

const App = (props) => {
  const [gotToken, setGotToken] = useState(false);
  const [splashTimer, setSplashTimer] = useState(true);

  React.useEffect(() => {
    //alert("MOUNT")
    setTimeout(() => {
      setSplashTimer(false);
    }, 3000);

    AsyncStorage.getItem('userToken').then((token) => {
      props.setUserToken(token);
      setGotToken(true);
    });
    return () => {
      //alert("UNMOUNT")
    };
  }, []);

  const {userToken: isAuthenticated} = props.auth;
  return (
    <MenuProvider>
      <NavigationContainer>
        {splashTimer || !gotToken ? (
          <Splash />
        ) : !isAuthenticated ? (
          <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen
              name="Login"
              component={Login}
              options={{
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
                <TouchableOpacity onPress={props.logout}>
                  <Text style={styles.logout}>LOGOUT</Text>
                </TouchableOpacity>
              ),
            }}>
            <MainStack.Screen name="Patients" component={Patients} />
            <MainStack.Screen
              name="AddPatient"
              component={AddPatient}
              options={{
                title: 'Add Patient',
              }}
            />
            <MainStack.Screen
              name="EditPatient"
              component={AddPatient}
              options={{
                title: 'Edit Patient',
              }}
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
