import { newSpecPage } from '@stencil/core/testing';
import { KlevuLatestSearches } from '../klevu-latest-searches';

describe('klevu-latest-searches', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuLatestSearches],
      html: `<klevu-latest-searches></klevu-latest-searches>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-latest-searches>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-latest-searches>
    `);
  });
});
