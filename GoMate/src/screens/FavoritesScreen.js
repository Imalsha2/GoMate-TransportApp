import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/authSlice';
import { ALL_ROUTES } from '../data/Routes';
import { useTheme } from '../context/ThemeContext';

const FavoriteCard = ({ item, onPress, onRemove }) => {
    const { themeColors } = useTheme();
    return (
        <TouchableOpacity style={[styles.card, {backgroundColor: themeColors.card}]} onPress={onPress}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, {color: themeColors.text}]} numberOfLines={1}>{item.name}</Text>
                <Text style={[styles.cardSubtitle, {color: themeColors.textSecondary}]}>{item.type}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
                <Ionicons name="trash-outline" size={22} color={themeColors.error} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

export default function FavoritesScreen({ navigation }) {
    const { favorites } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { theme, themeColors } = useTheme();

    const handleRemove = (item) => {
        dispatch(removeFavorite(item));
    };

    const handlePress = (favoriteItem) => {
        const routeData = ALL_ROUTES.routes.find(r => r.id === favoriteItem.id);
        if (!routeData) {
            console.error("Route data not found for favorite:", favoriteItem);
            return;
        }

        const item = { ...routeData, ...favoriteItem };

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
                params = { item };
                break;
        }
        navigation.navigate(screenName, params);
    };

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: themeColors.background}]}>
            <View style={[styles.header, {borderBottomColor: themeColors.border}]}>
                <Text style={[styles.headerTitle, {color: themeColors.text}]}>My Favorites</Text>
            </View>

            {favorites && favorites.length > 0 ? (
                <FlatList
                    data={favorites}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <FavoriteCard 
                            item={item} 
                            onPress={() => handlePress(item)} 
                            onRemove={() => handleRemove(item)} 
                        />
                    )}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
                />
            ) : (
                <View style={styles.emptyView}>
                    <Ionicons name="heart-outline" size={80} color={themeColors.icon} />
                    <Text style={[styles.emptyText, {color: themeColors.text}]}>No Favorites Yet</Text>
                    <Text style={[styles.emptySubText, {color: themeColors.textSecondary}]}>Tap the heart icon on any item to save it here.</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, borderBottomWidth: 1 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },

    card: { flexDirection: 'row', borderRadius: 12, padding: 10, marginBottom: 15, alignItems: 'center' },
    cardImage: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
    cardContent: { flex: 1 },
    cardTitle: { fontSize: 16, fontWeight: 'bold' },
    cardSubtitle: { fontSize: 14, marginTop: 4 },
    removeButton: { padding: 10 },

    emptyView: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
    emptyText: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
    emptySubText: { fontSize: 16, textAlign: 'center', marginTop: 10 },
});
