import React from 'react';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import DetailsScreen from '../screens/DetailsScreen';
import FlightsScreen from '../screens/FlightsScreen';
import FlightDetailsScreen from '../screens/FlightDetailsScreen';
import ReviewAndPayScreen from '../screens/ReviewAndPayScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
// import PlacesScreen from '../screens/PlacesScreen'; // REMOVED
import BusesScreen from '../screens/BusesScreen';
import BusDetailsScreen from '../screens/BusDetailsScreen';
import TrainsScreen from '../screens/TrainsScreen';
import TrainDetailsScreen from '../screens/TrainDetailsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Flights" component={FlightsScreen} />
          <Stack.Screen name="FlightDetails" component={FlightDetailsScreen} />
          <Stack.Screen name="ReviewAndPay" component={ReviewAndPayScreen} /> 
          <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} /> 
          <Stack.Screen name="Confirmation" component={ConfirmationScreen} /> 
          {/* <Stack.Screen name="Places" component={PlacesScreen} /> */}{/* REMOVED */}
          <Stack.Screen name="Buses" component={BusesScreen} /> 
          <Stack.Screen name="BusDetails" component={BusDetailsScreen} /> 
          <Stack.Screen name="Trains" component={TrainsScreen} /> 
          <Stack.Screen name="TrainDetails" component={TrainDetailsScreen} /> 
          <Stack.Screen name="EditProfile" component={EditProfileScreen} /> 
          <Stack.Screen name="Settings" component={SettingsScreen} /> 
          <Stack.Screen name="HelpCenter" component={HelpCenterScreen} /> 
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
