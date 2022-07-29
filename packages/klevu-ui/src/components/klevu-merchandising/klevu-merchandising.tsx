import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'klevu-merchandising',
  styleUrl: 'klevu-merchandising.css',
  shadow: true,
})
export class KlevuMerchandising {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
