import { apiSlice } from "@/app/api/api.slice";
import { logOut, setCredentials } from "./auth.slice";

/**
 * Auth API slice.
 */
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login.
    login: builder.mutation({
      query: (credentials: LoginCredentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = (await queryFulfilled) as {
            data: RestResult<string>;
          };
          dispatch(setCredentials({ accessToken: res.data }));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // Logout.
    logout: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = (await queryFulfilled) as {
            data: RestResult<string>;
          };
          // Temp (Todo: remove print statement)
          console.log(res);

          dispatch(logOut(""));
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // Refresh.
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = (await queryFulfilled) as {
            data: RestResult<string>;
          };
          dispatch(setCredentials({ accessToken: res.data }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } =
  authApiSlice;
