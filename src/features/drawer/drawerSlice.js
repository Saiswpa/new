// drawerSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  activeSlice: null,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setActiveSlice(state, action) {
      state.activeSlice = action.payload;
    },
    toggleDrawer(state) {
      state.isOpen = !state.isOpen;
    },
    setDrawerOpen(state, action) {
      state.isOpen = action.payload;
    },
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setActiveSlice, toggleDrawer, setDrawerOpen, toggle } = drawerSlice.actions;

export default drawerSlice.reducer;
