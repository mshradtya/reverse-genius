import { extendTheme } from "@chakra-ui/react";

// fonts
import "@fontsource/montserrat/100.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";

const theme = extendTheme({
  colors: {
    brand: {
      // primary: "#007BFF",
      primary: "#304497",
      // secondary: "#3498DB",
      secondary: "#000080",
      textPrimary: "#33333b",
      textSecondary: "#47474f",
    },
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
});

export default theme;
