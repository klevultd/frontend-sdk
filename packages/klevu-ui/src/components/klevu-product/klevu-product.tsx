import { KlevuRecord } from '@klevu/core';
import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'klevu-product',
  styleUrl: 'klevu-product.css',
  shadow: true,
})
export class KlevuProduct {
  @Prop() product: KlevuRecord;

  render() {
    return (
      <Host>
        <slot name="image">
          <div
            class="image"
            part="image"
            style={{
              backgroundImage: `url(${this.product.image})`,
            }}
          ></div>
        </slot>
        <slot name="info">
          <p>{this.product.name}</p>
        </slot>
      </Host>
    );
  }
}
