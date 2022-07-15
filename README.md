![Klevu](images/klevu_header.jpg?raw=true "Klevu")

# Headless product discovery, for every body

With Klevu’s brand new SDK, you can pull the power of AI product discovery into anything.

A traditional website, a single page application (SPA), progressive web app (PWA), a mobile app, a campaign website, an in-store kiosk, a spaceship… whatever.

Simpler for developers, faster to innovate.

# Klevu headless monorepository

Here are the links to different projects.

- [@klevu/core](packages/klevu-core/README.md) package that can be used to build modern frontends with Klevu search.
- [React example](examples/react/) React, React Router, Material UI example.
- [Vue example](examples/vue/) Vue 3, Vue-Router, TailwindCSS example.
- [Nuxt example](examples/nuxt3/) Nuxt 3 example.
- [Remix example](examples/remix/) Remix is a React-based example of using Klevu with Server Side Rendering.
- [Vanilla JavaScript example](examples/vanillajs/) - Minimal JavaScript example.
- [Shopify Hydrogen example](examles/hydrogen/) - Small Hydrogen example

# Integrate Klevu into your application with ease. We do all the heavy lifting.

Klevu SDK brings smart search, category merchandising and recommendations solution to your ecommerce store. Klevu makes it easy to create the best product browsing experience for your customers.

Klevu already has a simple to implement JavaScript library that is perfect for most users, so who is this library good for?

## TypeScript SDK

The Klevu SDK is written in TypeScript which gives you:

- Full auto-completion support of integrated development environments (IDEs)
- Full documenation from the code comments!
- Easy and fast way to integrate Klevu to your custom UI

## SPA (Single Page Applications)

This library supports all the major frontend libraries like React and Vue. This SDK however gives you the ability to plugin Klevu smart search, category merchandizing and recommendations any way that you would like. Including event tracking of product clicks, searches, and purchases that drive the AI at Klevu's core.

## PWA (Progressive Web Applications)

PWAs are designed to give users an experience on par with native apps. With the Klevu SDK, you can also bring the power of Klevu AI into your PWA.

## SSR & SSG (Server Side Rendering & Static Site Generation)

SSR & SSG are quickly becoming standard features in all of the most popular frontend frameworks such as NextJS and NuxtJS. With the Klevu SDK you can both increase your store's SEO and your user's experience by requesting search results, category pages, and recommendations before the page loads.

## Full Creative Control, on Full Power

The Klevu SDK gives developers maximum control over the way they want to display and allow users to interact with your product catalog. When you add the SDK library to your project you have all the building blocks necessary to create trully unique user experiences that perfectly fit your brand.

# Klevu SDK Feature List

We've packed a lot of features into the React Example included with this SDK. Here are many of the features and where to find a working example. You can also take a look a the [React Example README](/examples/react/) for more information on what is implemented in the example and click here to:

## [View a Live Demo](https://headlessdemo.klevu.com/)

## Search

| Feature                     | Description                                                           | Example                                                                                                                                     |
| --------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Quick Search                | Example used to display search results as you type into a text field. | [quicksearch.tsx](/examples/react/src/components/quicksearch.tsx)                                                                           |
| Search Results Landing Page | Example to show search results based on a keyword passed in the URL.  | [SearchResultPage.tsx](/examples/react/src/routes/SearchResultPage.tsx)                                                                     |
| Category Navigation         | Example display of products in a Category/Collection.                 | [CategoryPage.tsx](/examples/react/src/routes/CategoryPage.tsx)                                                                             |
| Single Product Search       | Example of using search to query the data for a single product.       | [ProductPage.tsx](/examples/react/src/routes/ProductPage.tsx)                                                                               |
| Filters                     | Examples of filters to narrow down products based on product facets.  | [SearchResultPage.tsx](/examples/react/src/routes/SearchResultPage.tsx) <br>[CategoryPage.tsx](/examples/react/src/routes/CategoryPage.tsx) |
| Load More Results           | Example of a Load More button to request more products.               | [SearchResultPage.tsx](/examples/react/src/routes/SearchResultPage.tsx)                                                                     |

## Analytics

Analytics drive the Machine Learning Klevu uses to provide users the best results.

| Feature                                 | Description                                              | Example                                                                 |
| --------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------- |
| SearchEvent                             | Track what was searched.                                 | [quicksearch.tsx](/examples/react/src/components/quicksearch.tsx)       |
| Search Product Click Event              | Track the products that are clicked from search results. | [SearchResultPage.tsx](/examples/react/src/routes/SearchResultPage.tsx) |
| Category Navigation Product Click Event | Track the products that are clicked from category pages. | [CategoryPage.tsx](/examples/react/src/routes/CategoryPage.tsx)         |
| Buy/Purchase Event                      | Track the products that are purchased.                   | [CheckoutPage.tsx](/examples/react/src/routes/CheckoutPage.tsx)         |

## Recommendations

| Feature                               | Description                                  | Example                                                                                                                                                                                        |
| ------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Klevu Merchant Center Recommendations | Add recommendations created within KMC. [^1] | [HomePage.tsx](/examples/react/src/routes/HomePage.tsx)<br> [CategoryPage.tsx](/examples/react/src/routes/CategoryPage.tsx) <br> [ProductPage.tsx](/examples/react/src/routes/ProductPage.tsx) |
| Similar Products                      |                                              | [ProductPage.tsx](/examples/react/src/routes/ProductPage.tsx)                                                                                                                                  |

[^1]: Klevu's Merchant Center allows you to create recommendations for specific uses that take into account the context of the pages they are added into.

## Personalization

| Feature         | Description                                                                 | Example                                                 |
| --------------- | --------------------------------------------------------------------------- | ------------------------------------------------------- |
| Personalisation | Easily add personlization to your klevuFetch searches by adding a modifier. | [HomePage.tsx](/examples/react/src/routes/HomePage.tsx) |

## Utilities

| Feature          | Description                                                               | Example                                    |
| ---------------- | ------------------------------------------------------------------------- | ------------------------------------------ |
| KlevuKMCSettings | Load your Klevu Merchant Center settings into the browser's localstorage. | [index.tsx](/examples/react/src/index.tsx) |

# Internal development

All projects in this repository can be build and run using VSCode.

Node.js and npm is required to be installed on your system before starting. This should be done once before starting development.

In the root of this repository run npm to install all packages

> npm install

Run build once to make sure everything is good to go.

> npm run build

## VSCode run development environment

You can run full environment inside VScode. Run default build task `ctrl+shift+b` in windows and `shift+command+b` in mac. This watched builds on all projects and runs react example project.

## VSCode extensions

It is recommened to have `ESLint` and `Prettier` extensions installed in order to produce clean code.
