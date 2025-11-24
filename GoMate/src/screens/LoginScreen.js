import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useTheme } from '../context/ThemeContext';

const loginValidationSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required('Email Address is Required'),
  password: yup.string().required('Password is required'),
});

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { theme, themeColors } = useTheme();

  const handleLogin = (values) => {
    console.log('Login credentials:', values);
    const dummyUser = { name: 'Imalsha', email: values.email }; 
    dispatch(login(dummyUser));
  };
  
  const SocialButton = ({ icon, text }) => (
    <TouchableOpacity style={[styles.socialButton, {backgroundColor: themeColors.card, borderColor: themeColors.border}]}>
        <Ionicons name={icon} size={22} color={themeColors.text} />
        <Text style={[styles.socialButtonText, {color: themeColors.text}]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: themeColors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
              <Ionicons name="compass-outline" size={32} color={themeColors.primary} />
              <Text style={[styles.logoText, {color: themeColors.text}]}>GoMate</Text>
          </View>

          <Text style={[styles.title, {color: themeColors.text}]}>Welcome Back</Text>
          <Text style={[styles.subtitle, {color: themeColors.textSecondary}]}>Log in to continue your journey.</Text>

          <Formik
              validationSchema={loginValidationSchema}
              initialValues={{ email: '', password: '' }}
              onSubmit={handleLogin}
          >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                  <Text style={[styles.label, {color: themeColors.textSecondary}]}>Email</Text>
                  <View style={[styles.inputContainer, {backgroundColor: themeColors.card, borderColor: themeColors.border}]}>
                      <Ionicons name="mail-outline" size={22} color={themeColors.icon} style={styles.inputIcon} />
                      <TextInput
                          name="email"
                          placeholder="Enter your email address"
                          placeholderTextColor={themeColors.textSecondary}
                          style={[styles.input, {color: themeColors.text}]}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          keyboardType="email-address"
                          autoCapitalize="none"
                      />
                  </View>
                  {(errors.email && touched.email) && <Text style={styles.errorText}>{errors.email}</Text>}

                  <Text style={[styles.label, {color: themeColors.textSecondary}]}>Password</Text>
                  <View style={[styles.inputContainer, {backgroundColor: themeColors.card, borderColor: themeColors.border}]}>
                      <Ionicons name="lock-closed-outline" size={22} color={themeColors.icon} style={styles.inputIcon} />
                      <TextInput
                          name="password"
                          placeholder="Enter your password"
                          placeholderTextColor={themeColors.textSecondary}
                          style={[styles.input, {color: themeColors.text}]}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color={themeColors.icon} />
                      </TouchableOpacity>
                  </View>
                   {(errors.password && touched.password) && <Text style={styles.errorText}>{errors.password}</Text>}

                  <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}><Text style={[styles.forgotPassword, {color: themeColors.primary}]}>Forgot Password?</Text></TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.loginButton, {backgroundColor: themeColors.primary}]} onPress={handleSubmit}>
                      <Text style={styles.loginButtonText}>Log In</Text>
                  </TouchableOpacity>
              </View>
              )}
          </Formik>

          <View style={styles.dividerContainer}>
              <View style={[styles.dividerLine, {backgroundColor: themeColors.border}]} />
              <Text style={[styles.dividerText, {color: themeColors.textSecondary}]}>or</Text>
              <View style={[styles.dividerLine, {backgroundColor: themeColors.border}]} />
          </View>
          
          <SocialButton icon="logo-google" text="Continue with Google" />
          <SocialButton icon="logo-apple" text="Continue with Apple" />

           <View style={styles.registerContainer}>
              <Text style={[styles.registerPrompt, {color: themeColors.textSecondary}]}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.registerText, {color: themeColors.primary}]}>Sign Up</Text>
              </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { 
        flexGrow: 1, 
        justifyContent: 'center', 
        paddingHorizontal: 25, 
        paddingVertical: 20,
    },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 40 
    },
    logoText: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginLeft: 8 
    },
    title: { 
        fontSize: 32, 
        fontWeight: 'bold', 
        marginBottom: 8, 
        textAlign: 'center' 
    },
    subtitle: { 
        fontSize: 16, 
        marginBottom: 30, 
        textAlign: 'center' 
    },
    form: { width: '100%' },
    label: { fontSize: 14, marginBottom: 8 },
    inputContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        borderRadius: 8, 
        paddingHorizontal: 14, 
        borderWidth: 1 
    },
    inputIcon: { marginRight: 10 },
    input: { 
        flex: 1, 
        paddingVertical: 14, 
        fontSize: 16 
    },
    errorText: { 
        fontSize: 12, 
        color: '#ef4444', 
        marginTop: 6, 
        marginLeft: 5 
    },
    forgotPassword: { 
        textAlign: 'right', 
        marginTop: 15, 
        fontWeight: '600' 
    },
    loginButton: { 
        padding: 16, 
        borderRadius: 8, 
        alignItems: 'center', 
        marginTop: 25 
    },
    loginButtonText: { 
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
    dividerContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: 30 
    },
    dividerLine: { 
        flex: 1, 
        height: 1 
    },
    dividerText: { marginHorizontal: 10 },
    socialButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 15, 
        borderRadius: 8, 
        marginBottom: 15, 
        borderWidth: 1 
    },
    socialButtonText: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        marginLeft: 12 
    },
    registerContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 20 
    },
    registerPrompt: { },
    registerText: { fontWeight: 'bold' },
});
