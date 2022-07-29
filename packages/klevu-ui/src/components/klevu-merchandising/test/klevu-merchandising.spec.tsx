import { newSpecPage } from '@stencil/core/testing';
import { KlevuMerchandising } from '../klevu-merchandising';

describe('klevu-merchandising', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuMerchandising],
      html: `<klevu-merchandising></klevu-merchandising>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-merchandising>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-merchandising>
    `);
  });
});
