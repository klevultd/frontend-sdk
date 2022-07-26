import { newSpecPage } from '@stencil/core/testing';
import { KlevuSearchLandingPage } from '../klevu-search-landing-page';

describe('klevu-search-landing-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [KlevuSearchLandingPage],
      html: `<klevu-search-landing-page></klevu-search-landing-page>`,
    });
    expect(page.root).toEqualHtml(`
      <klevu-search-landing-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </klevu-search-landing-page>
    `);
  });
});
