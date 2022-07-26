import { newSpecPage } from '@stencil/core/testing';
import { KlevuButton } from '../klevu-button';

describe('klevu-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuButton],
      html: `<klevu-button></klevu-button>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-button>
    `);
  });
});
