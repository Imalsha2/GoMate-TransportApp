import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const initialCards = [
    { id: '1', type: 'Visa', last4: '4242', expiry: '12/25' },
    { id: '2', type: 'Mastercard', last4: '5555', expiry: '08/26' },
];

const AddNewCardModal = ({ visible, onClose, onSave }) => {
    const { themeColors } = useTheme();
    const [card, setCard] = useState({ number: '', holder: '', expiry: '', cvv: '' });

    const handleSave = () => {
        if (card.number.length !== 16 || card.holder.trim() === '' || card.expiry.length !== 5 || card.cvv.length !== 3) {
            Alert.alert("Invalid Details", "Please fill all card details correctly.");
            return;
        }
        onSave({ 
            id: Date.now().toString(),
            type: card.number.startsWith('4') ? 'Visa' : 'Mastercard',
            last4: card.number.slice(-4),
            expiry: card.expiry
        });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { backgroundColor: themeColors.card }]}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={onClose}><Ionicons name="close" size={28} color={themeColors.textSecondary} /></TouchableOpacity>
                        <Text style={[styles.modalTitle, { color: themeColors.text }]}>Add New Card</Text>
                        <View style={{width: 28}}/>
                    </View>
                    <TextInput style={[styles.input, { backgroundColor: themeColors.background, color: themeColors.text }]} placeholder="Card Holder Name" placeholderTextColor={themeColors.textSecondary} value={card.holder} onChangeText={t => setCard({...card, holder: t})} />
                    <TextInput style={[styles.input, { backgroundColor: themeColors.background, color: themeColors.text }]} placeholder="Card Number" placeholderTextColor={themeColors.textSecondary} keyboardType="number-pad" maxLength={16} value={card.number} onChangeText={t => setCard({...card, number: t})} />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TextInput style={[styles.input, {flex: 1, marginRight: 10, backgroundColor: themeColors.background, color: themeColors.text}]} placeholder="MM/YY" placeholderTextColor={themeColors.textSecondary} keyboardType="number-pad" maxLength={5} value={card.expiry} onChangeText={t => setCard({...card, expiry: t})}/>
                        <TextInput style={[styles.input, {flex: 1, marginLeft: 10, backgroundColor: themeColors.background, color: themeColors.text}]} placeholder="CVV" placeholderTextColor={themeColors.textSecondary} keyboardType="number-pad" maxLength={3} value={card.cvv} onChangeText={t => setCard({...card, cvv: t})}/>
                    </View>
                    <TouchableOpacity style={[styles.saveButton, { backgroundColor: themeColors.primary }]} onPress={handleSave}><Text style={styles.saveButtonText}>Save Card</Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default function PaymentMethodsScreen({ navigation }) {
    const [cards, setCards] = useState(initialCards);
    const [selectedCardId, setSelectedCardId] = useState('1');
    const [modalVisible, setModalVisible] = useState(false);
    const { themeColors } = useTheme();

    const handleSelectCard = (cardId) => {
        setSelectedCardId(cardId);
        // In a real app, you would pass the selected card back to the previous screen
        navigation.goBack();
        Alert.alert("Payment Method Updated");
    };

    const handleAddNewCard = (newCard) => {
        setCards([...cards, newCard]);
        setModalVisible(false);
        handleSelectCard(newCard.id);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
            <AddNewCardModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={handleAddNewCard} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={themeColors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: themeColors.text }]}>Payment Methods</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView>
                <Text style={[styles.subHeader, { color: themeColors.textSecondary }]}>Select a card to pay</Text>
                {cards.map(card => (
                    <TouchableOpacity key={card.id} style={[styles.cardItem, { backgroundColor: themeColors.card }]} onPress={() => handleSelectCard(card.id)}>
                        <Ionicons name={card.type === 'Visa' ? 'card' : 'card-outline'} size={32} color={themeColors.textSecondary} style={{marginRight: 15}}/>
                        <View style={{flex: 1}}>
                            <Text style={[styles.cardType, { color: themeColors.text }]}>{card.type}</Text>
                            <Text style={[styles.cardNumber, { color: themeColors.textSecondary }]}>**** **** **** {card.last4}</Text>
                        </View>
                        <View style={[styles.radio, { borderColor: themeColors.primary, backgroundColor: selectedCardId === card.id ? themeColors.primary : 'transparent' }]}>
                           {selectedCardId === card.id && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={[styles.footer, { borderTopColor: themeColors.border }]}>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: themeColors.primary }]} onPress={() => setModalVisible(true)}>
                    <Text style={[styles.addButtonText, { color: '#fff' }]}>Add a New Card</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    subHeader: { fontSize: 16, margin: 20 },

    cardItem: { flexDirection: 'row', alignItems: 'center', padding: 20, marginHorizontal: 20, borderRadius: 12, marginBottom: 15 },
    cardType: { fontSize: 16, fontWeight: 'bold' },
    cardNumber: { fontSize: 14 },
    radio: { height: 24, width: 24, borderRadius: 12, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
    radioInner: { height: 12, width: 12, borderRadius: 6, backgroundColor: '#fff' },

    footer: { padding: 20, borderTopWidth: 1 },
    addButton: { padding: 16, borderRadius: 12, alignItems: 'center' },
    addButtonText: { fontSize: 18, fontWeight: 'bold' },

    // Modal Styles
    modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.7)' },
    modalContent: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 20, fontWeight: 'bold' },
    input: { fontSize: 16, padding: 12, borderRadius: 8, marginBottom: 15 },
    saveButton: { paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
