import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/authSlice';
import { ALL_ROUTES } from '../data/Routes';
import { useTheme } from '../context/ThemeContext';

const POPULAR_ROUTES = ALL_ROUTES.routes.filter(r => ['SL001', 'SL002', 'SL003', 'SL004'].includes(r.id));
const CATEGORIES = [ { name: 'Flights', icon: 'airplane-outline' }, { name: 'Buses', icon: 'bus-outline' }, { name: 'Trains', icon: 'train-outline' } ];

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
            case 'Popular': return { dot: themeColors.accent, text: themeColors.accent };
            case 'Upcoming': return { dot: themeColors.primary, text: themeColors.primary };
            default: return { dot: themeColors.success, text: themeColors.success };
        }
    };

    const statusStyle = getStatusStyle(route.status);

    return (
        <TouchableOpacity style={[styles.routeCard, {backgroundColor: themeColors.card}]} onPress={onPress}>
            <Image source={{ uri: route.image }} style={styles.routeImage} />
            <View style={styles.routeContent}>
                <View style={[styles.routeTypeBadge, {backgroundColor: 'rgba(59, 130, 246, 0.2)'}]}><Text style={[styles.routeTypeText, {color: themeColors.primary}]}>{route.type}</Text></View>
                <Text style={[styles.routeName, {color: themeColors.text}]} numberOfLines={1}>{route.name}</Text>
                <View style={styles.routeFooter}>
                    <View style={styles.statusContainer}>
                        <View style={[styles.statusDot, { backgroundColor: statusStyle.dot }]} />
                        <Text style={[styles.statusText, { color: statusStyle.text }]}>{route.status}</Text>
                    </View>
                    <Text style={[styles.durationText, {color: themeColors.textSecondary}]}>{route.duration}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default function HomeScreen({ navigation }) {
    const { user } = useSelector(state => state.auth);
    const [activeCategory, setActiveCategory] = useState('Buses');
    const { theme, themeColors } = useTheme();
    
    const handleCategoryPress = (categoryName) => {
        setActiveCategory(categoryName);
        if (['Flights', 'Buses', 'Trains'].includes(categoryName)) {
            navigation.navigate(categoryName);
        }
    };

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: themeColors.background}]} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, {color: themeColors.text}]}>Good morning, {user?.name || 'Alex'}</Text>
                    <TouchableOpacity style={[styles.profileIconContainer, {backgroundColor: themeColors.card}]} onPress={() => navigation.navigate('Profile')}>
                        <Ionicons name="person-circle-outline" size={40} color={themeColors.icon} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.searchContainer, {backgroundColor: themeColors.card}]}>
                    <Ionicons name="search" size={22} color={themeColors.icon} />
                    <TextInput placeholder="Search destinations, routes..." placeholderTextColor={themeColors.textSecondary} style={[styles.searchInput, {color: themeColors.text}]} />
                    <TouchableOpacity style={[styles.filterButton, {backgroundColor: themeColors.primary}]}><Ionicons name="options" size={24} color={themeColors.background} /></TouchableOpacity>
                </View>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
                    {CATEGORIES.map((category) => {
                        const isActive = activeCategory === category.name;
                        return (
                            <TouchableOpacity 
                                key={category.name} 
                                style={[styles.categoryChip, {backgroundColor: isActive ? themeColors.primary : themeColors.card}]} 
                                onPress={() => handleCategoryPress(category.name)}
                            >
                                <Ionicons name={category.icon} size={20} color={isActive ? '#fff' : themeColors.icon} />
                                <Text style={[styles.categoryText, {color: isActive ? '#fff' : themeColors.text}]}>{category.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>

                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, {color: themeColors.text}]}>Popular Routes</Text>
                    <TouchableOpacity><Text style={{color: themeColors.primary}}>See All</Text></TouchableOpacity>
                </View>

                <View style={{paddingHorizontal: 20}}>
                    {POPULAR_ROUTES.map(item => <RouteCard key={item.id} route={item} onPress={() => navigation.navigate('Details', { item })} />)}
                </View>

                <View style={{height: 100}} />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ 
    container: { flex: 1 }, 
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, }, 
    headerTitle: { fontSize: 26, fontWeight: 'bold', flex: 1 }, 
    profileIconContainer: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center'}, 
    searchContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, marginHorizontal: 20, paddingHorizontal: 15, marginTop: 10, },
    searchInput: { flex: 1, paddingVertical: 14, fontSize: 16, marginLeft: 10, }, 
    filterButton: { borderRadius: 8, padding: 8, }, 
    categoryContainer: { paddingHorizontal: 20, paddingVertical: 15 }, 
    categoryChip: { flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginRight: 10, }, 
    categoryText: { marginLeft: 8, fontWeight: '600', }, 
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20, marginBottom: 15, }, 
    sectionTitle: { fontSize: 20, fontWeight: 'bold', },
    
    routeCard: { flexDirection: 'row', borderRadius: 16, marginBottom: 15, overflow: 'hidden' },
    routeImage: { width: 100, height: 120, resizeMode: 'cover' },
    routeContent: { flex: 1, padding: 15, justifyContent: 'center' },
    routeTypeBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 8 },
    routeTypeText: { fontWeight: 'bold', fontSize: 10 },
    routeName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    routeFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
    statusContainer: { flexDirection: 'row', alignItems: 'center' },
    statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
    statusText: { fontSize: 12, fontWeight: '600' },
    durationText: { fontSize: 12 },
});