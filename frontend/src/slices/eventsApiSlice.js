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
      providesTags: ['Event'],
    }),
    updateEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `${EVENTS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `${EVENTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Events'],
    }),
    attendEvent: builder.mutation({
      query: (id) => ({
        url: `${EVENTS_URL}/${id}/attend`,
        method: 'PUT',
      }),
      invalidatesTags: ['Event', 'Events'],
    }),
  }),
});

export const {
  useFetchEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useFetchEventQuery,
  useDeleteEventMutation,
  useAttendEventMutation,
} = eventsApiSlice;
