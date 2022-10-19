import { newE2EPage } from '@stencil/core/testing';

describe('klevu-drawer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-drawer></klevu-drawer>');

    const element = await page.find('klevu-drawer');
    expect(element).toHaveClass('hydrated');
  });
});
