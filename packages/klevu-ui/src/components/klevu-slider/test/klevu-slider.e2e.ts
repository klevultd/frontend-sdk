import { newE2EPage } from '@stencil/core/testing';

describe('klevu-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-slider></klevu-slider>');

    const element = await page.find('klevu-slider');
    expect(element).toHaveClass('hydrated');
  });
});
