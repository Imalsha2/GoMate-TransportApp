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

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.auth);
  const { theme, themeColors } = useTheme();

  const isFavorite = favorites.some(fav => fav.id === item.id);

  const handleFavorite = () => {
    if (isFavorite) {
        dispatch(removeFavorite(item));
    } else {
        dispatch(addFavorite(item));
    }
  };
  
  const itemData = {
      ...item,
      about: item.description || `A popular route in Sri Lanka.`,
      features: FEATURES,
      location: item.name.split('→')[0].trim(),
  };

  const handlePlanTrip = () => {
      navigation.navigate('ReviewAndPay', { item: itemData });
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: themeColors.background}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={{ uri: itemData.image }} style={styles.imageHeader}>
            <View style={styles.headerOverlay}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
                <TouchableOpacity onPress={handleFavorite} style={styles.headerButton}><Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? themeColors.error : '#fff'} /></TouchableOpacity>
            </View>
        </ImageBackground>

        <View style={[styles.contentContainer, {backgroundColor: themeColors.background}]}>
            <View style={[styles.typeBadge, {backgroundColor: themeColors.card}]}><Text style={[styles.typeBadgeText, {color: themeColors.text}]}>{itemData.type}</Text></View>
            
            <Text style={[styles.title, {color: themeColors.text}]}>{itemData.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: item.status === 'Active' || item.status === 'On Time' ? themeColors.success : themeColors.accent }]}>
                <Text style={[styles.statusText, {color: '#fff'}]}>{itemData.status}</Text>
            </View>

            <View style={[styles.infoCard, {backgroundColor: themeColors.card}]}>
                <Ionicons name="information-circle-outline" size={24} color={themeColors.accent} />
                <View style={styles.infoCardContent}>
                    <Text style={[styles.infoCardTitle, {color: themeColors.text}]}>About</Text>
                    <Text style={[styles.infoCardText, {color: themeColors.textSecondary}]}>{itemData.about}</Text>
                </View>
            </View>

            <View style={styles.gridContainer}>
                <View style={[styles.gridItem, {backgroundColor: themeColors.card}]}>
                    <Ionicons name="location-outline" size={24} color={themeColors.accent} />
                    <Text style={[styles.gridLabel, {color: themeColors.textSecondary}]}>Location</Text>
                    <Text style={[styles.gridValue, {color: themeColors.text}]}>{itemData.location}</Text>
                </View>
                <View style={[styles.gridItem, {backgroundColor: themeColors.card}]}>
                    <Ionicons name="pricetag-outline" size={24} color={themeColors.accent} />
                    <Text style={[styles.gridLabel, {color: themeColors.textSecondary}]}>Type</Text>
                    <Text style={[styles.gridValue, {color: themeColors.text}]}>{itemData.type}</Text>
                </View>
            </View>

            <View style={[styles.featuresCard, {backgroundColor: themeColors.card}]}>
                <Text style={[styles.featuresTitle, {color: themeColors.text}]}>Features</Text>
                {itemData.features.map(feature => (
                    <View key={feature.text} style={styles.featureItem}>
                        <Ionicons name={feature.icon} size={20} color={themeColors.success} />
                        <Text style={[styles.featureText, {color: themeColors.textSecondary}]}>{feature.text}</Text>
                    </View>
                ))}
            </View>
        </View>

      </ScrollView>

       <View style={[styles.footer, {backgroundColor: themeColors.background, borderTopColor: themeColors.border}]}>
            <TouchableOpacity style={[styles.planButton, {backgroundColor: themeColors.accent}]} onPress={handlePlanTrip}>
                <Ionicons name="map-outline" size={22} color={themeColors.background} />
                <Text style={[styles.planButtonText, {color: themeColors.background}]}>Plan Trip</Text>
            </TouchableOpacity>
             <TouchableOpacity style={[styles.shareButton, {backgroundColor: themeColors.card}]} onPress={() => {}}>
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
    infoCard: { flexDirection: 'row', borderRadius: 16, padding: 15, marginTop: 0 },
    infoCardContent: { marginLeft: 15, flex: 1 },
    infoCardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    infoCardText: { fontSize: 14, lineHeight: 20 },
    gridContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
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
