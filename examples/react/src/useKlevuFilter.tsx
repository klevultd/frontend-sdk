import {
  FilterManager,
  KlevuDomEvents,
  KlevuFilterResultOptions,
  KlevuFilterResultSlider,
  KlevuListenDomEvent,
} from "@klevu/core"
import React, { useRef, useState } from "react"

type KlevuFilterValues = {
  options: KlevuFilterResultOptions[]
  sliders: KlevuFilterResultSlider[]
}

export function useKlevuFilter(
  filterManager: FilterManager
): [KlevuFilterValues, any, any] {
  const [value, setValue] = useState<KlevuFilterValues>({
    options: filterManager.options,
    sliders: filterManager.sliders,
  })

  const ref = useRef(value)

  const handleFilterUpdate = () => {
    ref.current.options = filterManager.options
    ref.current.sliders = filterManager.sliders
  }

  React.useEffect(() => {
    const stop = KlevuListenDomEvent(
      KlevuDomEvents.FilterSelectionUpdate,
      handleFilterUpdate
    )

    const stopFullupdate = KlevuListenDomEvent(
      KlevuDomEvents.FiltersApplied,
      handleFilterUpdate
    )

    // cleanup this component
    return () => {
      stop()
      stopFullupdate()
    }
  }, [value])

  return [value, setValue, ref]
}
