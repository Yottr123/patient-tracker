import React from 'react';
import {View, Text ,Image, StyleSheet} from 'react-native';
import Logo from '../assets/images/logo.jpg';

const Splash = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image style={[styles.logo, {marginBottom: 0}]} source={Logo} />
      {/* <Text style={styles.text}>Patient</Text>
      <Text style={styles.text}>Tracker</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 225,
    width: 225,
    borderRadius: 500,
  },
  text: {
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: 10
  },
});

export default Splash;