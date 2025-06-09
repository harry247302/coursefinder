import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const production = 'https://searchmystudy.com/';
const development = 'http://localhost:5000/'
const baseQuery = fetchBaseQuery({ baseUrl: production
 });

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});