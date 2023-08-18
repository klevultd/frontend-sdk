import { newSpecPage } from '@stencil/core/testing';
import { KlevuRating } from '../klevu-rating';

describe('klevu-rating', () => {
  it('renders with 3 stars', async () => {
    const page = await newSpecPage({
      components: [KlevuRating],
      html: `<klevu-rating rating=3></klevu-rating>`,
    });
    if(page.root?.shadowRoot) {
      const divEl = page.root.shadowRoot.querySelectorAll('svg');
      expect(divEl.length).toEqual(5);
      const filled = page.root.shadowRoot.querySelectorAll('.filled');
      expect(filled.length).toEqual(3);
    }
  });
});
