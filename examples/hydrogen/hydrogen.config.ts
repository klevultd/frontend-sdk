import {
  CookieSessionStorage,
  defineConfig,
  PerformanceMetricsServerAnalyticsConnector,
} from "@shopify/hydrogen/config"

export default defineConfig({
  shopify: {
    storeDomain: "klevu-qa.myshopify.com",
    storefrontToken: "d00b3f1931c815a9a8a7cbf119783fea",
    storefrontApiVersion: "2022-07",
  },
  session: CookieSessionStorage("__session", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 60 * 60 * 24 * 30,
  }),
  serverAnalyticsConnectors: [PerformanceMetricsServerAnalyticsConnector],
})
