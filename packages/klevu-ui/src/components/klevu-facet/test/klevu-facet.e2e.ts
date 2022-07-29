import { newE2EPage } from '@stencil/core/testing';

describe('klevu-facet', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-facet></klevu-facet>');

    const element = await page.find('klevu-facet');
    expect(element).toHaveClass('hydrated');
  });
});
