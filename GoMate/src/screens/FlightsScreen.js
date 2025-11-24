import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/authSlice';
import { ALL_ROUTES } from '../data/Routes';
import { useTheme } from '../context/ThemeContext';

const FLIGHTS_DATA = ALL_ROUTES.routes.filter(r => r.type === 'Flight');

const RouteCard = ({ route, onPress }) => {
    const { themeColors } = useTheme();
    const dispatch = useDispatch();
    const { favorites } = useSelector(state => state.auth);
    const isFavorite = favorites.some(fav => fav.id === route.id);

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(route));
        } else {
            dispatch(addFavorite(route));
        }
    };
    
    const getStatusStyle = (status) => {
        switch(status) {
            case 'Popular': return { backgroundColor: themeColors.accent, color: themeColors.background };
            case 'Upcoming': return { backgroundColor: themeColors.primary, color: '#fff' };
            default: return { backgroundColor: themeColors.success, color: '#fff' };
        }
    };

    const statusStyle = getStatusStyle(route.status);

    return (
        <TouchableOpacity style={styles.routeCard} onPress={onPress}>
            <ImageBackground source={{ uri: route.image }} style={styles.routeImage} imageStyle={{ borderRadius: 16 }}>
                <View style={styles.routeCardOverlay}>
                    <TouchableOpacity onPress={handleFavorite} style={styles.favoriteButton}>
                        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={22} color={isFavorite ? themeColors.error : '#e2e8f0'} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.routeName} numberOfLines={2}>{route.name}</Text>
                        <View style={styles.routeCardFooter}>
                            <View style={[styles.statusContainer, {backgroundColor: statusStyle.backgroundColor}]}>
                                <Text style={[styles.statusText, {color: statusStyle.color}]}>{route.status}</Text>
                            </View>
                            <Text style={styles.durationText}>{route.duration}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default function FlightsScreen({ navigation }) {
    const { themeColors } = useTheme();
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: themeColors.background}]}>
      <View style={[styles.header, {borderBottomColor: themeColors.border}]}>
         <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={themeColors.text} /></TouchableOpacity>
        <Text style={[styles.headerTitle, {color: themeColors.text}]}>Flights</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={FLIGHTS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RouteCard route={item} onPress={() => navigation.navigate('FlightDetails', { flight: item })} />}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 15 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1 },
    headerTitle: { fontSize: 22, fontWeight: 'bold' },
    
    routeCard: { height: 200, marginBottom: 20, },
    routeImage: { flex: 1 },
    routeCardOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 16, padding: 15, justifyContent: 'space-between', },
    favoriteButton: { alignSelf: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 50, padding: 8, },
    routeName: { color: '#fff', fontSize: 20, fontWeight: 'bold', },
    routeCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
    statusContainer: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
    statusText: { fontSize: 12, fontWeight: 'bold' },
    durationText: { color: '#e2e8f0', fontSize: 14, fontWeight: '600' },
});
