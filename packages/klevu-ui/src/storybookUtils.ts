/**
 * This file includes utilities used by the storybook stories. Should not be included to the distributed code.
 */

import { KlevuRecord } from "@klevu/core"

/**
 * Helper function to create Storybook stories with web components.
 *
 * @param tag Tag of web component
 * @param args Arguments to pass to web component
 * @param style External style to inject DOM outside the web component. For testing user styles.
 * @returns
 */
export const WebComponentTemplate = <T>({
  tag,
  attributes,
  args,
  style,
  innerHTML,
  childElements: childElement,
}: {
  tag: string
  args?: {
    [key in keyof Partial<T>]: T[key]
  }
  attributes?: { [key: string]: any }
  style?: string
  innerHTML?: string
  childElements?: HTMLElement[]
}) => {
  const func = (args) => {
    const element = document.createElement(tag)
    for (const [key, value] of Object.entries(attributes ?? {})) {
      console.log(key, value)
      element.setAttribute(key, value)
    }
    for (const [key, value] of Object.entries(args ?? {})) {
      element[key] = value
    }
    if (innerHTML) {
      element.innerHTML = innerHTML
    }
    if (childElement) {
      element.append(...childElement)
    }
    if (style) {
      const styleElem = document.createElement("style")
      styleElem.type = "text/css"
      styleElem.appendChild(document.createTextNode(style))
      element.insertBefore(styleElem, element.firstChild)
    }
    console.log(element)
    return element
  }

  func.args = args
  return func
}

export const KlevuProductElement = (product: KlevuRecord) => {
  const element = document.createElement("klevu-product")
  element.product = product
  return element
}

/**
 * Helper to allow syntax highlighting in VS Code.
 *
 * @param i
 * @returns
 */
export const css = (i: TemplateStringsArray): string => i.toString()
export const html = (i: TemplateStringsArray): string => i.toString()

/**
 * Temporary testing data
 */

