import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import Input from '../../components/input';
import Button from '../../components/button';

import { useFormik } from "formik";
import * as Yup from 'yup';

import Logo from '../../assets/images/logo.jpg';

import {signUpRequest} from '../../actions/Auth';

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be at most 50 characters long')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required('Required'),
});

const Login = (props) => {
  const {
    navigation,
    auth: {loading},
  } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: signupSchema,
    onSubmit: values => {
      props.signUpRequest(values.name, values.email, values.password, () => {
        formik.resetForm({
          name: '',
          email: '',
          password: ''
        });
        navigation.navigate("Login")
      });
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* <View
          style={{
            marginBottom: 50,
          }}>
          <Image source={Logo} style={styles.imageStyle} />
        </View> */}
        <Text style={styles.heading}>
          Signup
        </Text>
        <Text style={[styles.subheading, { marginTop: 10 }]}>
          Let's create an account
        </Text>
        <Input block placeholder="Name" style={{marginTop: 30}} value={formik.values.name} onChangeText={formik.handleChange("name")} onBlur={formik.handleBlur("name")} />
        {formik.errors.name && formik.touched.name && (
          <Text style={styles.error}>{formik.errors.name}</Text>
        )}
        <Input block placeholder="Email" style={{marginTop: 15}} value={formik.values.email} onChangeText={formik.handleChange("email")} onBlur={formik.handleBlur("email")} />
        {formik.errors.email && formik.touched.email && (
          <Text style={styles.error}>{formik.errors.email}</Text>
        )}
        <Input block placeholder="Password" style={{marginTop: 15}} secureTextEntry={true} value={formik.values.password} onChangeText={formik.handleChange("password")} onBlur={formik.handleBlur("password")} />
        {formik.errors.password && formik.touched.password && (
          <Text style={styles.error}>{formik.errors.password}</Text>
        )}
        {!loading.signup ? (
          <Button
            block
            onPress={formik.handleSubmit}
            style={{marginTop: 30}}>
            <Text style={{ color: "white" }}>Sign up</Text>
          </Button>
        ) : (
          <ActivityIndicator
            size="large"
            color="#4eb6bb"
            style={{marginTop: 30}}
          />
        )}
        <Text
          style={[styles.link, {marginTop: 15}]}
          onPress={() => navigation.navigate('Login')}>
          Already have an account?
        </Text>
      </View>
    </ScrollView>
  );
};

export default connect((state) => ({auth: state.Auth}), {signUpRequest})(Login);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 40,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    paddingRight: 20,
    paddingLeft: 20
    //padding: 40
  },
  imageStyle: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  subheading: {
    fontSize: 25, 
  },
  heading: {
    fontSize: 60, 
    fontWeight: "700"
  },
  error: {
    width: "100%",
    textAlign: "left",
    color: 'red',
    marginTop: 10
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
});
