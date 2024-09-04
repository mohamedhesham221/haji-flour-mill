import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3030/api/v1";

export const servicesApi = createApi({
  reducerPath: "hfmApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + "/services",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => "all",
      providesTags: ["Services"]
    })
  })
});

export const { useGetAllServicesQuery } = servicesApi;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + "/users",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    }
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: JSON.stringify(credentials)
      })
    }),
    
    // getAllUsers: builder.query({
    //   query: () => "all",
    //   providesTags: ["Users"]
    // })

  })
})

export const { useLoginUserMutation } = userApi;

