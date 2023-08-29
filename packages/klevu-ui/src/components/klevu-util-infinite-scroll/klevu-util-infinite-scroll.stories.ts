import { MDXAutoFillMeta } from "../../storybookUtils"
import { html } from "lit-html"
import type { Meta, StoryObj } from "@storybook/web-components"
import { KlevuUtilInfiniteScroll } from "./klevu-util-infinite-scroll"
import { ifDefined } from "lit-html/directives/if-defined.js"
export const { argTypes, parameters, description, decorators } = MDXAutoFillMeta("klevu-util-infinite-scroll")

const meta: Meta = {
  title: "Utils/Infinite Scroll",
  component: "klevu-util-infinite-scroll",
  argTypes,
  parameters,
  decorators,
}

export default meta

export const InfiniteScroll: StoryObj<KlevuUtilInfiniteScroll> = {
  args: {
    infiniteScrollPauseThreshold: 0,
    enabled: true,
  },
  render: (args) => html` <style>
      /* CSS Styles for Item and Container */
      .item {
        background: black;
        min-height: 100px;
        margin: 20px;
        font-size: 20px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .container {
        text-align: center;
      }
      .component {
        height: 400px;
        overflow: auto;
      }
    </style>
    <div class="component">
      <div class="container">
        <!-- Container for Items -->
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
        <div class="item">6</div>
        <div class="item">7</div>
        <div class="item">8</div>
        <div class="item">9</div>
        <div class="item">10</div>
      </div>
      <!-- Infinite Scroll Component -->
      <klevu-util-infinite-scroll
        enabled="${ifDefined(args.enabled) && !document.querySelector("klevu-button")}"
        infiniteScrollPauseThreshold=${ifDefined(args.infiniteScrollPauseThreshold)}
      ></klevu-util-infinite-scroll>
    </div>
    <script>
      // JavaScript Code for Infinite Scroll and Load More Button
      let count = 10

      // Select the container for items
      const container = document.querySelector(".container")

      // Select the Infinite Scroll component
      const klevuInfiniteScroll = document.querySelector("klevu-util-infinite-scroll")

      // Event listener for when infinite scrolling is paused
      document.querySelector("klevu-util-infinite-scroll").addEventListener("klevuInfiniteScrollingPaused", () => {
        // Disable the infinite scroll
        klevuInfiniteScroll.setAttribute("enabled", false)

        // Create a "Load More" button
        const button = document.createElement("klevu-button")
        button.id = "loadMoreButton"
        button.innerHTML = "Load More"

        // Add click event listener to the "Load More" button
        button.addEventListener("click", () => {
          fetchMore() // Call the fetchMore function
          klevuInfiniteScroll.setAttribute("enabled", true) // Re-enable infinite scroll
        })

        // Append the button to the container
        container.append(button)
      })

      // Event listener for loading more items
      document.querySelector("klevu-util-infinite-scroll").addEventListener("klevuLoadMore", () => {
        fetchMore() // Call the fetchMore function
      })

      // Function to fetch and add more items
      function fetchMore() {
        const button = document.querySelector("#loadMoreButton")
        if (button) {
          button.remove() // Remove the "Load More" button
        }
        for (let i = 0; i < 10; i++) {
          const div = document.createElement("div")
          div.classList.add("item")
          count++
          div.innerHTML = count
          container.append(div) // Append new items to the container
        }
      }
    </script>`,
}
