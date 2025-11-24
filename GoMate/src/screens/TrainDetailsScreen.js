import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/authSlice';
import { useTheme } from '../context/ThemeContext';

const FEATURES = [
    { icon: 'timer-outline', text: 'Real-time Updates' },
    { icon: 'wifi', text: 'Free WiFi Available' },
    { icon: 'man', text: 'Wheelchair Accessible' },
    { icon: 'card-outline', text: 'Contactless Payment' },
];

export default function TrainDetailsScreen({ route, navigation }) {
  const { train } = route.params;
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.auth);
  const { themeColors } = useTheme();

  const isFavorite = favorites.some(fav => fav.id === train.id);

  const handleFavorite = () => {
    if (isFavorite) {
        dispatch(removeFavorite(train));
    } else {
        dispatch(addFavorite(train));
    }
  };

  const trainData = {
      ...train,
      about: `Main railway terminus in ${train.stops[0]}, connecting all major cities across Sri Lanka.`,
      features: FEATURES,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={{ uri: trainData.image }} style={styles.imageHeader}>
            <View style={styles.headerOverlay}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
                <TouchableOpacity onPress={handleFavorite} style={styles.headerButton}><Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? themeColors.error : '#fff'} /></TouchableOpacity>
            </View>
        </ImageBackground>

        <View style={[styles.contentContainer, { backgroundColor: themeColors.background }]}>
            <View style={[styles.typeBadge, { backgroundColor: themeColors.card }]}><Text style={[styles.typeBadgeText, { color: themeColors.text }]}>TRAIN</Text></View>
            
            <Text style={[styles.title, { color: themeColors.text }]}>{trainData.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: train.status === 'Active' ? themeColors.success : themeColors.accent }]}>
                <Text style={[styles.statusText, { color: '#fff' }]}>{trainData.status}</Text>
            </View>

            <View style={[styles.stopsContainer, { backgroundColor: themeColors.card }]}>
                <Text style={[styles.stopsTitle, { color: themeColors.text }]}>Route Summary</Text>
                {trainData.stops.map((stop, index) => (
                    <View key={index} style={styles.stopItem}>
                        <View style={styles.stopMarker}>
                            <View style={[styles.stopDot, { backgroundColor: themeColors.primary }]} />
                            {index < trainData.stops.length - 1 && <View style={[styles.stopConnector, { backgroundColor: themeColors.border }]} />}
                        </View>
                        <View style={styles.stopDetails}>
                            <Text style={[styles.stopText, { color: themeColors.text }]}>{stop}</Text>
                            <Text style={[styles.stopTime, { color: themeColors.textSecondary }]}>{trainData.schedule[index] || ''}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.gridContainer}>
                <View style={[styles.gridItem, { backgroundColor: themeColors.card }]}>
                    <Ionicons name="location-outline" size={24} color={themeColors.accent} />
                    <Text style={[styles.gridLabel, { color: themeColors.textSecondary }]}>Start</Text>
                    <Text style={[styles.gridValue, { color: themeColors.text }]}>{trainData.stops[0]}</Text>
                </View>
                <View style={[styles.gridItem, { backgroundColor: themeColors.card }]}>
                    <Ionicons name="flag-outline" size={24} color={themeColors.accent} />
                    <Text style={[styles.gridLabel, { color: themeColors.textSecondary }]}>End</Text>
                    <Text style={[styles.gridValue, { color: themeColors.text }]}>{trainData.stops[trainData.stops.length - 1]}</Text>
                </View>
            </View>

            <View style={[styles.featuresCard, { backgroundColor: themeColors.card }]}>
                <Text style={[styles.featuresTitle, { color: themeColors.text }]}>Features</Text>
                {trainData.features.map(feature => (
                    <View key={feature.text} style={styles.featureItem}>
                        <Ionicons name={feature.icon} size={20} color={themeColors.success} />
                        <Text style={[styles.featureText, { color: themeColors.textSecondary }]}>{feature.text}</Text>
                    </View>
                ))}
            </View>
        </View>

      </ScrollView>

       <View style={[styles.footer, { backgroundColor: themeColors.background, borderTopColor: themeColors.border }]}>
            <TouchableOpacity style={[styles.planButton, { backgroundColor: themeColors.accent }]} onPress={() => navigation.navigate('ReviewAndPay', { item: trainData })}>
                <Ionicons name="map-outline" size={22} color={themeColors.background} />
                <Text style={[styles.planButtonText, { color: themeColors.background }]}>Plan Trip</Text>
            </TouchableOpacity>
             <TouchableOpacity style={[styles.shareButton, { backgroundColor: themeColors.card }]} onPress={() => {}}>
                <Ionicons name="share-social-outline" size={22} color={themeColors.text} />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    imageHeader: { height: 280, justifyContent: 'space-between' },
    headerOverlay: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 40, backgroundColor: 'rgba(0,0,0,0.3)' },
    headerButton: { backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 50, padding: 8 },
    contentContainer: { padding: 20, marginTop: -20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    typeBadge: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, marginTop: -35, marginLeft: 20 },
    typeBadgeText: { fontWeight: 'bold' },
    title: { fontSize: 28, fontWeight: 'bold', marginTop: 20 },
    statusBadge: { alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, marginTop: 10, marginBottom: 25 },
    statusText: { fontWeight: '600' },
    stopsContainer: { borderRadius: 16, padding: 20, marginBottom: 20 },
    stopsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    stopItem: { flexDirection: 'row', alignItems: 'center' },
    stopMarker: { alignItems: 'center' },
    stopDot: { width: 12, height: 12, borderRadius: 6 },
    stopConnector: { flex: 1, width: 2, marginVertical: 4 },
    stopDetails: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, paddingBottom: 25 },
    stopText: { fontSize: 16 },
    stopTime: { fontSize: 14 },
    gridContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 0 },
    gridItem: { borderRadius: 16, padding: 15, width: '48%', alignItems: 'center' },
    gridLabel: { marginTop: 8 },
    gridValue: { fontSize: 16, fontWeight: 'bold', marginTop: 2 },
    featuresCard: { borderRadius: 16, padding: 20, marginTop: 20 },
    featuresTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    featureText: { marginLeft: 12, fontSize: 15 },
    footer: { flexDirection: 'row', padding: 20, borderTopWidth: 1 },
    planButton: { flex: 1, flexDirection: 'row', paddingVertical: 15, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    planButtonText: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
    shareButton: { padding: 15, borderRadius: 12, marginLeft: 10 },
});
