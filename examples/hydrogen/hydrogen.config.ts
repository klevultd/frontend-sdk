import {
  CookieSessionStorage,
  defineConfig,
  PerformanceMetricsServerAnalyticsConnector,
} from "@shopify/hydrogen/config"

export default defineConfig({
  shopify: {
    storeDomain: "hydrogen-demo-by-klevu.myshopify.com",
    storefrontToken: "e4d424683967b9bab850a08d1fb44ba4",
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
