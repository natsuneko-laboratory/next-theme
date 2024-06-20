# @natsuneko-laboratory/next-theme

Integrate custom theme feature into your Next.js project.

## Installation

```bash
$ npm install @natsuneko-laboratory/next-theme
```

## Usage

Import Provider to your `layout.tsx` or `app.tsx`:

```tsx
import { ThemeProvider } from "@natsuneko-laboratory/next-theme/components/ThemeProvider";

const ApplicationRootLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = await getTheme("light"); // throws compile error in this section

  return (
    <ThemeProvider theme={theme}>
      <html className={theme}>
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
};
```

And create a server action in your any file:

```tsx
// @/app/actions/theme.ts
"use server";

import {
  setTheme as setThemeInternal,
  getTheme as getThemeInternal,
} from "@natsuneko-laboratory/next-theme/actions/theme";
import { cookies } from "next/headers";

export const setTheme = setThemeInternal;

export const getTheme = getThemeInternal;
```

Import the server action in your `layout.tsx` or `app.tsx`:

```tsx
import { getTheme } from "@/app/actions/theme"; // add to head section to avoid compile error
```

Reference current theme in your component:

```tsx
// client
import { useTheme } from "@natsuneko-laboratory/next-theme/components/ThemeProvider";

const theme = useTheme();

// server
import { getTheme } from "@/app/actions/theme";

const theme = await getTheme("light"); // must specify default theme
```

## License

MIT by [@6jz](https://to.natsuneko.com/6jz)
