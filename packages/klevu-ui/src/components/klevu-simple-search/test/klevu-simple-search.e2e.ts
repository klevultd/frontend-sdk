import { newE2EPage } from '@stencil/core/testing';

describe('klevu-simple-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-simple-search></klevu-simple-search>');

    const element = await page.find('klevu-simple-search');
    expect(element).toHaveClass('hydrated');
  });
});
