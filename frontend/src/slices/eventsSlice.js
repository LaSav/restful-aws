import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userEvents: [],
  createdEvent: {},
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setUserEvents: (state, action) => {
      state.userEvents = action.payload;
    },
    setCreatedEvent: (state, action) => {
      state.createdEvent = action.payload;
    },
  },
});

export const { setUserEvents, setCreatedEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
