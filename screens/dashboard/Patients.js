import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {useFocusEffect} from '@react-navigation/native';
import Input from '../../components/input';
import FAB from '../../components/fab';
import moment from 'moment';

import PatientCard from '../../appcomponents/patients/PatientCard';

import {
  startPatientBackgroundJob,
  stopPatientBackgroundJob,
} from '../../actions/Patients';

const Patients = (props) => {
  const {
    navigation,
    route,
    patients,
    patients: {loading},
  } = props;

  const [search, setSearch] = useState('');
  const [date, setDate] = useState(undefined);

  console.log('PATIENTS', patients, route);

  const patientList = patients.patients.filter(
    patient =>
      patient.name.toLowerCase().includes(search.toLowerCase()) &&
      (date
        ? moment(patient.createdAt).isSame(moment(date, 'DD-MM-YYYY'), 'day')
        : true),
  );

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      //alert("FOCUS")
      //console.log("FOCUS", navigation, route)
      props.startPatientBackgroundJob();

      return () => {
        //alert("UNFOCUS")
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        props.stopPatientBackgroundJob();
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <FAB onPress={() => navigation.navigate('AddPatient')} />
      {/* <Text style={[styles.subheading, {marginTop: 20}]}>
          Login to your account
        </Text> */}
      <Input style={styles.content} block placeholder="Search by name" value={search} onChangeText={setSearch} />
      <DatePicker
        style={[
          styles.content,
          {
            width: 'auto',
            marginTop: 15,
          },
        ]}
        customStyles={{
          dateInput: {
            borderColor: '#01bad5',
            backgroundColor: 'white',
            borderRadius: 8,
            width: '100%',
            borderWidth: 1,
            height: 45,
            alignItems: 'flex-start',
            padding: 10,
          },
          dateIcon: {
            position: 'absolute',
            right: 0,
          },
          placeholderText: {
            color: '#a7a7a7',
            textAlign: 'left',
            fontSize: 14,
          },
          dateTouchBody: {
            textAlign: 'left',
            //height: 45
          },
        }}
        date={date}
        mode="date"
        placeholder="Search by date"
        format="DD-MM-YYYY"
        onDateChange={setDate}
      />

      {!loading.patients || patientList.length ? (
        <FlatList
          style={{marginTop: 20}}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 10,
          }}
          data={patientList}
          renderItem={({item, index}) => <PatientCard patient={item} />}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Text style={styles.subheading}>No Patients Found</Text>
            </View>
          )}
          keyExtractor={(item, index) => index + ''}
        />
      ) : (
        <View style={[styles.emptyState, {marginTop: 30}]}>
          <ActivityIndicator
            size={50}
            color="#4eb6bb"
            //style={{marginTop: 30}}
          />
        </View>
      )}
    </View>
  );
};

export default connect((state) => ({patients: state.Patients}), {
  startPatientBackgroundJob,
  stopPatientBackgroundJob,
})(Patients);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
    paddingTop: 30,
  },
  content: {
    marginHorizontal: 20,
  },
  emptyState: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subheading: {
    fontSize: 20,
  },
});
