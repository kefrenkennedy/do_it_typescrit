import { extendTheme, theme as ChackraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    purple: {
      500: "#8615df",
      600: "#570e91",
      800: "#38085c",
      900: "#190429",
    },
    gray: {
      50: "#f6f6f7",
      100: "#eee",
      200: "#d4d4d4",
      300: "#9e9ea7",
      400: "#666665",
      900: "#111",
    },
    red: {
      600: "#df1545",
    },
    green: {
      600: "#168821",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
  },
});
