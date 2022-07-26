import { newSpecPage } from '@stencil/core/testing';
import { KlevuPopup } from '../klevu-popup';

describe('klevu-popup', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuPopup],
      html: `<klevu-popup></klevu-popup>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-popup>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-popup>
    `);
  });
});
