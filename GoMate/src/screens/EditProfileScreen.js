import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';

export default function EditProfileScreen({ navigation }) {
    const { user } = useSelector(state => state.auth);
    const { themeColors } = useTheme();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    const handleSaveChanges = () => {
        Alert.alert("Profile Updated", "Your changes have been saved successfully.");
        navigation.goBack();
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={themeColors.text} /></TouchableOpacity>
                <Text style={[styles.headerTitle, { color: themeColors.text }]}>Edit Profile</Text>
                <View style={{width: 24}}/>
            </View>

            <View style={styles.content}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Ionicons name="person-circle" size={120} color={themeColors.textSecondary} />
                    <View style={[styles.editIcon, { backgroundColor: themeColors.primary }]}><Ionicons name="camera-outline" size={20} color={themeColors.background} /></View>
                </TouchableOpacity>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: themeColors.textSecondary }]}>Full Name</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.text }]}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your full name"
                        placeholderTextColor={themeColors.textSecondary}
                    />
                </View>
                 <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: themeColors.textSecondary }]}>Email Address</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: themeColors.card, color: themeColors.text }]}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder="Enter your email"
                        placeholderTextColor={themeColors.textSecondary}
                    />
                </View>

                 <TouchableOpacity style={[styles.saveButton, { backgroundColor: themeColors.primary }]} onPress={handleSaveChanges}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    content: { padding: 20 },
    iconContainer: { alignSelf: 'center', marginBottom: 30, width: 120, height: 120, justifyContent: 'center', alignItems: 'center' },
    editIcon: { position: 'absolute', bottom: 5, right: 5, padding: 8, borderRadius: 20 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, marginBottom: 8 },
    input: { fontSize: 16, padding: 15, borderRadius: 10 },
    saveButton: { padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
