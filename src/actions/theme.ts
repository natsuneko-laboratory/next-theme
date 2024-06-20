"use server";

import { cookies } from "next/headers";
import type { Theme } from "../hooks/useBrowserTheme";

export const setTheme = async (theme: Theme) => {
  cookies().set("theme", theme, {
    httpOnly: true,
    sameSite: "lax",
  });
};

export const getTheme = async (initial: Theme) => {
  const theme = cookies().get("theme")?.value;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (theme as any as Theme | undefined) ?? initial;
};
