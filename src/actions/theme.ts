"use server";

import { cookies } from "next/headers";
import type { Theme } from "../hooks/useBrowserTheme";

const ACCEPT_VALUES = ["light", "dark"];

export const setTheme = async (theme: Theme) => {
  if (!ACCEPT_VALUES.includes(theme)) {
    return;
  }

  cookies().set("theme", theme, {
    httpOnly: true,
    sameSite: "lax",
  });
};

export const getTheme = async (initial: Theme): Promise<Theme> => {
  const theme = cookies().get("theme")?.value;
  if (theme) {
    if (ACCEPT_VALUES.includes(theme)) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return theme as any as Theme;
    }
  }

  return initial;
};
