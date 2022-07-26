import { newSpecPage } from '@stencil/core/testing';
import { KlevuQuicksearch } from '../klevu-quicksearch';

describe('klevu-quicksearch', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuQuicksearch],
      html: `<klevu-quicksearch></klevu-quicksearch>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-quicksearch>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-quicksearch>
    `);
  });
});
