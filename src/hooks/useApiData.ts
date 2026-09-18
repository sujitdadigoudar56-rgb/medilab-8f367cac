import { useEffect, useState, useCallback } from "react";
import { apiGet } from "@/lib/api";

export function useApiData<T>(path: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    apiGet<T>(path)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        console.error(`Failed to load ${path}:`, err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [path, reloadKey]);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  return { data, loading, refetch };
}
