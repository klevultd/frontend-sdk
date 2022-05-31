import useQuickSearch from "../stores/quickSearchStore"

export default defineNuxtRouteMiddleware(() => {
  // ✅ This will work make sure the correct store is used for the
  // current running app
  const quickSearchStore = useQuickSearch()

  //lets ensure we close the quicksearch in case it is open
  quickSearchStore.quickSearchOpen = false
})
