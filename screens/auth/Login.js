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

import {loginRequest} from '../../actions/Auth';

const loginSchema = Yup.object().shape({
  // firstName: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    //.min(6, "Password must be at least 6 characters long")
    .required('Required'),
});

const Login = (props) => {
  const {
    navigation,
    auth: {loading},
  } = props;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      props.loginRequest(values.email, values.password);
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View
          style={{
            //marginBottom: 40,
          }}>
          <Image source={Logo} style={styles.imageStyle} />
        </View>
        <Text style={[styles.subheading, { marginTop: 20 }]}>
          Login to your account
        </Text>
        <Input placeholder="Email" style={[styles.content, { marginTop: 30 }]} value={formik.values.email} onChangeText={formik.handleChange("email")} onBlur={formik.handleBlur("email")} />
        {formik.errors.email && formik.touched.email && (
          <Text style={[styles.content, styles.error]}>{formik.errors.email}</Text>
        )}
        <Input placeholder="Password" style={[styles.content, {marginTop: 15}]} secureTextEntry={true} value={formik.values.password} onChangeText={formik.handleChange("password")} onBlur={formik.handleBlur("password")} />
        {formik.errors.password && formik.touched.password && (
          <Text style={[styles.content, styles.error]}>{formik.errors.password}</Text>
        )}
        {!loading.login ? (
          <Button
            onPress={formik.handleSubmit}
            style={[styles.content, {marginTop: 30}]}>
            <Text style={{ color: "white" }}>Login</Text>
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
          onPress={() => navigation.navigate('Signup')}>
          Don't have an account?
        </Text>
      </View>
    </ScrollView>
  );
};

export default connect((state) => ({auth: state.Auth}), {loginRequest})(Login);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    //paddingRight: 20,
    //paddingLeft: 20
    //padding: 40
  },
  content: {
    alignSelf: "stretch",
    marginHorizontal: 20
  },
  imageStyle: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  subheading: {
    fontSize: 25, 
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
