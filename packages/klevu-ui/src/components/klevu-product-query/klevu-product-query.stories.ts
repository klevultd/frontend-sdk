import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import { ifDefined } from "lit-html/directives/if-defined.js"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuProductQuery } from "./klevu-product-query"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-product-query")

const decoratorsWithoutInit = [decorators[0]]

const meta: Meta = {
  title: "Apps/Product Query",
  component: "klevu-product-query",
  argTypes,
  parameters,
  decorators: decoratorsWithoutInit,
}

export default meta

const chatRender = (args: KlevuProductQuery) => {
  return html`
    <klevu-product-query
      pqa-widget-id=${ifDefined(args.pqaWidgetId)}
      url=${ifDefined(args.url)}
      product-id=${ifDefined(args.productId)}
      text-field-variant=${ifDefined(args.textFieldVariant)}
      text-field-placeholder=${ifDefined(args.textFieldPlaceholder)}
      popup-title=${ifDefined(args.popupTitle)}
      button-text=${ifDefined(args.buttonText)}
      ask-button-text=${ifDefined(args.askButtonText)}
      use-background=${ifDefined(args.useBackground)}
      fine-print=${ifDefined(args.finePrint)}
      popup-anchor=${ifDefined(args.popupAnchor)}
      popup-offset=${ifDefined(args.popupOffset)}
      settings=${ifDefined(JSON.stringify(args.settings))}
      disable-close-outside-click=${ifDefined(args.disableCloseOutsideClick)}
      use-native-scrollbars=${ifDefined(args.useNativeScrollbars)}
      item-id=${ifDefined(args.itemId)}
      item-group-id=${ifDefined(args.itemGroupId)}
      item-variant-id=${ifDefined(args.itemVariantId)}
      channel-id=${ifDefined(args.channelId)}
      locale=${ifDefined(args.locale)}
      product-info-generator=${ifDefined(args.productInfoGenerator)}
    ></klevu-product-query>
  `
}

export const Query: StoryObj<KlevuProductQuery> = {
  args: {
    pqaWidgetId: "pqa-98a5afad-b242-4e0b-830f-78c4277e76b3",
    url: "https://klevu-trustpilot-demo.myshopify.com/products/grand-vcm-205-ltr-hairline-silver",
  },
  render: (args) =>
    html` <div style="transform: translateY(-1px)">
      <p>
        Phasellus ultricies erat a nisl blandit commodo. Vivamus quis mi laoreet, scelerisque eros et, commodo augue.
        Proin tristique malesuada diam non scelerisque. Integer sodales at dolor mollis lobortis. Sed at velit nec massa
        maximus viverra in nec lacus. Fusce interdum quam ut porta maximus. Maecenas a turpis rhoncus, convallis odio
        at, lacinia enim. Duis varius, dolor eu accumsan sagittis, augue libero ultricies quam, non pellentesque urna
        ligula nec orci. Nam sed porttitor dolor.
        <klevu-init
          assets-path="https://resources-webcomponents.klevu.com/1.0.0/klevu-ui"
          .settings=${{
            icons: {
              thumb_up: "https://resources-webcomponents.klevu.com/pqa/thumbs-up.svg",
              thumb_down: "https://resources-webcomponents.klevu.com/pqa/thumbs-down.svg",
            },
          }}
          >${chatRender(args)}</klevu-init
        >Sed hendrerit, leo sit amet ultricies volutpat, felis erat volutpat libero, sit amet suscipit augue tortor at
        justo. In consectetur, mi ac posuere dictum, erat ligula lacinia augue, sit amet sollicitudin felis sem eu
        metus. Nunc pretium eros ut enim finibus congue. Phasellus eu mauris quis ex interdum pretium. Praesent
        ultricies tempus sapien, ut efficitur metus luctus ut. Sed non purus gravida, ultrices magna vel, efficitur
        lectus. Aenean non nisi sed turpis suscipit rhoncus in ut lorem.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis, sapien et gravida faucibus, eros erat
        maximus metus, nec maximus felis magna sed sem. Aliquam sodales nibh ex, imperdiet euismod velit egestas quis.
        Nulla at orci vel ipsum luctus tempus non efficitur turpis. Donec malesuada nisl non fermentum faucibus. Proin
        cursus, nisi sit amet auctor scelerisque, est erat pellentesque neque, sit amet blandit lacus enim vitae urna.
        Praesent feugiat sem vitae sagittis pharetra. Morbi non nisl lectus. Pellentesque in dolor quis nunc porta
        efficitur. Donec tincidunt lobortis malesuada. Nullam pretium orci non lorem mattis, nec ornare ligula
        venenatis.
      </p>
    </div>`,
}

