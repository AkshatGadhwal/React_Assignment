import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = "https://reqres.in/api/";

export interface UserResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
    support: {
      url: string;
      text: string;
    };
  }
  
  export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }
  
  export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: API_URL,
    }),
    endpoints(builder) {
      return {
        fetchUsers: builder.query<UserResponse, { page: number; per_page: number }>({
          query({ page = 1, per_page = 5 }) {
            return `/users?page=${page}&per_page=${per_page}`;
          },
        }),
      };
    },
  });
  
  export const { useFetchUsersQuery } = apiSlice;
  