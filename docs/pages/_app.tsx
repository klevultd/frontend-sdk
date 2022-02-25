import "../styles/globals.css"
import type { AppProps } from "next/app"
import React from "react"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <link
          rel="icon"
          href="/cropped-klevu-icon-32x32.png"
          sizes="32x32"
        ></link>
        <link
          rel="icon"
          href="/cropped-klevu-icon-192x192.png"
          sizes="192x192"
        ></link>
        <link
          rel="apple-touch-icon-precomposed"
          href="/cropped-klevu-icon-180x180.png"
        ></link>
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
