# @klevu/ui

The @klevu/ui package provides a set of UI components that can be easily integrated into your web application. These components are built using StencilJS and are designed to be used as web components, allowing you to easily include them in your existing web application.

Read more and learn: https://webcomponents.klevu.com

## Installation

To install @klevu/ui, you can use npm or yarn:

```sh
npm install @klevu/ui
```

```sh
yarn add @klevu/ui
```

## Usage

Once you have installed @klevu/ui, you can import the components you need and use them in your application:

```html
Copy code
<!DOCTYPE html>
<html>
  <head>
    <script type="module" src="path/to/@klevu/ui.js"></script>
  </head>
  <body>
    <klevu-button>Click me</klevu-button>
  </body>
</html>
```

## Generating parts

Special thing about Klevu UI components is that all parts of the subcomponents are exposed to main component in order to make things editable.

To generate list of parts that can be modified for documentation and development purposes use `npm run generate:parts` command to generate them.

## Icons

Some of the icons are preloaded into the project in order to improve performance of the library. These files are manated in `preloaded-icons.json` file in klevu-icons component.

After updating that file it is possible to run `npm run generate:icons` that will automatically download specified icons from Github.

## Contributing

If you would like to contribute to @klevu/ui, please follow these steps:

- Fork the repository.
- Create a new branch for your changes.
- Make your changes and commit them with a descriptive message.
- Push your changes to your fork.
- Create a pull request.

## License

@klevu/ui is licensed under the MIT License.
