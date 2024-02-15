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
    addEvent: (state, action) => {},
  },
});

export const { setEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
