/**
 * This file includes utilities used by the storybook stories. Should not be included to the distributed code.
 */

import { KlevuRecord } from '@klevu/core';

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
  args,
  style,
  innerHTML,
}: {
  tag: string;
  args: {
    [key in keyof Partial<T>]: T[key];
  };
  style?: string;
  innerHTML?: string;
}) => {
  const func = args => {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(args)) {
      element[key] = value;
    }
    if (innerHTML) {
      element.innerHTML = innerHTML;
    }
    if (style) {
      const styleElem = document.createElement('style');
      styleElem.type = 'text/css';
      styleElem.appendChild(document.createTextNode(style));
      element.insertBefore(styleElem, element.firstChild);
    }
    return element;
  };

  func.args = args;
  return func;
};

/**
 * Helper to allow syntax highlighting in VS Code.
 *
 * @param i
 * @returns
 */
export const css = (i: TemplateStringsArray): string => i.toString();
export const html = (i: TemplateStringsArray): string => i.toString();

export const products: KlevuRecord[] = [
  {
    brand: 'Gianni Chiarini',
    color: 'blue',
    gender: 'Damen',
    discount: '0.0',
    baseId: '80070',
    hideGroupPrices: '',
    itemGroupId: 'ea9ad0d1-5bf2-4759-94e5-8f5833397526',
    freeShipping: '',
    storeBaseCurrency: 'EUR',
    commonSize: 'one Size',
    price: '86.25',
    toPrice: '86.25',
    imageUrl: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/080070_1_medium.jpg',
    inStock: 'yes',
    currency: 'EUR',
    id: 'ea9ad0d1-5bf2-4759-94e5-8f5833397526-ea9ad0d1-5bf2-4759-94e5-8f5833397526-1',
    imageHover: '',
    sku: 'A0E2000000023BB',
    startPrice: '86.25',
    image: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/080070_1_medium.jpg',
    deliveryInfo: '',
    hideAddToCart: '',
    salePrice: '86.25',
    swatchesInfo: '',
    weight: '',
    klevu_category: 'KLEVU_PRODUCT;;Women;Bags;Shoulder bags;;Sale;Women;;Women;Bags;Handbag;;;b2b;  @ku@kuCategory@ku@',
    totalVariants: 0,
    groupPrices: '',
    designer: 'Gum by Gianni Chiarini',
    articleNumberMax: '80070',
    isCustomOptionsAvailable: '',
    url: 'https://www.replace.me/gum-bag-small-1739FARDELFI-blue',
    isOnStock: 'true',
    tags: '',
    size: 'one size',
    madeInItaly: 'yes',
    name: 'Bag small GUM blue butterflies',
    articleNumberManufacturer: '1739 GUM FAR DELFI',
    matrixId: 'A0E2000000023BB',
    style: 'sporty',
    shortDesc: '',
    category: 'Shoulder bags;;Women;;Handbag',
    typeOfRecord: 'KLEVU_PRODUCT',
  } as any,
];
