export default defineNuxtPlugin(() => {
  const router = useRouter()
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null

  router.beforeEach((to, from) => {
    // Cancel any pending scroll operations when navigating
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
      scrollTimeout = null
    }
  })

  router.afterEach(() => {
    if (process.client) {
      // Cancel any existing pending scroll
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      
      // Delay scroll slightly to allow transition to start
      scrollTimeout = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' })
        scrollTimeout = null
      }, 50)
    }
  })
})
