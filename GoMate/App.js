import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { toggleTheme as toggleThemeAction } from './src/redux/themeSlice';

const AppWrapper = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  return (
    <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  );
}
