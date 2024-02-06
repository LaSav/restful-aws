import { apiSlice } from './apiSlice';
const EVENTS_URL = '/api/events';

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchEvents: builder.query({
      query: () => `${EVENTS_URL}/`,
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ['Events'],
    }),
    createEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Events'],
    }),
    fetchEvent: builder.query({
      query: (id) => `${EVENTS_URL}/${id}`,
    }),
  }),
});

export const {
  useFetchEventsQuery,
  useCreateEventMutation,
  useFetchEventQuery,
} = eventsApiSlice;
