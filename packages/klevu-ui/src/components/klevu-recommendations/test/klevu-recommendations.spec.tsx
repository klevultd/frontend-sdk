import { newSpecPage } from '@stencil/core/testing';
import { KlevuRecommendations } from '../klevu-recommendations';

describe('klevu-recommendations', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuRecommendations],
      html: `<klevu-recommendations></klevu-recommendations>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-recommendations>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-recommendations>
    `);
  });
});