export const QueryWithProductId: StoryObj<KlevuProductQuery> = {
  args: {
    pqaWidgetId: "pqa-98a5afad-b242-4e0b-830f-78c4277e76b3",
    productId: "45694656971065",
  },
  render: Query.render,
}

export const HeavilyModifedVersion: StoryObj<KlevuProductQuery> = {
  args: {
    pqaWidgetId: "pqa-5964f0f4-3277-4728-92e5-872eb0b49494",
    url: "https://klevu-trustpilot-demo.myshopify.com/products/grand-vcm-205-ltr-hairline-silver",
  },
  render: (args) => html`<klevu-init>
      <klevu-product-query
        class="modified-version"
        pqa-widget-id=${ifDefined(args.pqaWidgetId)}
        url=${ifDefined(args.url)}
        button-text="Ask a questions"
        popup-title="Ask a question about this product"
        fine-print=" I’m an AI model so I do have
      limitations. Please verify answers on the product page."
        use-background
      >
        <!-- This could be also a img with url -->
        <klevu-icon
          slot="before-button-text"
          style="font-size: 1.5em; position: relative; top: 0.3em; margin-right: 0.5em"
          name="forum"
        ></klevu-icon>
        <span slot="after-fineprint">
          <klevu-popup popup-width="400" anchor="bottom-end" toggle>
            <span slot="origin" id="fineprint-popup-origin">?</span>
            <div slot="content" id="fineprint-popup">
              By using our website and AI chatbot, you agree to the terms of our Privacy Policy and agree that you
              understand the risks associated with using the AI chatbot. You acknowledge that you understand the risks,
              limitations, and conditions of use and instructions for use. You may, at any time, stop communicating
              through this service by closing the AI chat window.
            </div>
          </klevu-popup>
        </span>
      </klevu-product-query>
    </klevu-init>
    <style id="heavily_modified">
      klevu-product-query {
        --klevu-button-text-color: #000;
      }

      klevu-product-query-popup {
        --klevu-popup-height: 500px;
        --klevu-product-query-popup-height: 500px;
        --klevu-product-query-popup-width: 400px;
        --klevu-chat-bubble-background-remote: #000;
        --klevu-color-primary: #000;
      }

      klevu-product-query.modified-version::part(button-base) {
        --klevu-border-radius-s: 0;
        --klevu-border-radius-m: 0;
        --klevu-border-radius-l: 0;
        --klevu-button-text-color: #000;
        --klevu-typography-font-weight: normal;
        background: #fff;
        border: 1px solid black;
        height: 42px;
        padding: 0 16px 4px 16px;
      }
      klevu-product-query.modified-version::part(button-base):focus:after {
        border: 0;
      }

      #fineprint-popup-origin {
        display: inline-block;
        padding: 2px;
        background: #000;
        color: #fff;
        font-weight: bold;
        border-radius: 50%;
        height: 12px;
        width: 12px;
        text-align: center;
        cursor: pointer;
      }

      #fineprint-popup {
        padding: 1em;
        background: #000;
        color: #fff;
      }
    </style>`,
}

