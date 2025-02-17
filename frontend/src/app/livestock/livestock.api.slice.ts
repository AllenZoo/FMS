import { apiSlice } from "@/app/api/api.slice";

export const livestockApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all livestock.
    getAllLivestock: builder.query<RestResult<LivestockDTO[]>, void>({
      query: () => ({
        url: "/livestock",
        method: "GET",
      }),
      providesTags: ["Livestock"],
    }),

    // Get filtered livestock.
    getFilteredLivestock: builder.query<
      RestResult<LivestockDTO[]>,
      Record<string, string>
    >({
      query: (queryParams) => ({
        url: `/livestock/filtered?${new URLSearchParams(queryParams)}`,
        method: "GET",
      }),
      providesTags: ["Livestock"],
    }),

    // Get filtered livestock count.
    getFilteredLivestockCount: builder.query<
      RestResult<CountResponse>,
      Record<string, string>
    >({
      query: (queryParams) => ({
        url: `/livestock/count?${new URLSearchParams(queryParams)}`,
        method: "GET",
      }),
      providesTags: ["Livestock"],
    }),

    // Get livestock by id.
    getLivestockById: builder.query<RestResult<LivestockDTO>, Number>({
      query: (id: number) => ({
        url: `/livestock/${id}`,
        method: "GET",
      }),
      providesTags: ["Livestock"],
    }),

    // Create livestock.
    createLivestock: builder.mutation({
      query: (livestock: LivestockDTO) => ({
        url: "/livestock",
        method: "POST",
        body: livestock,
      }),
      invalidatesTags: ["Livestock"],
    }),

    // Update livestock.
    updateLivestock: builder.mutation({
      query: (livestock: LivestockDTO) => ({
        url: `/livestock/${livestock.tag_id}`,
        method: "PUT",
        body: livestock,
      }),
      invalidatesTags: ["Livestock"],
    }),

    // Delete livestock.
    deleteLivestock: builder.mutation({
      query: (id: number) => ({
        url: `/livestock/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Livestock"],
    }),
  }),
});

export const {
  useGetAllLivestockQuery,
  useGetFilteredLivestockQuery,
  useGetFilteredLivestockCountQuery,
  useGetLivestockByIdQuery,
  useCreateLivestockMutation,
  useUpdateLivestockMutation,
  useDeleteLivestockMutation,
} = livestockApiSlice;
