import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Card from "../../components/card";
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';


const PatientCard = (props) => {
  return (
    <Card>
      <Menu style={styles.context}>
        <MenuTrigger>
          <Icon name="ellipsis-horizontal" size={20} color="black" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => alert(`Delete`)} >
            <Text style={{color: 'red'}}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
      <View style={styles.container}>
        <Text style={styles.name}>
          Mark Romano
        </Text>
        <Text style={styles.info}>
          Flu
        </Text>
        <Text style={styles.info}>
          0312-1241242
        </Text>
        <Text style={styles.info}>
          abcdefg@gmail.com
        </Text>
        <Text style={styles.info}>
          12-asd 512/22 Karachi, Pakistan
        </Text>
      </View>
    </Card>
  );
};

export default PatientCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    alignContent: "flex-end",
    flexWrap: "wrap",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    width: "100%"
  },
  info: {
    color: "#a1a1a1",
    fontSize: 14,
    fontWeight: "400",
    width: "100%"
  },
  context: {
    position: "absolute",
    top: 10,
    right: 10
  }
});