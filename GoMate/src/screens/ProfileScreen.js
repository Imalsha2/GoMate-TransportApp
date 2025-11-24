import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useTheme } from '../context/ThemeContext';

const ProfileOption = ({ icon, text, onPress }) => {
    const { themeColors } = useTheme();
    return (
        <TouchableOpacity style={styles.optionButton} onPress={onPress}>
            <View style={[styles.optionIconContainer, {backgroundColor: themeColors.card}]}>
                <Ionicons name={icon} size={24} color={themeColors.icon} />
            </View>
            <Text style={[styles.optionText, {color: themeColors.text}]}>{text}</Text>
            <Ionicons name="chevron-forward-outline" size={22} color={themeColors.icon} />
        </TouchableOpacity>
    );
}

export default function ProfileScreen({ navigation }) {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { theme, themeColors } = useTheme();

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: () => dispatch(logout()) },
            ]
        );
    };

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: themeColors.background}]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, {color: themeColors.text}]}>Profile</Text>
            </View>

            <View style={styles.profileContainer}>
                <View style={[styles.profileIconContainer, {backgroundColor: themeColors.card, borderColor: themeColors.primary}]}>
                    <Ionicons name="person-outline" size={60} color={themeColors.text} />
                </View>
                <Text style={[styles.profileName, {color: themeColors.text}]}>{user?.name || 'Imalsha'}</Text>
                <Text style={[styles.profileEmail, {color: themeColors.textSecondary}]}>{user?.email || 'imalsharathnayaka2000@gmail.com'}</Text>
            </View>

            <View style={styles.menuContainer}>
                <ProfileOption icon="person-outline" text="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
                <ProfileOption icon="card-outline" text="Payment Methods" onPress={() => navigation.navigate('PaymentMethods')} />
                <ProfileOption icon="heart-outline" text="My Favorites" onPress={() => navigation.navigate('Favorites')} />
                <View style={[styles.divider, {backgroundColor: themeColors.border}]} />
                <ProfileOption icon="settings-outline" text="Settings" onPress={() => navigation.navigate('Settings')} />
                <ProfileOption icon="help-circle-outline" text="Help Center" onPress={() => navigation.navigate('HelpCenter')} />
                <ProfileOption icon="log-out-outline" text="Logout" onPress={handleLogout} />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, alignItems: 'center' },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    
    profileContainer: { alignItems: 'center', marginTop: 10, marginBottom: 30 },
    profileIconContainer: { 
        width: 110, 
        height: 110, 
        borderRadius: 55, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderWidth: 3, 
        marginBottom: 15,
    },
    profileName: { fontSize: 20, fontWeight: 'bold' },
    profileEmail: { fontSize: 16, marginTop: 4 },

    menuContainer: { marginHorizontal: 20 },
    optionButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
    optionIconContainer: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    optionText: { flex: 1, fontSize: 16 },
    divider: { height: 1, marginVertical: 10 },
});
