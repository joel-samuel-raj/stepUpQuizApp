import { createTheme, ThemeProvider } from "@mui/material"
import type { AppProps } from "next/app"
import { UserProviders } from "../../context/UserContext"
import "../assets/styles/tailwind.css"
import { AppProvider } from "./appcontext"
const theme = createTheme( {
  palette: {
    primary: {
      main: '#651cb1',
    },
    secondary: {
      main: '#c725c7',
    },
  },
} )

function MyApp ( { Component, pageProps }: AppProps ) {
  return (
    <AppProvider>
      <ThemeProvider theme={ theme }>
        <Component { ...pageProps } />
      </ThemeProvider>
    </AppProvider>
  )
}

export default MyApp
