import React from 'react';
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

import {addPatientRequest, updatePatientRequest} from '../../actions/Patients';

const patientSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Must be at least 2 characters long')
    .max(50, 'Must be at most 50 characters long')
    .required('Required'),
  disease: Yup.string()
    .min(2, 'Must be at least 2 characters long')
    .max(50, 'Must be at most 50 characters long')
    .required('Required'),
  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Invalid phone number',
    )
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address: Yup.string()
    .min(2, 'Must be at least 2 characters long')
    .max(100, 'Must be at most 100 characters long')
    .required('Required'),
});

const AddPatient = (props) => {
  const {
    navigation,
    route,
    patients: {loading},
  } = props;

  const edit = route.name === 'EditPatient';

  const formik = useFormik({
    initialValues: route.params
      ? {
        ...route.params.patient
      }
      : {
          name: '',
          disease: '',
          phone: '',
          email: '',
          address: '',
        },
    validationSchema: patientSchema,
    onSubmit: (values) => {
      let action = edit ? props.updatePatientRequest : props.addPatientRequest;

      action(values, () => {
        // formik.resetForm({
        //   name: '',
        //   disease: '',
        //   phone: '',
        //   email: '',
        //   address: '',
        // });

        navigation.navigate('Patients');
      });
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={[styles.subheading, {marginTop: 20}]}>
          {edit ? 'Change patient details' : 'Fill in the patient details'}
        </Text>
        <Input
          placeholder="Name"
          style={[styles.content, {marginTop: 30}]}
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
        />
        {formik.errors.name && formik.touched.name && (
          <Text style={[styles.content, styles.error]}>
            {formik.errors.name}
          </Text>
        )}
        <Input
          placeholder="Disease"
          style={[styles.content, {marginTop: 15}]}
          value={formik.values.disease}
          onChangeText={formik.handleChange('disease')}
          onBlur={formik.handleBlur('disease')}
        />
        {formik.errors.disease && formik.touched.disease && (
          <Text style={[styles.content, styles.error]}>
            {formik.errors.disease}
          </Text>
        )}
        <Input
          placeholder="Phone"
          style={[styles.content, {marginTop: 15}]}
          value={formik.values.phone}
          onChangeText={formik.handleChange('phone')}
          onBlur={formik.handleBlur('phone')}
        />
        {formik.errors.phone && formik.touched.phone && (
          <Text style={[styles.content, styles.error]}>
            {formik.errors.phone}
          </Text>
        )}
        <Input
          placeholder="Email"
          style={[styles.content, {marginTop: 15}]}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
        />
        {formik.errors.email && formik.touched.email && (
          <Text style={[styles.content, styles.error]}>
            {formik.errors.email}
          </Text>
        )}
        <Input
          placeholder="Address"
          style={[styles.content, {marginTop: 15}]}
          value={formik.values.address}
          onChangeText={formik.handleChange('address')}
          onBlur={formik.handleBlur('address')}
        />
        {formik.errors.address && formik.touched.address && (
          <Text style={[styles.content, styles.error]}>
            {formik.errors.address}
          </Text>
        )}
        {!loading.addPatient && !loading.updatePatient ? (
          <Button
            onPress={formik.handleSubmit}
            style={[styles.content, {marginTop: 30}]}>
            <Text style={{color: 'white'}}>Save</Text>
          </Button>
        ) : (
          <ActivityIndicator
            size="large"
            color="#4eb6bb"
            style={{marginTop: 30}}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default connect((state) => ({patients: state.Patients}), {
  addPatientRequest,
  updatePatientRequest,
})(AddPatient);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    overflow: 'visible',
  },
  content: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '700',
  },
  error: {
    //width: "100%",
    textAlign: 'left',
    color: 'red',
    marginTop: 10,
  },
});
