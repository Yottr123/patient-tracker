import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';


const Card = (props) => {
  return (
    <TouchableOpacity {...props} style={[styles.card, props.style]} />
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    
    backgroundColor: "white",

    minHeight: 100,
    width: "100%",
    padding: 10,
  },
});