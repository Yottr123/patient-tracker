import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FAB = (props) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        //borderWidth: 1,
        //borderColor: 'rgba(0,0,0,0.2)',
        zIndex: 11,
        alignItems: 'center',
        justifyContent: 'center',
        width: 65,
        position: 'absolute',
        bottom: 20,
        right: 20,
        height: 65,
        backgroundColor: '#01bad5',
        borderRadius: 100,

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 4,
      }}>
      <Icon name="add" size={35} color="white" />
    </TouchableOpacity>
  );
};

export default FAB;
