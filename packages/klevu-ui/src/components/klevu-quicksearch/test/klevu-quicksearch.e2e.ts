import { newE2EPage } from '@stencil/core/testing';

describe('klevu-quicksearch', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-quicksearch></klevu-quicksearch>');

    const element = await page.find('klevu-quicksearch');
    expect(element).toHaveClass('hydrated');
  });
});
