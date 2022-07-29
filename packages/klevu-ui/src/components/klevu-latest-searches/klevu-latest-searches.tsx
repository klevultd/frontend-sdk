import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'klevu-latest-searches',
  styleUrl: 'klevu-latest-searches.css',
  shadow: true,
})
export class KlevuLatestSearches {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
