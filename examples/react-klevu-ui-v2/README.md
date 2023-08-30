# Klevu React example V2 - Using atoms to demonstrate storefront using smaller components

This example is built with Typescript, React, @klevu/core and Vite (server)

To run the example:

> npm install

> npm run dev

[Click here to run example in CodeSandbox.io](https://codesandbox.io/s/github/klevultd/frontend-sdk/tree/master/examples/react-klevu-ui-v2)

## Initialization

Klevu configuration initialization is done in [index.tsx](./src/index.tsx) before any other code.

```ts
import { KlevuConfig } from "@klevu/core"

KlevuConfig.init({
  url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-160320037354512854",
})
```

Both the URL and API Key are provided to you when you create an account with Klevu.

## Quick search using KlevuPopup and KlevuSearchField

```react
<KlevuPopup
   ref={popupRef}
   anchor="bottom-start"
   start-open={false}
   onKlevuPopupClose={() => setSearchSuggestions([])}
   >
   <KlevuSearchField
      slot="origin"
      limit={5}
      placeholder="Klevu search field"
      variant="pill"
      searchProducts
      onKlevuSearchResults={(param) => {
         setSearchSuggestions(
         param.detail.search.responseObject.apiResponse
            .queryResults[0].records,
         )
         popupRef.current.openModal()
      }}
   />
   <div slot="content">
      {searchSuggestions.map((product) => (
         <div
         style={{
            display: "flex",
            gap: "10px",
            padding: "10px",
         }}
         >
         <img src={product.image} width="30px" alt="" />
         <b>{product.name}</b> (
         {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: product.currency,
         }).format(product.price)}
         )
         </div>
      ))}
   </div>
</KlevuPopup>
```

## Show Cart items in Drawer

```react
<KlevuDrawer anchor="right" ref={drawerRef}>
   <KlevuButton slot="origin">
   <span
      id="shoppingCartButton"
      style={{ whiteSpace: "nowrap" }}
   >
      <KlevuIcon name="shopping_cart" id="shoppingCart" />
      <span>Cart ({cart.items?.length || 0})</span>
   </span>
   </KlevuButton>
   <div slot="content">
      <h3
         style={{
            display: "flex",
            justifyContent: "space-between",
         }}
      >
         <span>Your Cart</span>
         <button
            onClick={() => {
            if (drawerRef.current) drawerRef.current.closeModal()
            }}
         >
            <KlevuIcon name="close" />
         </button>
      </h3>
      <div
         style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
         }}
      >
         {cart.items.length > 0 ? (
            cart.items.map((p, i) => (
            <KlevuProduct product={p} key={i}>
               <div slot="bottom" className="buttonParent">
                  <KlevuButton
                  onClick={() => {
                     cart.remove(p.id)
                  }}
                  fullWidth={true}
                  >
                  Remove
                  </KlevuButton>
               </div>
            </KlevuProduct>
            ))
         ) : (
            <h2 style={{ color: "red" }}>Your cart is empty</h2>
         )}
      </div>
   </div>
</KlevuDrawer>
```

### Open Right Drawer on Cart button click

```react
<KlevuDrawer anchor="right" ref={drawerRef}>
   <KlevuButton slot="origin">
      <span
         id="shoppingCartButton"
         style={{ whiteSpace: "nowrap" }}
      >
         <KlevuIcon name="shopping_cart" id="shoppingCart" />
         <span>Cart ({cart.items?.length || 0})</span>
      </span>
   </KlevuButton>
   <div slot="content">
      <h3
         style={{
         display: "flex",
         justifyContent: "space-between",
         }}
      >
         <span>Your Cart</span>
         <button
         onClick={() => {
            if (drawerRef.current) drawerRef.current.closeModal()
         }}
         >
         <KlevuIcon name="close" />
         </button>
      </h3>
      <div
         style={{
         display: "flex",
         flexDirection: "column",
         gap: "10px",
         }}
      >
         {cart.items.length > 0 ? (
         cart.items.map((p, i) => (
            <KlevuProduct product={p} key={i}>
               <div slot="bottom" className="buttonParent">
               <KlevuButton
                  onClick={() => {
                     cart.remove(p.id)
                  }}
                  fullWidth={true}
               >
                  Remove
               </KlevuButton>
               </div>
            </KlevuProduct>
         ))
         ) : (
         <h2 style={{ color: "red" }}>Your cart is empty</h2>
         )}
      </div>
   </div>
</KlevuDrawer>
```

### Parse the facets from FilterManager to show Facet Chips

```react
<div slot="content" className="facetSection">
   {manager.filters.map((f) =>
   (f as KlevuFilterResultOptions).options
      .filter((o) => o.selected)
      .map((selected) => (
         <KlevuBadge
         accent={2}
         style={{
            whiteSpace: "nowrap",
            position: "relative",
         }}
         >
         <span
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() =>
               manager.toggleOption(f.key, selected.name)
            }
         >
            <KlevuIcon
               name="close"
               style={{
               marginRight: "5px",
               fontSize: "12px",
               position: "absolute",
               top: "-6px",
               right: "-5px",
               padding: "1px 4px 0px 4px",
               backgroundColor: "#aaa",
               color: "white",
               borderRadius: "20px",
               border: "1px solid white",
               }}
            ></KlevuIcon>
         </span>
         <span>
            <b>{f.label}</b>: {selected.name}
         </span>
         </KlevuBadge>
      )),
   )}
</div>
```

### Load Recommendations with your custom KlevuProduct card

```react
const [recsProducts, setRecsProducts] = useState([])

<KlevuRecommendations
          recommendationId={recsId}
          recommendationTitle="Customized Recommendation"
          onKlevuData={(e) => setRecsProducts(e.detail.records)}
>
   {recsProducts.map((product) => (
      <KlevuProduct product={product}>
         <div slot="info">{product.name}</div>
         <div slot="bottom" className="buttonParent">
            {cart.items.find((_p) => product.id === _p.id) ? (
            <KlevuButton
               onClick={() => {
                  setRemoveProduct(product)
               }}
               fullWidth={true}
               style={{ border: "3px dashed red" }}
            >
               Remove
            </KlevuButton>
            ) : (
            <KlevuButton
               onClick={() => {
                  cart.add(product)
               }}
               fullWidth={true}
               style={{ border: "3px dashed blue" }}
            >
               Add to cart
            </KlevuButton>
            )}
         </div>
      </KlevuProduct>
   ))}
</KlevuRecommendations>
```

## Styling KlevuButton

```css
klevu-button::part(klevu-button) {
  border: 3px dashed blue;
  cursor: pointer;
}
```

### Styling KlevuProduct container

```css
klevu-product::part(product-container) {
  border: 3px dashed orange;
}
```

and many more....
Feel free to add your own to above to understand how different web components can be composed to create functionality.
