import { useEffect, useState } from "react";

export const useUserRole = () => {
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "role") setRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { role, setRole};
};