export const products: KlevuRecord[] = [
  {
    color: "Black",
    discount: "",
    hideGroupPrices: "",
    type: "women's coats & jackets",
    itemGroupId: "5860446601370",
    freeShipping: "",
    storeBaseCurrency: "USD",
    price: "1618.00",
    toPrice: "",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2014-08-02_Lana_Look_02_042_medium.jpg?v=1603183823",
    currency: "USD",
    inStock: "yes",
    id: "36800691929242",
    imageHover:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2014-08-02_Lana_Look_02_026_medium.jpg?v=1603183823",
    sku: "16351",
    brand: "Gianfranco Scotti",
    startPrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2014-08-02_Lana_Look_02_042_medium.jpg?v=1603183823",
    deliveryInfo: "",
    hideAddToCart: "",
    salePrice: "1618.0",
    swatchesInfo:
      "variantColor1:Black ;;;; variantId1:36800691896474 ;;;; variantSwatchImage1:https://cdn.shopify.com/s/files/1/0504/5364/3418/t/2/assets/black.jpg?v=1603200797",
    weight: "",
    klevu_category: "KLEVU_PRODUCT;Products;;Women;;Men;;Catalog  @ku@kuCategory@ku@",
    totalVariants: 1,
    groupPrices: "",
    url: "https://klevu-jsv2-integreation.myshopify.com/products/shahmeena-cocoon-coat-black",
    tags: "Black, Cocoon, Constructed Luxury, F14, Gianfranco Scotti, Outerwear, Pockets, SALE, SALE30, SALE30_2, Shahmeena, Silk, visible, Woman",
    product_type: "women's coats & jackets",
    size: "French 38",
    name: "Shahmeena Cocoon Coat in Black",
    shortDesc: "",
    category: "Women;;Men;;Catalog",
    typeOfRecord: "KLEVU_PRODUCT",
  },
  {
    color: "Black",
    discount: "",
    hideGroupPrices: "",
    type: "women's bags",
    itemGroupId: "5860507091098",
    freeShipping: "",
    storeBaseCurrency: "USD",
    price: "1598.00",
    toPrice: "",
    imageUrl: "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/Marsell_6933_medium.jpg?v=1603185275",
    currency: "USD",
    inStock: "yes",
    id: "36800914817178",
    imageHover: "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/Marsell_6931_medium.jpg?v=1603185275",
    sku: "20406",
    brand: "Marsell",
    startPrice: "",
    image: "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/Marsell_6933_medium.jpg?v=1603185275",
    deliveryInfo: "",
    hideAddToCart: "",
    salePrice: "1598.0",
    swatchesInfo:
      "variantColor1:Black ;;;; variantId1:36800914817178 ;;;; variantSwatchImage1:https://cdn.shopify.com/s/files/1/0504/5364/3418/t/2/assets/black.jpg?v=1603200797",
    weight: "",
    klevu_category: "KLEVU_PRODUCT;Products;;Women;;Men;;Catalog  @ku@kuCategory@ku@",
    totalVariants: 0,
    groupPrices: "",
    url: "https://klevu-jsv2-integreation.myshopify.com/products/circle-bag-in-black",
    tags: "12/1, accessories, arrivals, AW15, bag, gift guide, last, marsell, mothermoon, nightout, one, Signature, spring3, visible, woman",
    product_type: "women's bags",
    size: "One Size",
    name: "Circle Bag in Black",
    shortDesc:
      "Married aesthetics of innovation and tradition, Marséll crafts leatherwear of mastering technique. Where modern classism takes wearable shape, anticipate artistic expression epitomized in leather footwear and bags. This enticing piece presents ",
    category: "Women;;Men;;Catalog",
    typeOfRecord: "KLEVU_PRODUCT",
  },
  {
    color: "White",
    discount: "",
    hideGroupPrices: "",
    type: "women's dresses",
    itemGroupId: "5860500897946",
    freeShipping: "",
    storeBaseCurrency: "USD",
    price: "758.00",
    toPrice: "",
    imageUrl: "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/20141215_Lana-1395_medium.jpg?v=1603185153",
    currency: "USD",
    inStock: "yes",
    id: "36800896598170",
    imageHover: "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/20141215_Lana-1390_medium.jpg?v=1603185153",
    sku: "20262",
    brand: "Pero",
    startPrice: "",
    image: "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/20141215_Lana-1395_medium.jpg?v=1603185153",
    deliveryInfo: "",
    hideAddToCart: "",
    salePrice: "758.0",
    swatchesInfo: "variantColor1:White ;;;; variantId1:36800896598170",
    weight: "",
    klevu_category: "KLEVU_PRODUCT;Products;;Women;;Men;;Catalog  @ku@kuCategory@ku@",
    totalVariants: 3,
    groupPrices: "",
    url: "https://klevu-jsv2-integreation.myshopify.com/products/pink-bib-dress-in-white",
    tags: "11/23, arrivals, AW15, dresses, pero, putty, Resort, Signature, tops, tunic, visible, woman",
    product_type: "women's dresses",
    size: "38",
    name: "Pink Bib Dress in White",
    shortDesc:
      "This is a demonstration store. You can purchase products like this from Baby & Company This dress provides just enough color to hint warmer temperatures while remaining universa",
    category: "Women;;Men;;Catalog",
    typeOfRecord: "KLEVU_PRODUCT",
  },
  {
    color: "Dark Brown",
    discount: "",
    hideGroupPrices: "",
    type: "women's bags",
    itemGroupId: "5860519477402",
    freeShipping: "",
    storeBaseCurrency: "USD",
    price: "1678.00",
    toPrice: "",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-07-08_Laydown_20632_24490_medium.jpg?v=1603185555&vid=36800956399770",
    currency: "USD",
    inStock: "yes",
    id: "36800956399770",
    imageHover:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-07-08_Laydown_20632_24493_medium.jpg?v=1603185555",
    sku: "20632",
    brand: "Guibert",
    startPrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-07-08_Laydown_20632_24490_medium.jpg?v=1603185555&vid=36800956399770",
    deliveryInfo: "",
    hideAddToCart: "",
    salePrice: "1678.0",
    swatchesInfo:
      "variantColor1:Dark Brown ;;;; variantId1:36800956399770 ;;;; variantImage1:https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-07-08_Laydown_20632_24490_medium.jpg?v=1603185555&vid=19725211631770",
    weight: "",
    klevu_category: "KLEVU_PRODUCT;Products;;Women;;Men;;Catalog  @ku@kuCategory@ku@",
    totalVariants: 0,
    groupPrices: "",
    url: "https://klevu-jsv2-integreation.myshopify.com/products/pretty-grooming-bag-in-havana",
    tags: "2/9, accessories, arrivals, AW15, bag, bounty, brown, guibert, nightout, shot 7/9/15, signature, WEEK07, Woman",
    product_type: "women's bags",
    size: "One Size",
    name: "Pretty Grooming Bag",
    shortDesc:
      "This is a demonstration store. You can purchase products like this from Baby & Company With a rich history of equestrian leatherwear, Pierre Guibert's knowledge and experience i",
    category: "Women;;Men;;Catalog",
    typeOfRecord: "KLEVU_PRODUCT",
  },
  {
    color: "Turtledove",
    discount: "",
    hideGroupPrices: "",
    type: "women's bags",
    itemGroupId: "5860519084186",
    freeShipping: "",
    storeBaseCurrency: "USD",
    price: "1528.00",
    toPrice: "",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-02-13_Product_11_Bag5_3479_medium.jpg?v=1603185546",
    currency: "USD",
    inStock: "yes",
    id: "36800955941018",
    imageHover:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-03-05_Ashley_Look_01_32001_8761_medium.jpg?v=1603185546",
    sku: "20631",
    brand: "Guibert",
    startPrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-02-13_Product_11_Bag5_3479_medium.jpg?v=1603185546",
    deliveryInfo: "",
    hideAddToCart: "",
    salePrice: "1528.0",
    swatchesInfo: "variantColor1:Turtledove ;;;; variantId1:36800955941018",
    weight: "",
    klevu_category: "KLEVU_PRODUCT;Products;;Women;;Men;;Catalog  @ku@kuCategory@ku@",
    totalVariants: 0,
    groupPrices: "",
    url: "https://klevu-jsv2-integreation.myshopify.com/products/pretty-grooming-bag-in-turtledove",
    tags: "2/9, accessories, arrivals, AW15, bag, bounty, guibert, last, mothermoon, nautical, new, nightout, one, putty, signature, spring5, visible, WEEK07, woman",
    product_type: "women's bags",
    size: "One Size",
    name: "Pretty Grooming Bag",
    shortDesc:
      "This is a demonstration store. You can purchase products like this from Baby & Company The Pretty Grooming Bag is a welcoming size for this 24/7 lifestyle. Adjustable leather ha",
    category: "Women;;Men;;Catalog",
    typeOfRecord: "KLEVU_PRODUCT",
  },
  {
    color: "Red",
    discount: "",
    hideGroupPrices: "",
    type: "women's bags",
    itemGroupId: "5860518789274",
    freeShipping: "",
    storeBaseCurrency: "USD",
    price: "1528.00",
    toPrice: "",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-02-13_Product_10_Bag4_3469_medium.jpg?v=1603185539",
    currency: "USD",
    inStock: "yes",
    id: "36800954138778",
    imageHover:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-02-13_Product_10_Bag4_3470_medium.jpg?v=1603185539",
    sku: "20630",
    brand: "Guibert",
    startPrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-02-13_Product_10_Bag4_3469_medium.jpg?v=1603185539",
    deliveryInfo: "",
    hideAddToCart: "",
    salePrice: "1528.0",
    swatchesInfo:
      "variantColor1:Red ;;;; variantId1:36800954138778 ;;;; variantSwatchImage1:https://cdn.shopify.com/s/files/1/0504/5364/3418/t/2/assets/red.png?v=1603200804",
    weight: "",
    klevu_category: "KLEVU_PRODUCT;Products;;Women;;Men;;Catalog  @ku@kuCategory@ku@",
    totalVariants: 0,
    groupPrices: "",
    url: "https://klevu-jsv2-integreation.myshopify.com/products/pretty-grooming-bag-in-pauillac",
    tags: "2/9, accessories, arrivals, AW15, bag, bounty, guibert, last, mothermoon, nightout, one, putty, signature, spring2, spring5, visible, WEEK07, woman",
    product_type: "women's bags",
    size: "One Size",
    name: "Pretty Grooming Bag",
    shortDesc:
      "This is a demonstration store. You can purchase products like this from Baby & Company The Pretty Grooming Tote is a welcoming size for this 24/7 lifestyle",
    category: "Women;;Men;;Catalog",
    typeOfRecord: "KLEVU_PRODUCT",
  },
  {
    color: "Black",
    discount: "",
    hideGroupPrices: "",
    type: "men's coats & jackets",
    itemGroupId: "5860578197658",
    freeShipping: "",
    storeBaseCurrency: "USD",
    price: "1286.60",
    toPrice: "",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-02-15_Addis_Look_02_13216_3920_medium.jpg?v=1603186935",
    currency: "USD",
    inStock: "yes",
    id: "36801181221018",
    imageHover:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-02-15_Addis_Look_02_13216_3926_medium.jpg?v=1603186935",
    sku: "23700",
    brand: "Giorgio Brato",
    startPrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-02-15_Addis_Look_02_13216_3920_medium.jpg?v=1603186935",
    deliveryInfo: "",
    hideAddToCart: "",
    salePrice: "1286.6",
    swatchesInfo:
      "variantColor1:Black ;;;; variantId1:36801181188250 ;;;; variantSwatchImage1:https://cdn.shopify.com/s/files/1/0504/5364/3418/t/2/assets/black.jpg?v=1603200797",
    weight: "",
    klevu_category: "KLEVU_PRODUCT;Products;;Men;;Catalog;;Clothing  @ku@kuCategory@ku@",
    totalVariants: 2,
    groupPrices: "",
    url: "https://klevu-jsv2-integreation.myshopify.com/products/black-leather-jacket",
    tags: "1/26, bounty, coats, cross, giorgio brato, jackets, man, newman, outerwear, SALE, ss15, visible, WEEK05",
    product_type: "men's coats & jackets",
    size: "52",
    name: "Distressed Motorcycle Jacket",
    shortDesc:
      "This is a demonstration store. You can purchase products like this from Baby & Company Made for the long ride, Giorgio Brato’s jackets encapsulate the brilliance of leathe",
    category: "Men;;Catalog;;Clothing",
    typeOfRecord: "KLEVU_PRODUCT",
  },
  {
    color: "Mud",
    discount: "",
    hideGroupPrices: "",
    type: "women's bags",
    itemGroupId: "5860453548186",
    freeShipping: "",
    storeBaseCurrency: "USD",
    price: "1158.00",
    toPrice: "",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-04-02_Accessories_26_21638_17902_medium.jpg?v=1603184000",
    currency: "USD",
    inStock: "yes",
    id: "36800724893850",
    imageHover:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2014_08_10_Lana_Look8_26_medium.jpg?v=1603184000",
    sku: "17007",
    brand: "Marsell",
    startPrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-04-02_Accessories_26_21638_17902_medium.jpg?v=1603184000",
    deliveryInfo: "",
    hideAddToCart: "",
    salePrice: "1158.0",
    swatchesInfo: "variantColor1:Mud ;;;; variantId1:36800724893850",
    weight: "",
    klevu_category: "KLEVU_PRODUCT;Products;;Women;;Men;;Catalog  @ku@kuCategory@ku@",
    totalVariants: 0,
    groupPrices: "",
    url: "https://klevu-jsv2-integreation.myshopify.com/products/fantasma-bag-mud",
    tags: "accessories, Accessory, arrivals, AW15, Bags, F14, gift guide, handbag, Leather, Marsell, measurement, nightout, purse, Signature, spring3, visible, Woman",
    product_type: "women's bags",
    size: "One Size",
    name: "Fantasma Bag in Mud",
    shortDesc:
      "A roomy and practical suede carryall is outfitted with two top handles and a shoulder strap for an adaptable carry. The Fantasma is linen lined, with two internal zip pockets, a zip closure, and a handy luggage tag. Ma",
    category: "Women;;Men;;Catalog",
    typeOfRecord: "KLEVU_PRODUCT",
  },
  {
    color: "Lead",
    discount: "",
    hideGroupPrices: "",
    type: "women's bags",
    itemGroupId: "5860679876762",
    freeShipping: "",
    storeBaseCurrency: "USD",
    price: "1148.00",
    toPrice: "",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-04-02_Accessories_23_40641_17891_medium.jpg?v=1603189643",
    currency: "USD",
    inStock: "yes",
    id: "36801558675610",
    imageHover:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-04-02_Accessories_23_40641_17883_medium.jpg?v=1603189643",
    sku: "40641",
    brand: "Marsell",
    startPrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-04-02_Accessories_23_40641_17891_medium.jpg?v=1603189643",
    deliveryInfo: "",
    hideAddToCart: "",
    salePrice: "1148.0",
    swatchesInfo: "variantColor1:Lead ;;;; variantId1:36801558675610",
    weight: "",
    klevu_category: "KLEVU_PRODUCT;Products;;Women;;Men;;Catalog  @ku@kuCategory@ku@",
    totalVariants: 0,
    groupPrices: "",
    url: "https://klevu-jsv2-integreation.myshopify.com/products/tends-bag-lead",
    tags: "3/30, accessories, arrivals, AW15, bags, charcoal, Gray, grey, lead, Leather, marsell, nautical, nightout, Shot 4/1, signature, woman",
    product_type: "women's bags",
    size: "One Size",
    name: "Tenda Bag",
    shortDesc:
      "Calf skin leather bag with two handles that can be carried as a tote, worn over the shoulder, or cross-body. Detachable and adjustable shoulder strap, black hardware, and with zip closure. Fully lined in linen",
    category: "Women;;Men;;Catalog",
    typeOfRecord: "KLEVU_PRODUCT",
  },
  {
    color: "Dust",
    discount: "",
    hideGroupPrices: "",
    type: "men's coats & jackets",
    itemGroupId: "5860559847578",
    freeShipping: "",
    storeBaseCurrency: "USD",
    price: "1146.60",
    toPrice: "",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-04-03_Jake_Look_07_21693_18012_medium.jpg?v=1603186464",
    currency: "USD",
    inStock: "yes",
    id: "36801128333466",
    imageHover:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-04-03_Jake_Look_07_21693_18005_medium.jpg?v=1603186464",
    sku: "13264",
    brand: "Giorgio Brato",
    startPrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-04-03_Jake_Look_07_21693_18012_medium.jpg?v=1603186464",
    deliveryInfo: "",
    hideAddToCart: "",
    salePrice: "1146.6",
    swatchesInfo: "variantColor1:Dust ;;;; variantId1:36801128267930",
    weight: "",
    klevu_category: "KLEVU_PRODUCT;Products;;Men;;Catalog;;Clothing  @ku@kuCategory@ku@",
    totalVariants: 2,
    groupPrices: "",
    url: "https://klevu-jsv2-integreation.myshopify.com/products/leather-bomber-jacket-in-dust",
    tags: "1/5, bomber, bounty, coats, giorgio brato, grey, jackets, leather, man, menluggage, newman, outerwear, SALE, Shot 4/3, ss15, stripesmen, visible, WEEK02",
    product_type: "men's coats & jackets",
    size: "Italian 54",
    name: "Leather Bomber Jacket in Dust",
    shortDesc:
      "This is a demonstration store. You can purchase products like this from Baby & Company Giorgio Brato is the master of all things leather. With excellence in every touch, h",
    category: "Men;;Catalog;;Clothing",
    typeOfRecord: "KLEVU_PRODUCT",
  },
  {
    color: "Navy",
    discount: "",
    hideGroupPrices: "",
    type: "women's coats & jackets",
    itemGroupId: "5860446404762",
    freeShipping: "",
    storeBaseCurrency: "USD",
    price: "998.00",
    toPrice: "",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2014-08-02_Lana_Look_13_359_medium.jpg?v=1603183817",
    currency: "USD",
    inStock: "yes",
    id: "36800691568794",
    imageHover:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2014-08-02_Lana_Look_13_355_medium.jpg?v=1603183817",
    sku: "16344",
    brand: "Gianfranco Scotti",
    startPrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2014-08-02_Lana_Look_13_359_medium.jpg?v=1603183817",
    deliveryInfo: "",
    hideAddToCart: "",
    salePrice: "998.0",
    swatchesInfo: "variantColor1:Navy ;;;; variantId1:36800691568794",
    weight: "",
    klevu_category: "KLEVU_PRODUCT;Products;;Women;;Men;;Catalog  @ku@kuCategory@ku@",
    totalVariants: 1,
    groupPrices: "",
    url: "https://klevu-jsv2-integreation.myshopify.com/products/wool-cocoon-jacket-navy",
    tags: "asymmetrical, balloon, belted, blue, boxy, Coat, Constructed Luxury, cropped, cuffed, cuffs, F14, Gianfranco Scotti, jacket, Navy, Outerwear, roomy, SALE, SALE30_4, salefav2, visible, Woman, wool",
    product_type: "women's coats & jackets",
    size: "French 36",
    name: "Wool Cocoon Jacket",
    shortDesc: "",
    category: "Women;;Men;;Catalog",
    typeOfRecord: "KLEVU_PRODUCT",
  },
  {
    color: "Arlequins",
    discount: "",
    hideGroupPrices: "",
    type: "women's coats & jackets",
    itemGroupId: "5860681580698",
    freeShipping: "",
    storeBaseCurrency: "USD",
    price: "998.00",
    toPrice: "",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-04-08_Ashley_Look2_40720_18592_medium.jpg?v=1603189691",
    currency: "USD",
    inStock: "yes",
    id: "36801568506010",
    imageHover:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-04-08_Ashley_Look2_40720_18623_medium.jpg?v=1603189691",
    sku: "40720",
    brand: "La Prestic Ouiston",
    startPrice: "",
    image:
      "https://cdn.shopify.com/s/files/1/0504/5364/3418/products/2015-04-08_Ashley_Look2_40720_18592_medium.jpg?v=1603189691",
    deliveryInfo: "",
    hideAddToCart: "",
    salePrice: "998.0",
    swatchesInfo: "variantColor1:Arlequins ;;;; variantId1:36801568506010",
    weight: "",
    klevu_category: "KLEVU_PRODUCT;Products;;Women;;Men;;Catalog  @ku@kuCategory@ku@",
    totalVariants: 2,
    groupPrices: "",
    url: "https://klevu-jsv2-integreation.myshopify.com/products/silk-hoodie-arlequin",
    tags: "3/30, arrivals, AW15, hoodie, la prestic ouiston, multi, outerwear, Shot 4/8, signature, silk, spring5, tops, woman",
    product_type: "women's coats & jackets",
    size: "2",
    name: "Silk Hoodie",
    shortDesc:
      "This is a demonstration store. You can purchase products like this from Baby & Company  With a delectable selection of prints, the Hoodie suggests gorgeous chaos. Zip closure at",
    category: "Women;;Men;;Catalog",
    typeOfRecord: "KLEVU_PRODUCT",
  },
] as any
