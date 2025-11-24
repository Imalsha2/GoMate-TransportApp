import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function ConfirmationScreen({ route, navigation }) {
  const { item } = route.params;
  const { theme, themeColors } = useTheme();

  const orderId = `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const navigateToDetails = () => {
      let screenName;
      let params;
      switch (item.type.toLowerCase()) {
          case 'bus':
              screenName = 'BusDetails';
              params = { bus: item };
              break;
          case 'train':
              screenName = 'TrainDetails';
              params = { train: item };
              break;
          default:
              screenName = 'Details';
              params = { item: item };
              break; 
      }
      navigation.navigate(screenName, params);
  };
  
  const DetailRow = ({ label, value, isTotal = false }) => (
    <View style={[styles.detailRow, {borderBottomColor: themeColors.border}, isTotal && { borderBottomWidth: 0 }]}>
        <Text style={[styles.detailLabel, {color: themeColors.textSecondary}]}>{label}</Text>
        <Text style={[styles.detailValue, {color: themeColors.text}, isTotal && {color: themeColors.primary}]}>{value}</Text>
    </View>
    );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: themeColors.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Ionicons name="close" size={28} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: themeColors.text}]}>Confirmation</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={[styles.successIconContainer, {backgroundColor: themeColors.success}]}>
            <Ionicons name="checkmark" size={60} color={themeColors.background} />
        </View>

        <Text style={[styles.successTitle, {color: themeColors.text}]}>Trip Planned!</Text>
        <Text style={[styles.successMessage, {color: themeColors.textSecondary}]}>Your trip has been saved. You can find it in your schedules.</Text>

        <View style={[styles.detailsCard, {backgroundColor: themeColors.card}]}>
            <DetailRow label="Booking ID" value={orderId} />
            <DetailRow label="Service" value={item.type} />
            <DetailRow label="Route" value={`${item.name}`} />
            <DetailRow label="Passengers" value={item.passengers} isTotal={true} />
        </View>

        <TouchableOpacity style={[styles.primaryButton, {backgroundColor: themeColors.primary}]} onPress={navigateToDetails}>
            <Text style={styles.primaryButtonText}>View Trip Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.secondaryButton, {borderColor: themeColors.border}]} onPress={() => navigation.popToTop()}>
            <Text style={[styles.secondaryButtonText, {color: themeColors.text}]}>Back to Home</Text>
        </TouchableOpacity>

        <Text style={[styles.supportText, {color: themeColors.textSecondary}]}>Need Help? <Text style={{color: themeColors.primary}}>Contact Support</Text></Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    contentContainer: { flexGrow: 1, alignItems: 'center', padding: 20 },

    successIconContainer: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginTop: 30, marginBottom: 20 },
    successTitle: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
    successMessage: { fontSize: 16, textAlign: 'center', marginBottom: 30 },

    detailsCard: { borderRadius: 16, padding: 20, width: '100%', marginBottom: 30 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
    detailLabel: { fontSize: 16 },
    detailValue: { fontSize: 16, fontWeight: '600' },

    primaryButton: { width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
    primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    secondaryButton: { borderWidth: 1, width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 'auto' },
    secondaryButtonText: { fontSize: 18, fontWeight: 'bold' },

    supportText: { fontSize: 14, marginTop: 20 }
});
