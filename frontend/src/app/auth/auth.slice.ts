import { createSlice } from "@reduxjs/toolkit";

import jwtDecode from "jwt-decode";

interface AuthState {
  token: string | null;
}

/**
 * Sets document cookie to the value of the access token.
 * @param accessToken Access token. If not provided, cookie is deleted.
 *
 * Note: temp jwtDecode<any> type to resolve build errors.
 */
function setTokenCookie(accessToken: string | void): void {
  if (!accessToken)
    document.cookie = `fms_access=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  else
    document.cookie = `fms_access=${accessToken}; expires=${new Date(
      jwtDecode<any>(accessToken).exp * 1000
    ).toUTCString()}; path=/`;
}

/**
 * Gets the access token from the document cookie.
 * @returns Access token.
 */
function getTokenCookie(): string | null {
  const initToken = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("fms_access="));

  // If persist is false, delete the cookie.
  if (localStorage.getItem("persist") === "false") {
    setTokenCookie();
    return null;
  }

  return initToken ? initToken.split("=")[1] : null;
}

/**
 * Slice for authentication.
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getTokenCookie(),
  } as AuthState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload as { accessToken: string };
      state.token = accessToken;
      setTokenCookie(accessToken);
    },
    logOut: (state, action?) => {
      state.token = null;
      setTokenCookie();

      // Temp
      console.log(action);
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const selectCurrentToken = (state: unknown & { auth: AuthState }) =>
  state.auth.token as keyof AuthState;
export default authSlice.reducer;
