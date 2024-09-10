// Create Api slice to define all queries and mutations to fetch and cache the server data.
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Set base url
const apiBaseUrl = "/api/v1";
const adminBaseUrl = "";

/**
 * Sets baseUrl and prepares headers to use in every query and mutation.
 * 
 * @param {String} rootUrl main url to use in query.
 * @param {String} subUrl url related to Api.
 * @returns Base query to use in every query and mutation
 */
const getBaseQuery = (rootUrl, subUrl) => {
  return fetchBaseQuery({
    baseUrl: rootUrl + subUrl,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      // Set token to `Authorization` header, if present in localStorage.
      const token = window.localStorage.getItem("hajiFlourMillJWTToken");

      if (token) headers.set("Authorization", token);

      return headers;
    }
  })
}

// Provides mutation to login Admin.
export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: getBaseQuery(adminBaseUrl, "/admin"),
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials
      })
    })
  })
});

export const { useLoginAdminMutation } = adminApi;


// Provides Queries and Mutations related to Services.
// Uses tags to cache the data of the query.
// Invalidates tags based on the mutation to invalidate the cache related to the tag and refetces on next request.
export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: getBaseQuery(apiBaseUrl, "/services"),
  endpoints: (builder) => ({

    addService: builder.mutation({
      query: (newservice) => ({
        url: "/add",
        method: "POST",
        body: newservice
      }),
      invalidatesTags: ["Services"]
    }),

    updateService: builder.mutation({
      query: ({id, updatedServiceDetails}) => ({
        url: `update/${id}`,
        method: "PUT",
        body: updatedServiceDetails
      }),
      invalidatesTags: ["Services"]
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Services"]
    }),
    
    getAllServices: builder.query({
      query: () => "all",
      providesTags: ["Services"]
    })
  })
});

export const { useAddServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation, useGetAllServicesQuery } = serviceApi;


// Provides Queries and Mutations related to Users.
// Uses tags to cache the data of the query.
// Invalidates tags based on the mutation to invalidate the cache related to the tag and refetces on next request.
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: getBaseQuery(apiBaseUrl, "/users"),
  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query: (userdetails) => ({
        url: "register",
        method: "POST",
        body: userdetails
      }),
      invalidatesTags: ["User", "Users"]
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials
      })
    }),

    initUser: builder.mutation({
      query: () => ({
        url: "verify",
        method: "POST",
      })
    }),

    getUser: builder.query({
      query: (id) => `user/${id}`,
      providesTags: ["User"]
    }),
    
    getAllUsers: builder.query({
      query: () => "all",
      providesTags: ["Users"]
    })

  })
})

export const { useRegisterUserMutation, useLoginUserMutation, useInitUserMutation, useGetUserQuery, useGetAllUsersQuery } = userApi;


// Provides Queries and Mutations related to Entries.
// Uses tags to cache the data of the query.
// Invalidates tags based on the mutation to invalidate the cache related to the tag and refetces on next request.
export const entryApi = createApi({
  reducerPath: "entryApi",
  baseQuery: getBaseQuery(apiBaseUrl, "/entries"),
  endpoints: (builder) => ({

    addNewEntry: builder.mutation({
      query: (entryDetails) => ({
        url: "new",
        method: "POST",
        body: entryDetails
      }),
      invalidatesTags: ["UserEntries", "AllEntries"]
    }),

    getAllEntries: builder.query({
      query: () => "all",
      providesTags: ["AllEntries"]
    }),

    getUserEntries: builder.query({
      query: (username) => `user/${username}`,
      providesTags: ["UserEntries"]
    })
  })
});

export const { useAddNewEntryMutation, useGetUserEntriesQuery, useGetAllEntriesQuery } = entryApi;