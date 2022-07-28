export function renderPrice(amount: number | string, currency: string): string {
  const price = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(price);
}

type KlevuGlobalSettings = {};

export function getGlobalSettings(): KlevuGlobalSettings | undefined {
  if (window) {
    return window['klevu_settings'];
  }
  return undefined;
}
