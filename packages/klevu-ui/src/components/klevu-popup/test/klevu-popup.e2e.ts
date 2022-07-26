import { newE2EPage } from '@stencil/core/testing';

describe('klevu-popup', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-popup></klevu-popup>');

    const element = await page.find('klevu-popup');
    expect(element).toHaveClass('hydrated');
  });
});
