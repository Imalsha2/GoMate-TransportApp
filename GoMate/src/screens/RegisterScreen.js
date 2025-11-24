import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const registerValidationSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required('Email is required'),
  password: yup.string().min(8, ({ min }) => `Password must be at least ${min} characters`).required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Confirm password is required'),
});

export default function RegisterScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme, themeColors } = useTheme();

  const handleRegister = (values) => {
    console.log(values);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: themeColors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.logoContainer, {backgroundColor: themeColors.primary}]}>
              <Ionicons name="rocket-outline" size={32} color={themeColors.background} />
          </View>
          <Text style={[styles.title, {color: themeColors.text}]}>Create Your Account</Text>
          <Text style={[styles.subtitle, {color: themeColors.textSecondary}]}>Start planning your next journey with us.</Text>
        </View>

        <Formik
          validationSchema={registerValidationSchema}
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
                <Text style={[styles.label, {color: themeColors.textSecondary}]}>Email</Text>
                <View style={[styles.inputContainer, {backgroundColor: themeColors.card, borderColor: themeColors.border}, errors.email && touched.email && styles.errorBorder]}>
                    <TextInput
                        placeholder="Enter your email"
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
                <View style={[styles.inputContainer, {backgroundColor: themeColors.card, borderColor: themeColors.border}, errors.password && touched.password && styles.errorBorder]}>
                    <TextInput
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

                <Text style={[styles.label, {color: themeColors.textSecondary}]}>Confirm Password</Text>
                <View style={[styles.inputContainer, {backgroundColor: themeColors.card, borderColor: themeColors.border}, errors.confirmPassword && touched.confirmPassword && styles.errorBorder]}>
                    <TextInput
                        placeholder="Confirm your password"
                        placeholderTextColor={themeColors.textSecondary}
                        style={[styles.input, {color: themeColors.text}]}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={22} color={themeColors.icon} />
                    </TouchableOpacity>
                </View>
              {(errors.confirmPassword && touched.confirmPassword) && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

              <TouchableOpacity style={[styles.signUpButton, {backgroundColor: themeColors.primary}]} onPress={handleSubmit}>
                <Text style={[styles.signUpButtonText, {color: theme === 'dark' ? '#fff' : '#fff'}]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <Text style={[styles.footerText, {color: themeColors.textSecondary}]}>
            By signing up, you agree to our <Text style={[styles.linkText, {color: themeColors.primary}]}>Terms of Service</Text> and <Text style={[styles.linkText, {color: themeColors.primary}]}>Privacy Policy</Text>.
        </Text>

        <View style={styles.loginContainer}>
          <Text style={[styles.loginPrompt, {color: themeColors.textSecondary}]}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginText, {color: themeColors.primary}]}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 25, paddingVertical: 40 },
  header: { alignItems: 'center', marginBottom: 40 },
  logoContainer: { width: 60, height: 60, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center' },
  form: { width: '100%' },
  label: { fontSize: 14, marginBottom: 8, marginTop: 15 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingHorizontal: 14, borderWidth: 1 },
  input: { flex: 1, paddingVertical: 14, fontSize: 16 },
  errorBorder: { borderColor: '#ef4444' },
  errorText: { fontSize: 12, color: '#ef4444', marginTop: 6, marginLeft: 5 },
  signUpButton: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  signUpButtonText: { fontSize: 18, fontWeight: 'bold' },
  footerText: { textAlign: 'center', marginTop: 30, fontSize: 12, paddingHorizontal: 20 },
  linkText: { textDecorationLine: 'underline' },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  loginPrompt: { },
  loginText: { fontWeight: 'bold' },
});
