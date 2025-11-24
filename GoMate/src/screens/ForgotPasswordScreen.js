import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const resetPasswordValidationSchema = yup.object().shape({
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

const PasswordRequirement = ({ met, text }) => {
    const { themeColors } = useTheme();
    return (
        <View style={styles.requirementRow}>
            <Ionicons name={met ? "checkmark-circle" : "ellipse-outline"} size={20} color={met ? themeColors.success : themeColors.textSecondary} />
            <Text style={[styles.requirementText, { color: met ? themeColors.success : themeColors.textSecondary }]}>{text}</Text>
        </View>
    );
}

export default function ForgotPasswordScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme, themeColors } = useTheme();

  const handleResetPassword = (values) => {
    console.log('New password set:', values.password);
    Alert.alert(
      "Password Reset Successful",
      "You can now log in with your new password.",
      [{ text: "OK", onPress: () => navigation.navigate('Login') }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: themeColors.background}]}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={themeColors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, {color: themeColors.text}]}>Reset Password</Text>
            <View style={{width: 24}}/>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={[styles.title, {color: themeColors.text}]}>Create new password</Text>
            <Text style={[styles.subtitle, {color: themeColors.textSecondary}]}>Your new password must be different from previous used passwords.</Text>

            <Formik
                validationSchema={resetPasswordValidationSchema}
                initialValues={{ password: '', confirmPassword: '' }}
                onSubmit={handleResetPassword}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => {
                    const hasMinLength = values.password.length >= 6;

                    return (
                        <View style={styles.form}>
                            <Text style={[styles.label, {color: themeColors.textSecondary}]}>New Password</Text>
                            <View style={[styles.inputContainer, {backgroundColor: themeColors.card, borderColor: themeColors.border}, errors.password && touched.password && styles.errorBorder]}>
                                <TextInput
                                    placeholder="••••••••••••"
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

                            <Text style={[styles.label, {color: themeColors.textSecondary}]}>Confirm New Password</Text>
                            <View style={[styles.inputContainer, {backgroundColor: themeColors.card, borderColor: themeColors.border}, errors.confirmPassword && touched.confirmPassword && styles.errorBorder]}>
                                <TextInput
                                    placeholder="••••••••••••"
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

                            <View style={styles.requirementsContainer}>
                                <PasswordRequirement met={hasMinLength} text="Minimum 6 characters" />
                            </View>

                            <TouchableOpacity style={[styles.resetButton, {backgroundColor: themeColors.primary}, !isValid && styles.disabledButton]} onPress={handleSubmit} disabled={!isValid}>
                                <Text style={[styles.resetButtonText, {color: theme === 'dark' ? '#fff' : '#fff'}]}>Reset Password</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            </Formik>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    contentContainer: { paddingHorizontal: 25, paddingTop: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
    subtitle: { fontSize: 16, marginBottom: 30 },
    form: { width: '100%' },
    label: { fontSize: 14, marginBottom: 8, marginTop: 15 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingHorizontal: 14, borderWidth: 1 },
    input: { flex: 1, paddingVertical: 14, fontSize: 16 },
    errorBorder: { borderColor: '#ef4444' },
    errorText: { fontSize: 12, color: '#ef4444', marginTop: 6, marginLeft: 5 },
    requirementsContainer: { marginTop: 25 },
    requirementRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    requirementText: { fontSize: 14, marginLeft: 10 },
    resetButton: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 30 },
    disabledButton: { backgroundColor: '#334155' },
    resetButtonText: { fontSize: 18, fontWeight: 'bold' },
});
