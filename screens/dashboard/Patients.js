import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Input from '../../components/input';
import Button from '../../components/button';
import FAB from '../../components/fab';

import PatientCard from '../../appcomponents/patients/PatientCard';

import {useFormik} from 'formik';
import * as Yup from 'yup';

import Logo from '../../assets/images/logo.jpg';

import {loginRequest} from '../../actions/Auth';

const loginSchema = Yup.object().shape({
  // firstName: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Required'),
});

const Patients = (props) => {
  const {
    navigation,
    auth: {loading},
  } = props;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      props.loginRequest(values.email, values.password);
    },
  });

  return (
    <View style={styles.container}>
      <FAB />
      {/* <Text style={[styles.subheading, {marginTop: 20}]}>
          Login to your account
        </Text> */}
      <Input block placeholder="Search by name" />
      <DatePicker
        style={{
          width: '100%',
          marginTop: 15,
        }}
        customStyles={{
          dateInput: {
            borderColor: '#01bad5',
            backgroundColor: "white",
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
        //date={date}
        mode="date"
        placeholder="Search by date"
        format="DD-MMM-YYYY"
        //onDateChange={(date) => seDate(date)}
      />

      <FlatList
        style={{marginTop: 30, width: "100%", clipToPadding: "false"}}
        data={[1, 2]}
        renderItem={({item, index}) => <PatientCard />}
        ItemSeparatorComponent={() => (
          <View style={{height: 15}} />
        )}
        keyExtractor={(item, index) => index + ""}
      />
    </View>
  );
};

export default connect((state) => ({auth: state.Auth}), {loginRequest})(
  Patients,
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    overflow: "visible",

    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 30,
    //padding: 40
  },
  imageStyle: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  listItem: {
    marginTop: 7.5,
    marginBottom: 7.5
  },
  subheading: {
    fontSize: 25,
  },
  // error: {
  //   width: 300,
  //   textAlign: "left",
  //   color: 'red',
  //   marginTop: 10
  // },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
});
