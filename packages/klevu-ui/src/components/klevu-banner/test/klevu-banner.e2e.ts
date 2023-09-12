import { newE2EPage } from '@stencil/core/testing';

describe('klevu-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-banner></klevu-banner>');

    const element = await page.find('klevu-banner');
    expect(element).toHaveClass('hydrated');
  });
});
