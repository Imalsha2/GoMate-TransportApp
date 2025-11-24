import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  bookings: [],
  favorites: [], // Add favorites state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.bookings = [];
      state.favorites = []; // Clear favorites on logout
    },
    addBooking(state, action) {
      state.bookings.unshift(action.payload);
    },
    // --- Reducers for favorites ---
    addFavorite(state, action) {
      // Prevent duplicates
      if (!state.favorites.some(fav => fav.id === action.payload.id)) {
          state.favorites.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { login, logout, addBooking, addFavorite, removeFavorite } = authSlice.actions;
export default authSlice.reducer;
