import { useState, useEffect } from "react";

import { useRouter } from "../hooks/routes/useRouter";

import { useAuthContext } from "../hooks/contexts/useAuthContext";

// ----------------------------------------------------------------------

export const AuthGuard = ({ children }) => {
  const router = useRouter();

  const { isAuthenticated, loading } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    setIsChecking(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);

  if (isChecking) {
    return "Checking...";
  }

  return <>{children}</>;
};

export default AuthGuard;
