import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addBooking } from '../redux/authSlice';
import { useTheme } from '../context/ThemeContext';

// --- Reusable Components ---
const PassengerCounter = ({ count, setCount }) => {
    const { themeColors } = useTheme();
    return (
    <View style={[styles.passengerCounter, { backgroundColor: themeColors.background }]}>
        <TouchableOpacity onPress={() => setCount(Math.max(1, count - 1))} style={styles.counterButton}><Ionicons name="remove-circle-outline" size={28} color={themeColors.textSecondary} /></TouchableOpacity>
        <Text style={[styles.counterText, { color: themeColors.text }]}>{count} {count > 1 ? 'Passengers' : 'Passenger'}</Text>
        <TouchableOpacity onPress={() => setCount(Math.min(10, count + 1))} style={styles.counterButton}><Ionicons name="add-circle-outline" size={28} color={themeColors.textSecondary} /></TouchableOpacity>
    </View>
)};

const CalendarModal = ({ visible, onClose, onSelectDate }) => {
    const { themeColors } = useTheme();
    const [displayDate, setDisplayDate] = useState(new Date());
    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const changeMonth = (amount) => {
        const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + amount, 1);
        if (newDate.getFullYear() < minDate.getFullYear() || (newDate.getFullYear() === minDate.getFullYear() && newDate.getMonth() < minDate.getMonth())) {
            return;
        }
        setDisplayDate(newDate);
    };

    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const monthName = displayDate.toLocaleString('default', { month: 'long' });

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const blanks = Array.from({ length: firstDayOfMonth }).map((_, i) => <View key={`blank-${i}`} style={styles.dayCell} />);

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
        const dayDate = new Date(year, month, d);
        const isPast = dayDate < minDate;
        return (
            <TouchableOpacity 
                key={`day-${d}`}
                style={styles.dayCell}
                onPress={() => !isPast && onSelectDate(dayDate.toISOString().split('T')[0])}
                disabled={isPast}
            >
                <Text style={[styles.dayText, { color: themeColors.text }, isPast && styles.disabledDayText]}>{d}</Text>
            </TouchableOpacity>
        );
    });

    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={onClose}>
                <View style={[styles.calendarContainer, { backgroundColor: themeColors.card }]}>
                    <View style={styles.calendarHeader}>
                        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navButton}><Ionicons name="chevron-back" size={24} color={themeColors.text} /></TouchableOpacity>
                        <Text style={[styles.calendarMonthYear, { color: themeColors.text }]}>{`${monthName} ${year}`}</Text>
                        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navButton}><Ionicons name="chevron-forward" size={24} color={themeColors.text} /></TouchableOpacity>
                    </View>
                    <View style={[styles.weekdaysContainer, { borderBottomColor: themeColors.border }]}>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <Text key={`${day}-${index}`} style={[styles.weekdayText, { color: themeColors.textSecondary }]}>{day}</Text>)} 
                    </View>
                    <View style={styles.daysGrid}>{blanks}{days}</View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default function ReviewAndPayScreen({ route, navigation }) {
  const { item } = route.params;
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { themeColors } = useTheme();

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [passengers, setPassengers] = useState(1);
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const handleDateSelect = (selectedDate) => {
      setDate(selectedDate);
      setCalendarVisible(false);
  }

  const handleConfirmTrip = () => {
    if (!fullName.trim() || !email.trim()) {
      Alert.alert("Missing Details", "Please fill in your full name and email address.");
      return;
    }
    
    const bookingDetails = { ...item, passengers, date };
    dispatch(addBooking(bookingDetails));

    navigation.navigate('Confirmation', { item: bookingDetails });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <CalendarModal visible={isCalendarVisible} onClose={() => setCalendarVisible(false)} onSelectDate={handleDateSelect} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={themeColors.text} /></TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Plan Your Trip</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)} Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: themeColors.text }]}>{item.name}</Text>
            <Text style={[styles.summaryValue, { color: themeColors.textSecondary }]}>{item.stops[0]} to {item.stops[item.stops.length-1]}</Text>
          </View>
        </View>
        
        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Trip Details</Text>
            <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: themeColors.textSecondary }]}>Date</Text>
                <TouchableOpacity style={[styles.dateInputContainer, { backgroundColor: themeColors.background }]} onPress={() => setCalendarVisible(true)}>
                    <Text style={[styles.dateInput, { color: themeColors.text }]}>{date}</Text>
                    <Ionicons name="calendar-outline" size={24} color={themeColors.textSecondary} />
                </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: themeColors.textSecondary }]}>Passengers</Text>
                <PassengerCounter count={passengers} setCount={setPassengers} />
            </View>
        </View>
        
        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Passenger Details</Text>
            <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: themeColors.textSecondary }]}>Full Name</Text>
                <TextInput style={[styles.textInput, { backgroundColor: themeColors.background, color: themeColors.text }]} placeholder="Enter your full name" placeholderTextColor={themeColors.textSecondary} value={fullName} onChangeText={setFullName}/>
            </View>
             <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: themeColors.textSecondary }]}>Email Address</Text>
                <TextInput style={[styles.textInput, { backgroundColor: themeColors.background, color: themeColors.text }]} placeholder="Enter your email address" placeholderTextColor={themeColors.textSecondary} value={email} onChangeText={setEmail} keyboardType="email-address"/>
            </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: themeColors.card, borderTopColor: themeColors.border }]}>
        <TouchableOpacity style={[styles.confirmButton, { backgroundColor: themeColors.primary }]} onPress={handleConfirmTrip}><Text style={[styles.confirmButtonText, { color: '#fff' }]}>Confirm Trip</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    card: { borderRadius: 16, padding: 20, marginHorizontal: 20, marginBottom: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    inputGroup: { marginBottom: 15 },
    inputLabel: { fontSize: 14, marginBottom: 8 },
    dateInputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 14 },
    dateInput: { flex: 1, fontSize: 16 },
    passengerCounter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 8, padding: 8 },
    counterButton: { padding: 5 },
    counterText: { fontSize: 18, fontWeight: 'bold' },
    textInput: { fontSize: 16, padding: 12, borderRadius: 8 },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 30, borderTopWidth: 1 },
    confirmButton: { padding: 16, borderRadius: 12, alignItems: 'center' },
    confirmButtonText: { fontSize: 18, fontWeight: 'bold' },
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
    calendarContainer: { borderRadius: 16, padding: 20, width: '90%' },
    calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    navButton: { padding: 8 },
    calendarMonthYear: { fontSize: 18, fontWeight: 'bold' },
    weekdaysContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, borderBottomWidth: 1, paddingBottom: 10 },
    weekdayText: { fontWeight: 'bold', width: '14.28%', textAlign: 'center' },
    daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
    dayCell: { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' },
    dayText: { fontSize: 16 },
    disabledDayText: { color: '#475569' },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
    summaryLabel: { fontSize: 16, fontWeight: 'bold' },
    summaryValue: { fontSize: 16 },
});
