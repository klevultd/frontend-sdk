import { newSpecPage } from '@stencil/core/testing';
import { KlevuTextfield } from '../klevu-textfield';

describe('klevu-textfield', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuTextfield],
      html: `<klevu-textfield></klevu-textfield>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-textfield>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-textfield>
    `);
  });
});
