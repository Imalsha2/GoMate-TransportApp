import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// තිර import කරගැනීම
import HomeScreen from '../screens/HomeScreen';
import SchedulesScreen from '../screens/SchedulesScreen'; // නව තිරය
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';   // නව තිරය

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Schedules') { // Schedules සඳහා icon එක
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') { // Profile සඳහා icon එක
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // --- Dark Mode Tab Bar Styles ---
        tabBarActiveTintColor: '#3b82f6', // Active නිල් පැහැය
        tabBarInactiveTintColor: '#9ca3af', // Inactive අළු පැහැය
        headerShown: false,
        tabBarShowLabel: true, // ලේබල් පෙන්වීම
        tabBarStyle: {
          backgroundColor: '#111827', // Dark background
          borderTopColor: '#374151', // Border වර්ණය
          height: 70, // උස
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        }
        // --- styles අවසානය ---
      })}
    >
      {/* Tab Screens */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Schedules" component={SchedulesScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
