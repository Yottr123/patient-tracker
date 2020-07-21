import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

const Button = (props) => {
  return <TouchableOpacity {...props} style={[styles.button, props.style, props.block && { width: "100%" }]} />;
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    minWidth: 100,
    height: 45,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#01bad5'
  },
});