export const WithAdditionalData: StoryObj<KlevuProductQuery> = {
  args: {
    productId: "252719",
    pqaWidgetId: "pqa-946e68a1-e986-4aa7-9396-6ffeadde5151",
    // pqaWidgetId: "pqa-5964f0f4-3277-4728-92e5-872eb0b49494",
    // url: "https://klevu-trustpilot-demo.myshopify.com/products/grand-vcm-205-ltr-hairline-silver",
  },
  render: (args) =>
    html`
      <div style="transform: translateY(-1px)">
        <p>
          <klevu-init
            assets-path="https://resources-webcomponents.klevu.com/1.0.0/klevu-ui"
            .settings=${{
              icons: {
                thumb_up: "https://resources-webcomponents.klevu.com/pqa/thumbs-up.svg",
                thumb_down: "https://resources-webcomponents.klevu.com/pqa/thumbs-down.svg",
              },
            }}
            >${chatRender(args)}</klevu-init
          >
          <input type="text" class="additionalDataInput" />
          <button onClick="onAddAdditionalData()" class="addAdditionalData">Add additionalData</button>
        </p>

        <p>Enter the data you wish to include in the box and press the button to save it.</p>
        <p>The query session after this will consider the provided information.</p>
      </div>
      <script type="text/javascript">
        function onAddAdditionalData() {
          const additionalData = document.getElementsByClassName("additionalDataInput")
          if (additionalData.length > 0) {
            console.log("storybook", { additionalData: additionalData[0].value })
            const pqa = document.getElementsByTagName("klevu-product-query")
            if (pqa.length > 0) {
              pqa[0].setAttribute("additionaldata", additionalData[0].value)
            }
          }
        }
      </script>
    `,
}

export const WithProductInfoAndItemId: StoryObj<KlevuProductQuery> = {
  args: {
    productId: "7585342095542",
    pqaWidgetId: "pqa-6d4a4513-2d81-4ed7-84a5-59f40f7b7b95",
    productInfoGenerator: "getProductInfo()",
    itemId: "7585342095542",
    itemGroupId: "7585342095542",
    itemVariantId: "",
    channelId: "21678260406",
    locale: "en_US",
  },
  render: (args) =>
    html`
      <div style="transform: translateY(-1px)">
        <p>
          <klevu-init
            assets-path="https://resources-webcomponents.klevu.com/1.0.0/klevu-ui"
            .settings=${{
              icons: {
                thumb_up: "https://resources-webcomponents.klevu.com/pqa/thumbs-up.svg",
                thumb_down: "https://resources-webcomponents.klevu.com/pqa/thumbs-down.svg",
              },
            }}
            moi-api-url="https://moi-ai-qa2.ksearchnet.com/"
            >${chatRender(args)}</klevu-init
          >
        </p>
      </div>
      <script type="text/javascript">
        function getProductInfo() {
          return {
            itemId: "8473483804846",
            itemGroupId: "8473483804846",
            itemVariantId: "45367708582062",
            locale: "en_US",
            channelId: "12365153151",
            title: "Adidas London - Preloved Ink / Core Black / Gum",
            url: "https://parth-asklo-store.myshopify.com/products/adidas-london-shoes-preloved-ink-core-black-gum",
            description:
              "LOW-PROFILE SHOES ' WITH A COMFORTABLE BUILD AND SLEEK SILHOUETTE.No matter where your path takes you, these Adidas shoes are made to wander. A premium suede upper in an archive model evokes a retro style perfect for casual days and laid-back weekends. Blocks of colour and contrast accents give a stylistic nod to the energetic spirit of life on the go. Underneath, a rubber outsole provides durable traction so you can follow wherever curiosity leads.Regular fitLace closureSuede upperSynthetic liningRubber outsole",
            vendor: "Adidas Originals",
            priceMax: "$85.00 USD",
            priceMin: "$85.00 USD",

            tags: ["Brand - Adidas Originals"],
            options: [
              {
                name: "Shoe Size",
                values: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
              },
            ],
            images: [
              "https://parth-asklo-store.myshopify.com/cdn/shop/files/IE0825_12_FOOTWEAR_Photography_LeftSideCenterLateralView_grey.jpg?v=1718263596",
            ],
            variants: [
              {
                itemVariantId: "45367708450990",
                title: "UK 7",
                sku: "IE08257",
                url: "https://parth-asklo-store.myshopify.com/products/adidas-london-shoes-preloved-ink-core-black-gum?variant=45367708450990",
                image:
                  "https://parth-asklo-store.myshopify.com/cdn/shop/files/IE0825_12_FOOTWEAR_Photography_LeftSideCenterLateralView_grey.jpg?v=1718263596", // nullable
                price: "$85.00 USD",
                weight: "350.0 g",
              },
            ],
          }
        }
      </script>
    `,
}
