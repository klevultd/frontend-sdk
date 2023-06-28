import { useGlobals } from "@storybook/manager-api"
import type { ProjectAnnotations, Renderer, StoryContext, PartialStoryFn as StoryFunction } from "@storybook/types"
import { useEffect } from "react"
import { API_KEY } from "./constants"

const withGlobals = (StoryFn: StoryFunction<Renderer>, context: StoryContext<Renderer>) => {
  const [globals] = useGlobals()
  const myAddon = globals[API_KEY]
  // Is the addon being used in the docs panel
  const isInDocs = context.viewMode === "docs"
  const { theme } = context.globals

  useEffect(() => {
    // Execute your side effect here
    // For example, to manipulate the contents of the preview
    const selector = isInDocs ? `#anchor--${context.id} .sb-story` : "#storybook-root"
  }, [myAddon, theme])

  return StoryFn()
}

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withGlobals],
  globals: {
    [API_KEY]: "",
  },
}

export default preview
