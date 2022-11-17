# React UI Web components ALPHA

This is an experimental Klevu web components library. The goal is to build small components that developers can use to build UI's on top of Klevu faster.

During 0.0.x alpha versions every patch version can be version breaking.

# Using

First:
`npm install @klevu/ui`

Then import in your index file

```js
import "@klevu/ui"
```

Then configure your frontend with `<klevu-init></klevu-init>`

## Styling

You can modify the looks of the components by using CSS variables. Set the following in your <style></style> tag and modify it to your liking.

```css
:root {
  --klevu-color-primary: #00a0e9;
  --klevu-color-primary-border: #0675a8;
  --klevu-color-primary-text: #ffffff;
  --klevu-color-border: #e0e0e0;
  --klevu-color-dim-background: #fafafa;
  --klevu-color-shadow: rgba(0, 160, 233, 0.2);
  --klevu-rounded-corners: 4px;
  --klevu-spacing-small: 4px;
  --klevu-spacing-normal: 8px;
  --klevu-spacing-large: 12px;
  --klevu-product-image-aspect-ratio: 1.3 / 1;
  --klevu-product-width: 300px;
}
```
