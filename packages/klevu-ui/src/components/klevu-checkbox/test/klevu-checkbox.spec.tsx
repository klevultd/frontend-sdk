import { newSpecPage } from '@stencil/core/testing';
import { KlevuCheckbox } from '../klevu-checkbox';

describe('klevu-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuCheckbox],
      html: `<klevu-checkbox></klevu-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-checkbox>
    `);
  });
});
