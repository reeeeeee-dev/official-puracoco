export default defineNuxtPlugin(() => {
  const router = useRouter()

  router.afterEach(() => {
    if (process.client) {
      // Delay scroll slightly to allow transition to start
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }, 50)
    }
  })
})
