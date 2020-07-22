import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Card from '../../components/card';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {deletePatientRequest} from '../../actions/Patients';

const PatientCard = (props) => {
  const {name, disease, phone, email, address, id} = props.patient || {};
  const navigation = useNavigation();
  return (
    <Card>
      <Menu style={styles.context}>
        <MenuTrigger>
          {/* <TouchableOpacity> */}
          <Icon name="ellipsis-horizontal" size={20} color="black" />
          {/* </TouchableOpacity> */}
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {width: 100, borderRadius: 4},
            optionWrapper: {padding: 10},
          }}>
          <MenuOption
            onSelect={() =>
              navigation.navigate('EditPatient', {patient: props.patient})
            }>
            <Text style={{color: 'black'}}>Edit</Text>
          </MenuOption>
          <MenuOption
            customStyles={{
              optionWrapper: {
                borderTopWidth: 1,
                borderColor: '#f8f8f8',
                padding: 10,
              },
            }}
            onSelect={() => {
              Alert.alert('', 'Are you sure you want to delete this patient?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => props.deletePatientRequest(id),
                },
              ]);
            }}>
            <Text style={{color: 'red'}}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.info}>{disease}</Text>
        <Text style={styles.info}>{phone}</Text>
        <Text style={styles.info}>{email}</Text>
        <Text style={styles.info}>{address}</Text>
      </View>
    </Card>
  );
};

export default connect(null, {deletePatientRequest})(PatientCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    width: '100%',
  },
  info: {
    color: '#a1a1a1',
    fontSize: 14,
    fontWeight: '400',
    width: '100%',
  },
  context: {
    zIndex: 10,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
