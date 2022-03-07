import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import "../assets/styles/tailwind.css";
const theme = createTheme({
  palette: {
    primary: {
      main: '#651cb1',
    },
    secondary: {
      main: '#c725c7',
    },
  },
});
 
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
        <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
