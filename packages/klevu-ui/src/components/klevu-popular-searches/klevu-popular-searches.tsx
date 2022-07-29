import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'klevu-popular-searches',
  styleUrl: 'klevu-popular-searches.css',
  shadow: true,
})
export class KlevuPopularSearches {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
