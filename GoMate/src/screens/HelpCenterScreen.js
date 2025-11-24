import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, LayoutAnimation, UIManager, Platform, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQ_DATA = [
    { id: '1', question: 'How do I book a ticket?', answer: 'Navigate to the desired category (Flights, Buses, Trains), select your route, and proceed to book by filling in your details.' },
    { id: '2', question: 'Can I cancel my booking?', answer: 'Cancellation policies vary. Please check the details of your specific booking in the \"Schedules\" tab.' },
    { id: '3', question: 'How do I change my payment method?', answer: 'You can add or remove payment methods in your profile under \"Payment Methods\".' },
    { id: '4', question: 'Is my data secure?', answer: 'Yes, we use industry-standard encryption to protect your personal information.' },
];

const FaqItem = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { themeColors } = useTheme();

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    }

    return (
        <View style={[styles.faqContainer, { backgroundColor: themeColors.card }]}>
            <TouchableOpacity style={styles.questionRow} onPress={toggleExpand} activeOpacity={0.8}>
                <Text style={[styles.question, { color: themeColors.text }]}>{item.question}</Text>
                <Ionicons name={isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} color={themeColors.textSecondary} />
            </TouchableOpacity>
            {isExpanded && (
                <View style={[styles.answerContainer, { borderTopColor: themeColors.border }]}>
                    <Text style={[styles.answer, { color: themeColors.textSecondary }]}>{item.answer}</Text>
                </View>
            )}
        </View>
    );
};

export default function HelpCenterScreen({ navigation }) {
    const { themeColors } = useTheme();

    const handleEmailPress = () => {
        Linking.openURL('mailto:support@gomate.com?subject=Support Request').catch(err => 
            Alert.alert("Error", "Could not open email app.")
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={themeColors.text} /></TouchableOpacity>
                <Text style={[styles.headerTitle, { color: themeColors.text }]}>Help Center</Text>
                <View style={{width: 24}}/>
            </View>

            <FlatList
                data={FAQ_DATA}
                keyExtractor={item => item.id}
                renderItem={({item}) => <FaqItem item={item} />}
                ListHeaderComponent={() => (
                    <View style={[styles.contactSupportCard, { backgroundColor: themeColors.card }]}>
                        <Text style={[styles.contactTitle, { color: themeColors.text }]}>Contact Support</Text>
                        <Text style={[styles.contactSubText, { color: themeColors.textSecondary }]}>Can't find your answer? Our support team is here to help.</Text>
                        <TouchableOpacity style={[styles.contactButton, { backgroundColor: themeColors.primary }]} onPress={handleEmailPress}>
                            <Text style={[styles.contactButtonText, { color: '#fff' }]}>Email Us</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListHeaderComponentStyle={{marginBottom: 20}}
                contentContainerStyle={{padding: 20}}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    
    contactSupportCard: { padding: 20, borderRadius: 12, alignItems: 'center' },
    contactTitle: { fontSize: 18, fontWeight: 'bold' },
    contactSubText: { textAlign: 'center', marginVertical: 10 },
    contactButton: { paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8, marginTop: 5 },
    contactButtonText: { fontWeight: 'bold' },

    faqContainer: { borderRadius: 10, marginBottom: 15, paddingHorizontal: 15, paddingVertical: 10 },
    questionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
    question: { fontSize: 16, fontWeight: 'bold', flex: 1, marginRight: 10 },
    answerContainer: { paddingTop: 10, borderTopWidth: 1, marginTop: 10 },
    answer: { fontSize: 14, lineHeight: 22 },
});
