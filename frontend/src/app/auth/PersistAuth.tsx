import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import usePersist from "@/hooks/usePersist";
import { selectCurrentToken } from "./auth.slice";
import { useRefreshMutation } from "./auth.api.slice";


/**
 * Persists login.
 */
const PersistAuth = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isLoading, isError, isSuccess, isUninitialized }] = useRefreshMutation();

  // Verify if the refresh token is valid.
  useEffect((): any => {
    async function verifyRefreshToken() {
      try {
        await refresh("");
        setTrueSuccess(true);
      } catch (err) {
        console.error(err);
      }
    }

    if ((effectRan.current === true || process.env.NODE_ENV !== "development") && !token)
        verifyRefreshToken() as unknown as void;

    return () => effectRan.current = true;
  }, []);

  // No persist.
  if (!persist)
    return <Outlet />;
  
  // Persist, but no token.
  else if (isLoading)
    return <p className='loading'>Loading...</p>;
  
  // Persist and token.
  else if ((isSuccess && trueSuccess) || (token && isUninitialized))
    return <Outlet />;
  
  // Error occurred.
  else if (isError)
    return <Navigate to='/login' />;
}

export default PersistAuth;
