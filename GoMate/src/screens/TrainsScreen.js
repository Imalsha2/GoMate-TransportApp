import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/authSlice';
import { ALL_ROUTES } from '../data/Routes';
import { useTheme } from '../context/ThemeContext';

const TRAINS_DATA = ALL_ROUTES.routes.filter(r => r.type === 'Train');

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
                            <View style={styles.statusContainer}>
                                <View style={[styles.statusDot, { backgroundColor: route.status === 'Upcoming' ? themeColors.primary : themeColors.success }]} />
                                <Text style={[styles.statusText, { color: route.status === 'Upcoming' ? themeColors.primary : themeColors.success }]}>{route.status}</Text>
                            </View>
                            <Text style={styles.durationText}>{route.duration}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default function TrainsScreen({ navigation }) {
    const { themeColors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
         <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={themeColors.text} /></TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Train Routes</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={TRAINS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RouteCard route={item} onPress={() => navigation.navigate('TrainDetails', { train: item })} />}
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
    statusContainer: { flexDirection: 'row', alignItems: 'center' },
    statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
    statusText: { fontSize: 12, fontWeight: '600' },
    durationText: { color: '#e2e8f0', fontSize: 12, },
});
