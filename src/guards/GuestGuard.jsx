import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "../hooks/routes";

import { useAuthContext } from "../hooks/contexts/useAuthContext";

export const GuestGuard = ({ children }) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { loading, isAuthenticated } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const returnTo = searchParams.get("returnTo") || "/";

  const checkPermissions = async () => {
    if (loading) {
      return;
    }

    if (isAuthenticated) {
      router.replace(returnTo);
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);

  if (isChecking) {
    return "Checking...";
  }

  return <>{children}</>;
};

export default GuestGuard;
