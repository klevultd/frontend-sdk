import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'klevu-search-landing-page',
  styleUrl: 'klevu-search-landing-page.css',
  shadow: true,
})
export class KlevuSearchLandingPage {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
