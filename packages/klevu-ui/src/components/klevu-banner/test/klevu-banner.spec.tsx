import { newSpecPage } from '@stencil/core/testing';
import { KlevuBanner } from '../klevu-banner';

describe('klevu-banner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuBanner],
      html: `<klevu-banner></klevu-banner>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-banner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-banner>
    `);
  });
});
