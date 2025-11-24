import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { ALL_ROUTES } from '../data/Routes';
import { useTheme } from '../context/ThemeContext';

const BookingHistoryCard = ({ item, onPress }) => {
    const { themeColors } = useTheme();
    const getIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'bus':
            case 'shuttle':
            case 'city bus':
                return 'bus';
            case 'train': 
                return 'train';
            case 'flight':
                return 'airplane';
            default: return 'alert-circle';
        }
    }

    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: themeColors.card }]} onPress={onPress}>
            <View style={[styles.iconContainer, { backgroundColor: themeColors.background }]}>
                <Ionicons name={getIcon(item.type)} size={28} color={themeColors.primary} />
            </View>
            <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: themeColors.text }]}>{item.name || 'Unknown Route'}</Text>
                <Text style={[styles.cardSubtitle, { color: themeColors.textSecondary }]}>{`${item.type} • ${item.passengers} Passenger(s)`}</Text>
                <View style={styles.detailsRow}>
                    <Ionicons name="calendar-outline" size={16} color={themeColors.icon} />
                    <Text style={[styles.detailText, { color: themeColors.textSecondary }]}>{item.date}</Text>
                </View>
            </View>
            <View style={styles.arrowContainer}>
                <Ionicons name="chevron-forward" size={24} color={themeColors.icon} />
            </View>
        </TouchableOpacity>
    );
}

export default function SchedulesScreen({ navigation }) {
    const { bookings } = useSelector(state => state.auth);
    const { themeColors } = useTheme();

    const navigateToDetails = (booking) => {
        const routeData = ALL_ROUTES.routes.find(r => r.id === booking.id);
        if (!routeData) {
            console.error("Route data not found for booking:", booking);
            // Optionally, show an alert to the user
            return;
        }

        const item = { ...routeData, ...booking };

        let screenName;
        let params;
        switch (item.type.toLowerCase()) {
            case 'bus':
            case 'shuttle':
            case 'city bus':
                screenName = 'BusDetails';
                params = { bus: item };
                break;
            case 'train':
                screenName = 'TrainDetails';
                params = { train: item };
                break;
            case 'flight':
                screenName = 'FlightDetails';
                params = { flight: item };
                break;
            default:
                screenName = 'Details';
                params = { item: item };
                break; 
        }
        navigation.navigate(screenName, params);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
            <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
                <Text style={[styles.headerTitle, { color: themeColors.text }]}>My Schedules</Text>
            </View>
            
            {bookings && bookings.length > 0 ? (
                <FlatList 
                    data={bookings}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({ item }) => <BookingHistoryCard item={item} onPress={() => navigateToDetails(item)} />}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
                />
            ) : (
                <View style={styles.emptyView}>
                    <Ionicons name="calendar-outline" size={80} color={themeColors.icon} />
                    <Text style={[styles.emptyText, { color: themeColors.text }]}>You have no upcoming schedules</Text>
                    <Text style={[styles.emptySubText, { color: themeColors.textSecondary }]}>When you plan a trip, it will appear here.</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, borderBottomWidth: 1 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
    
    card: { flexDirection: 'row', borderRadius: 12, padding: 15, marginBottom: 15, alignItems: 'center' },
    iconContainer: { padding: 15, borderRadius: 12, marginRight: 15 },
    cardContent: { flex: 1 },
    cardTitle: { fontSize: 16, fontWeight: 'bold' },
    cardSubtitle: { fontSize: 14, marginVertical: 2 },
    detailsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    detailText: { marginLeft: 8 },
    arrowContainer: { justifyContent: 'center' },

    emptyView: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
    emptyText: { fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center' },
    emptySubText: { fontSize: 16, textAlign: 'center', marginTop: 10 },
});
