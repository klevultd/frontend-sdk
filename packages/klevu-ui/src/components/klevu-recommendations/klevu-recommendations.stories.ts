import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-recommendations.css"
// @ts-ignore
import notes from "./readme.md"

export default {
  title: "Apps/Recommendations",
  parameters: { notes },
}

export const Default = WebComponentTemplate<HTMLKlevuRecommendationsElement>({
  tag: "klevu-recommendations",
  args: {
    recommendationId: "k-4c963fdd-df37-4819-becd-bc6015307ba6",
    recommendationTitle: "The title",
  },
  attributes: {
    recommendationId: "k-4c963fdd-df37-4819-becd-bc6015307ba6",
    recommendationTitle: "The title",
  },
})
