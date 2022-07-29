import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'klevu-quicksearch',
  styleUrl: 'klevu-quicksearch.css',
  shadow: true,
})
export class KlevuQuicksearch {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
