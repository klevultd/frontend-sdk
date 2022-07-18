# Klevu Hydrogen example


This example uses pieces from [React example](../react/) to show that it works with Hydrogen.

The main difference to normal React applications is that Hydrogen requires initialization on the server side and client.

Server initialization is done in `App.server.tsx` file and for the frontend, it's done by importing init.ts before loading other frontend code.

Axios is also required by server-side in order to make requests. If using Node.js version that supports `fetch()` then Axios is not required.

### What you need to know from Klevu-Hydrogen integration

You can pass _only_ JSON data from server components to client components. `@klevu/core` enriches this JSON data with helper functions for easier usage. For this reason you need to use raw API response to first render the page and then use function special functions to enrich this data to get these helper functions to use.

For example, how this works there is [searchResultPage.client.tsx](./src/components/searchResultPage.client.tsx) which takes server-side JSON and adds client-side magic on top. And then there is [grid.client.tsx](./src/components/grid.client.tsx) which takes this result and uses `FetchResultEvents()` function to create helper events.


## Hydrogen TypeScript Example

Hydrogen is a React framework and SDK that you can use to build fast and dynamic Shopify custom storefronts.

[Check out the docs](https://shopify.dev/custom-storefronts/hydrogen)

[Run this template on StackBlitz](https://stackblitz.com/github/Shopify/hydrogen/tree/stackblitz/templates/hello-world-ts)

## Getting started

**Requirements:**

- Node.js version 16.5.0 or higher

## Building and running

First, you need to build react example components as library. These are used in this project.

```
cd ../react
npm run build:lib
```

Then you can run a development build to get results.

```bash
npm run dev
```

Due to how example is built live preview of project is not working.