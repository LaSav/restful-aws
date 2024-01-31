import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userEvents: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setUserEvents: (state, action) => {
      state.userEvents = action.payload;
    },
  },
});

export const { setUserEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
