import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const resetPasswordValidationSchema = yup.object().shape({
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Confirm password is required'),
});

export default function ResetPasswordScreen({ route, navigation }) {
  const { token } = route.params; // The token would be passed via deep link
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { themeColors } = useTheme();

  const handleResetPassword = (values) => {
    console.log('Password reset for token:', token, 'with new password:', values.password);
    Alert.alert(
      "Password Reset",
      "Your password has been successfully reset. Please log in with your new password.",
      [{ text: "OK", onPress: () => navigation.navigate('Login') }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={styles.contentContainer}>
            <Text style={[styles.title, { color: themeColors.text }]}>Reset Password</Text>
            <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>Create a new, strong password for your account.</Text>

            <Formik
                validationSchema={resetPasswordValidationSchema}
                initialValues={{ password: '', confirmPassword: '' }}
                onSubmit={handleResetPassword}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.form}>
                    <Text style={[styles.label, { color: themeColors.textSecondary }]}>New Password</Text>
                    <View style={[styles.inputContainer, { backgroundColor: themeColors.card, borderColor: themeColors.border }, errors.password && touched.password && styles.errorBorder]}>
                        <TextInput
                            placeholder="Enter new password"
                            placeholderTextColor={themeColors.textSecondary}
                            style={[styles.input, { color: themeColors.text }]}
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

                    <Text style={[styles.label, { color: themeColors.textSecondary }]}>Confirm New Password</Text>
                     <View style={[styles.inputContainer, { backgroundColor: themeColors.card, borderColor: themeColors.border }, errors.confirmPassword && touched.confirmPassword && styles.errorBorder]}>
                        <TextInput
                            placeholder="Confirm your new password"
                            placeholderTextColor={themeColors.textSecondary}
                            style={[styles.input, { color: themeColors.text }]}
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
                    
                    <TouchableOpacity style={[styles.resetButton, { backgroundColor: themeColors.primary }]} onPress={handleSubmit}>
                        <Text style={styles.resetButtonText}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
                )}
            </Formik>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentContainer: { flex: 1, justifyContent: 'center', paddingHorizontal: 25 },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
    subtitle: { fontSize: 16, marginBottom: 40 },
    form: { width: '100%' },
    label: { fontSize: 14, marginBottom: 8, marginTop: 15 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingHorizontal: 14, borderWidth: 1 },
    input: { flex: 1, paddingVertical: 14, fontSize: 16 },
    errorBorder: { borderColor: '#ef4444' },
    errorText: { fontSize: 12, color: '#ef4444', marginTop: 6, marginLeft: 5 },
    resetButton: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 30 },
    resetButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
