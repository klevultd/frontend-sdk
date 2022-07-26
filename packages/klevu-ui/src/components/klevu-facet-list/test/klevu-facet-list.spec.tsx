import { newSpecPage } from '@stencil/core/testing';
import { KlevuFacetList } from '../klevu-facet-list';

describe('klevu-facet-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuFacetList],
      html: `<klevu-facet-list></klevu-facet-list>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-facet-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-facet-list>
    `);
  });
});
