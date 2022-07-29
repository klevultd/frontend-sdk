import { WebComponentTemplate } from "../../storybookUtils"
import "./klevu-recommendations.css"

export default {
  title: "Components/Recommendations",
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
