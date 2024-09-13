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
    // Login Admin request.
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials
      })
    })
  })
});

// Export all automatically generated hooks to perform requests from components.
export const { useLoginAdminMutation } = adminApi;


// Provides Queries and Mutations related to Services.
// Uses tags to cache the data of the query.
// Invalidates tags based on the mutation to invalidate the cache related to the tag and refetches on next request.
export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: getBaseQuery(apiBaseUrl, "/services"),
  endpoints: (builder) => ({

    // Add new service request.
    addService: builder.mutation({
      query: (newservice) => ({
        url: "/add",
        method: "POST",
        body: newservice
      }),
      invalidatesTags: ["Services"]
    }),

    // Update service request.
    updateService: builder.mutation({
      query: ({id, updatedServiceDetails}) => ({
        url: `update/${id}`,
        method: "PUT",
        body: updatedServiceDetails
      }),
      invalidatesTags: ["Services"]
    }),

    // Delete service request.
    deleteService: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Services"]
    }),
    
    // Get all services request.
    getAllServices: builder.query({
      query: () => "all",
      providesTags: ["Services"]
    })
  })
});

// Export all automatically generated hooks to perform requests from components.
export const { useAddServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation, useGetAllServicesQuery } = serviceApi;


// Provides Queries and Mutations related to Users.
// Uses tags to cache the data of the query.
// Invalidates tags based on the mutation to invalidate the cache related to the tag and refetches on next request.
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: getBaseQuery(apiBaseUrl, "/users"),
  endpoints: (builder) => ({

    // Register new user request.
    registerUser: builder.mutation({
      query: (userdetails) => ({
        url: "register",
        method: "POST",
        body: userdetails
      }),
      invalidatesTags: ["User", "Users"]
    }),

    // Login user request.
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials
      })
    }),

    // Verify user and token request.
    initUser: builder.mutation({
      query: () => ({
        url: "verify",
        method: "POST",
      })
    }),

    // Get a user with id or username request.
    getUser: builder.query({
      query: (identifier) => `user/${identifier}`,
      providesTags: ["User"]
    }),
    
    // Get all users request.
    getAllUsers: builder.query({
      query: () => "all",
      providesTags: ["Users"]
    })

  })
})

// Export all automatically generated hooks to perform requests from components.
export const { useRegisterUserMutation, useLoginUserMutation, useInitUserMutation, useGetUserQuery, useGetAllUsersQuery } = userApi;


// Provides Queries and Mutations related to Entries.
// Uses tags to cache the data of the query.
// Invalidates tags based on the mutation to invalidate the cache related to the tag and refetches on next request.
export const entryApi = createApi({
  reducerPath: "entryApi",
  baseQuery: getBaseQuery(apiBaseUrl, "/entries"),
  endpoints: (builder) => ({

    // Add new entry request.
    addNewEntry: builder.mutation({
      query: (entryDetails) => ({
        url: "new",
        method: "POST",
        body: entryDetails
      }),
      invalidatesTags: ["UserEntries", "AllEntries"]
    }),

    // Get all entries request.
    getAllEntries: builder.query({
      query: () => "all",
      providesTags: ["AllEntries"]
    }),

    // Get a user's entries request.
    getUserEntries: builder.query({
      query: (username) => `user/${username}`,
      providesTags: ["UserEntries"]
    })
  })
});

// Export all automatically generated hooks to perform requests from components.
export const { useAddNewEntryMutation, useGetUserEntriesQuery, useGetAllEntriesQuery } = entryApi;

// Provides Queries and Mutations related to Reviews.
// Uses tags to cache the data of the query.
// Invalidates tags based on the mutation to invalidate the cache related to the tag and refetches on next request.
export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: getBaseQuery(apiBaseUrl, "/reviews"),
  endpoints: (builder) => ({

    // Add a new review request.
    addReview: builder.mutation({
      query: (reviewDetails) => ({
        url: "add",
        method: "POST",
        body: reviewDetails
      }),
      invalidatesTags: ["AllReviews", "ServiceReviews", "UserReviews"]
    }),

    // Get all reviews request.
    getAllReviews: builder.query({
      query: () => "all",
      providesTags: ["AllReviews"]
    }),

    // Get reviews of a service request.
    getServiceReviews: builder.query({
      query: (serviceId) => `service/${serviceId}`,
      providesTags: ["ServiceReviews"]
    }),

    // Get reviews by a user request.
    getReviewsByUser: builder.query({
      query: (username) => `user/${username}`,
      providesTags: ["UserReviews"]
    })
  })
});

// Export all automatically generated hooks to perform requests from components.
export const { useAddReviewMutation, useGetAllReviewsQuery, useGetServiceReviewsQuery, useGetReviewsByUserQuery } = reviewApi;