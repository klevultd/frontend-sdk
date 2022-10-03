import { newE2EPage } from '@stencil/core/testing';

describe('klevu-sort', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-sort></klevu-sort>');

    const element = await page.find('klevu-sort');
    expect(element).toHaveClass('hydrated');
  });
});
