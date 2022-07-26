import { newE2EPage } from '@stencil/core/testing';

describe('klevu-popular-searches', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-popular-searches></klevu-popular-searches>');

    const element = await page.find('klevu-popular-searches');
    expect(element).toHaveClass('hydrated');
  });
});
