import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allEvents: [],
  event: {},
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.allEvents = action.payload;
    },
    addEvent: (state, action) => {
      state.allEvents = [...state.allEvents, action.payload];
    },
  },
});

export const { setEvents, addEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
