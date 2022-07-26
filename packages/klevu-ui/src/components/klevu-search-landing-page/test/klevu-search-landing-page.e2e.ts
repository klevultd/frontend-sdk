import { newE2EPage } from '@stencil/core/testing';

describe('klevu-search-landing-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-search-landing-page></klevu-search-landing-page>');

    const element = await page.find('klevu-search-landing-page');
    expect(element).toHaveClass('hydrated');
  });
});
