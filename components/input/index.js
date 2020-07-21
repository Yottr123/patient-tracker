import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = (props) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style, props.block && { width: "100%" }]}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    color: 'black',
    width: 300,
    minWidth: 200,
    height: 45,
    borderWidth: 1,
    borderColor: '#01bad5',
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
});