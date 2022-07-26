import { newSpecPage } from '@stencil/core/testing';
import { KlevuFacet } from '../klevu-facet';

describe('klevu-facet', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuFacet],
      html: `<klevu-facet></klevu-facet>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-facet>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-facet>
    `);
  });
});
