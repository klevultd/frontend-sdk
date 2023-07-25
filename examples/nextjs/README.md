This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Klevu specific code

In this example, a simple search results page is implemented with SSR loading.

### Configuration

In [layout.tsx](app/layout.tsx) file we define the configuration for the server side and we inject [ClientKlevuConfig](app/clientKlevuConfig.ts) component that injects the same configuration only on the client side. Now we can run SDK both in the backend and frontend.

### SSR loading

Application contains a search route in [search](app/search/) folder. [page.tsx](app/search/page.tsx) is a standard Next.js app
page that does the first fetching of data in server-side from Klevu. This result is packed and transferred to frontend component [Grid](app/search/grid.tsx)

Both Page and Grid will do the same query that is defined in the [common.ts](app/search/common.ts) file. This allows SDK to run load up the same functionality so that frontend can continue from where the backend has left things.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
