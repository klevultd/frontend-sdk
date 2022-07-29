import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'klevu-facet',
  styleUrl: 'klevu-facet.css',
  shadow: true,
})
export class KlevuFacet {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
