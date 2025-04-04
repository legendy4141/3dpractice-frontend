import {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  createContext,
} from "react";

import { getSession, getTimeToLive, setSession } from "../utils/auth.js";

import axios from "axios";

const initialToken = getSession();

export const AuthContext = createContext({
  user: null,
  loading: false,
  isAuthenticated: false,
  signIn: (token) => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState(initialToken);
  const timeToLive = useMemo(() => getTimeToLive(token), [token]);
  const timerId = useRef();

  const signIn = useCallback((newToken: string) => {
    setSession(newToken);
    setToken(newToken);
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
    setToken(null);
  }, []);

  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data");
      signOut(); // Automatically sign out if token is invalid
    } finally {
      setLoading(false);
    }
  }, [token, signOut]);

  const expireToken = useCallback(() => {
    setToken(null);
    setSession(null);
    setError(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      if (timeToLive <= 0) {
        expireToken();
      }
      fetchMe();
    }
  }, [token, timeToLive, expireToken, fetchMe]);

  useEffect(() => {
    if (error) {
      expireToken();
      return;
    }

    if (!timerId.current) {
      timerId.current = setTimeout(() => {
        expireToken();
      }, timeToLive);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timerId.current);
    };
  }, [timeToLive, error, expireToken]);

  const memoizedValue = useMemo(
    () => ({ user, token, isAuthenticated: !!token, loading, signIn, signOut }),
    [user, token, loading, signIn, signOut]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
