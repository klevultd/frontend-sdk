import { newSpecPage } from '@stencil/core/testing';
import { KlevuPopularSearches } from '../klevu-popular-searches';

describe('klevu-popular-searches', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuPopularSearches],
      html: `<klevu-popular-searches></klevu-popular-searches>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-popular-searches>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-popular-searches>
    `);
  });
});
