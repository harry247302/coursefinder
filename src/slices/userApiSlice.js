import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/partner`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    userBlock: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/block/${data.userId}`,
        method: 'PUT',
        body: data.status
      }),
    }),
    CountryGet: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/secondcountry`,
        method: 'GET',
      }),
    }),
    CountryGetOne: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/secondcountry/${data}`,
        method: 'GET',
      
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile/${data.id}`,
        method: 'PUT',
        body: data.raw,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,  
  useUserBlockMutation,
  useCountryGetMutation,
  useCountryGetOneMutation,
  useUpdateUserMutation
} = userApiSlice;
