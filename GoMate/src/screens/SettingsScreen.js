import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { colors } from '../styles/colors';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen({ navigation }) {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme);
    const { themeColors } = useTheme();

    const isDarkMode = theme === 'dark';

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
            <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={themeColors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: themeColors.text }]}>Settings</Text>
                <View style={{width: 24}}/>
            </View>

            <View style={styles.settingsList}>
                <View style={styles.settingItem}>
                    <Text style={[styles.settingLabel, { color: themeColors.text }]}>Dark Mode</Text>
                    <Switch 
                        value={isDarkMode} 
                        onValueChange={handleToggle} 
                        trackColor={{ false: '#767577', true: colors.dark.primary }}
                        thumbColor={'#f4f3f4'}
                    />
                </View>
                <View style={[styles.divider, { backgroundColor: themeColors.border }]} />
                 <TouchableOpacity style={styles.settingItem}>
                    <Text style={[styles.settingLabel, { color: themeColors.text }]}>Enable Notifications</Text>
                    <Switch 
                        value={true} 
                        onValueChange={() => {}} 
                        trackColor={{ false: '#767577', true: colors.dark.primary }}
                        thumbColor={'#f4f3f4'}
                        disabled={false}
                    />
                </TouchableOpacity>
                 <View style={[styles.divider, { backgroundColor: themeColors.border }]} />
                 <TouchableOpacity style={styles.settingItem}>
                    <Text style={[styles.settingLabel, { color: themeColors.text }]}>Terms of Service</Text>
                    <Ionicons name="chevron-forward" size={24} color={themeColors.icon} />
                </TouchableOpacity>
                 <View style={[styles.divider, { backgroundColor: themeColors.border }]} />
                 <TouchableOpacity style={styles.settingItem}>
                    <Text style={[styles.settingLabel, { color: themeColors.text }]}>Privacy Policy</Text>
                    <Ionicons name="chevron-forward" size={24} color={themeColors.icon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    settingsList: {
        paddingHorizontal: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    settingLabel: {
        fontSize: 18,
    },
    divider: {
        height: 1,
    },
});
