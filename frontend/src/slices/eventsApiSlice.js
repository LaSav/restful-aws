import { apiSlice } from './apiSlice';
const EVENTS_URL = '/api/events';

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchEvents: builder.query({
      query: (data) => ({
        url: `${EVENTS_URL}/`,
        method: 'GET',
        body: data,
      }),
    }),
    createEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}/`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useFetchEventsQuery, useCreateEventMutation } = eventsApiSlice;
