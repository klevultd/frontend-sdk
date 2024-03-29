import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClientKlevuConfig } from "./clientKlevuConfig"
import { KlevuConfig } from "@klevu/core"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

/**
 * Set server side Klevu configuration
 */
KlevuConfig.init({
  url: "https://eucs29v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-164651914788114877",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Setting configuration for client side */}
      <ClientKlevuConfig />
      <body className={inter.className}>
        <div className="p-8">{children}</div>
      </body>
    </html>
  )
}
