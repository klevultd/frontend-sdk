import { newE2EPage } from '@stencil/core/testing';

describe('klevu-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-pagination></klevu-pagination>');

    const element = await page.find('klevu-pagination');
    expect(element).toHaveClass('hydrated');
  });
});
