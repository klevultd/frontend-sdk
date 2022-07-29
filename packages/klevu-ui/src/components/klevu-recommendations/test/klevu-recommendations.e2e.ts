import { newE2EPage } from '@stencil/core/testing';

describe('klevu-recommendations', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-recommendations></klevu-recommendations>');

    const element = await page.find('klevu-recommendations');
    expect(element).toHaveClass('hydrated');
  });
});
