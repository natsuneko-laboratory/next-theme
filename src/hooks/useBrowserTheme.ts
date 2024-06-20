"use client";

import { useCallback, useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
};

type Theme = "light" | "dark";

const useBrowserTheme = () => {
  const setTheme = useCallback((theme: Theme) => {
    window.localStorage.setItem("theme", theme);
    window.dispatchEvent(new Event("storage"));
  }, []);

  const getSystemColorTheme = useCallback(() => {
    return typeof window !== "undefined"
      ? window?.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : null;
  }, []);

  const theme =
    useSyncExternalStore(
      subscribe,
      () => window.localStorage.getItem("theme") as Theme,
      () => null
    ) ?? getSystemColorTheme();

  return { setTheme, theme } as const;
};

export { useBrowserTheme };
export type { Theme };
