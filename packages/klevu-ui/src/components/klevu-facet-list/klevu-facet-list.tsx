import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'klevu-facet-list',
  styleUrl: 'klevu-facet-list.css',
  shadow: true,
})
export class KlevuFacetList {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
