import { newE2EPage } from '@stencil/core/testing';

describe('klevu-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<klevu-dropdown></klevu-dropdown>');

    const element = await page.find('klevu-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
