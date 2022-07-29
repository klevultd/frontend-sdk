import { newE2EPage } from '@stencil/core/testing';

describe('klevu-merchandising', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-merchandising></klevu-merchandising>');

    const element = await page.find('klevu-merchandising');
    expect(element).toHaveClass('hydrated');
  });
});
