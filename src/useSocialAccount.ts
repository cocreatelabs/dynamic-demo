import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useSocialAccount = (key: string, queryKey: string) => {
  const router = useRouter();
  const queryValue = router.query[queryKey];
  const [username, setUsername] = useState<null | string>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem(key);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [queryValue, key]);

  useEffect(() => {
    if (queryValue) {
      const actualValue = Array.isArray(queryValue)
        ? queryValue[0]
        : queryValue;
      localStorage.setItem(key, actualValue);
      setUsername(actualValue);
      router.push("/");
    }
  }, [queryValue, router, key]);

  const disconnect = () => {
    localStorage.removeItem(key);
    setUsername(null);
  };

  return { username, disconnect };
};
