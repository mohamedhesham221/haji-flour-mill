import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = "/api/v1";

const getBaseQuery = (rootUrl, subUrl) => {
  return fetchBaseQuery({
    baseUrl: rootUrl + subUrl,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      const token = window.localStorage.getItem("hajiFlourMillJWTToken");

      if (token) headers.set("Authorization", token);

      return headers;
    }
  })
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: getBaseQuery("", "/admin"),
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