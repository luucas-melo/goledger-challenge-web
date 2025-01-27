import React, { useEffect } from 'react'
import Layout from 'components/Layout'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { StylesProvider } from '@material-ui/styles'
import GlobalStyle from 'styles/global'
import light from 'theme/light'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={light}>
      <StylesProvider injectFirst>
        <Layout>
          <Component {...pageProps} />
          <GlobalStyle />
          <ToastContainer />
        </Layout>
      </StylesProvider>
    </ThemeProvider>
  )
}
export default MyApp
