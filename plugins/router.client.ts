const PAGE_TRANSITION_MS = 550

export default defineNuxtPlugin(() => {
  const router = useRouter()
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  router.beforeEach((to, _from) => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
      scrollTimeout = null
    }
    // When navigating to index, don't scroll yet – the old page is still in the DOM; scroll after transition
    if (process.client && to.path !== '/') {
      scrollToTop()
    }
  })

  router.afterEach((to, from) => {
    if (!process.client) return
    if (scrollTimeout) clearTimeout(scrollTimeout)
    // When navigating to index, only scroll after transition so we don't flash wrong section
    if (to.path === '/') {
      if (from?.path && from.path !== '/') {
        useState<boolean>('navigatedToIndex', () => false).value = true
      }
      scrollTimeout = setTimeout(() => {
        scrollToTop()
        scrollTimeout = null
      }, PAGE_TRANSITION_MS)
    } else {
      scrollToTop()
      scrollTimeout = setTimeout(() => {
        scrollToTop()
        scrollTimeout = null
      }, PAGE_TRANSITION_MS)
    }
  })
})
