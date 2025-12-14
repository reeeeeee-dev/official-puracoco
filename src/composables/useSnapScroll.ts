import { onMounted, onUnmounted, onBeforeMount, nextTick } from 'vue'

export function useSnapScroll() {
  let isScrolling = false
  const scrollTimeout: number | null = null
  let wheelTimeout: number | null = null
  let accumulatedWheelDelta = 0
  const WHEEL_THRESHOLD = 50 // Minimum wheel delta to trigger section change

  // Check if device is mobile
  const isMobile = () => {
    return (
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    )
  }

  // Apply scroll snap class synchronously before mount
  onBeforeMount(() => {
    // Only enable snap scrolling on desktop
    if (!isMobile()) {
      document.documentElement.classList.add('snap-scroll')
      // Prevent scroll restoration
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
      }
      // Reset scroll position to ensure snap works from the start
      window.scrollTo(0, 0)
    }
  })

  const getSnapSections = (): HTMLElement[] => {
    return Array.from(document.querySelectorAll('.snap-start')) as HTMLElement[]
  }

  const getCurrentSectionIndex = (): number => {
    const snapSections = getSnapSections()
    if (snapSections.length === 0) return 0

    let currentSectionIndex = 0
    let minDistance = Infinity

    snapSections.forEach((section, index) => {
      const rect = section.getBoundingClientRect()
      const distance = Math.abs(rect.top)
      if (distance < minDistance) {
        minDistance = distance
        currentSectionIndex = index
      }
    })

    return currentSectionIndex
  }

  const snapToSection = (index: number) => {
    if (isScrolling) return

    const snapSections = getSnapSections()
    if (index < 0 || index >= snapSections.length) return

    isScrolling = true
    const targetSection = snapSections[index]
    targetSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    // Reset scrolling flag after animation completes
    setTimeout(() => {
      isScrolling = false
    }, 600)
  }

  const handleWheel = (e: WheelEvent) => {
    // Prevent default scrolling
    e.preventDefault()

    if (isScrolling) return

    // Accumulate wheel delta
    accumulatedWheelDelta += e.deltaY

    // Clear existing timeout
    if (wheelTimeout) {
      clearTimeout(wheelTimeout)
    }

    // If accumulated delta exceeds threshold, change section
    if (Math.abs(accumulatedWheelDelta) >= WHEEL_THRESHOLD) {
      const currentIndex = getCurrentSectionIndex()
      const snapSections = getSnapSections()

      let targetIndex = currentIndex
      if (accumulatedWheelDelta > 0 && currentIndex < snapSections.length - 1) {
        // Scrolling down - go to next section
        targetIndex = currentIndex + 1
      } else if (accumulatedWheelDelta < 0 && currentIndex > 0) {
        // Scrolling up - go to previous section
        targetIndex = currentIndex - 1
      }

      accumulatedWheelDelta = 0
      snapToSection(targetIndex)
    } else {
      // Reset accumulated delta after a short delay if no more wheel events
      wheelTimeout = window.setTimeout(() => {
        accumulatedWheelDelta = 0
      }, 150)
    }
  }

  const handleScroll = () => {
    // Disable snap behavior on mobile
    if (isMobile()) return

    if (isScrolling) return

    // If user somehow scrolled (e.g., via keyboard), snap to nearest section
    const currentIndex = getCurrentSectionIndex()
    const snapSections = getSnapSections()

    if (snapSections.length === 0) return

    // Check if we're not aligned with the current section
    const currentSection = snapSections[currentIndex]
    if (currentSection) {
      const rect = currentSection.getBoundingClientRect()
      // If not aligned (more than 10px off), snap to it
      if (Math.abs(rect.top) > 10) {
        snapToSection(currentIndex)
      }
    }
  }

  onMounted(async () => {
    // Only enable snap scrolling behavior on desktop
    if (isMobile()) return

    // Wait for DOM to be fully rendered
    await nextTick()

    // Use double requestAnimationFrame to ensure layout is complete
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // First, ensure we're at the top
        window.scrollTo({ top: 0, behavior: 'auto' })

        // Trigger a minimal scroll to activate snap behavior
        // Scroll snap only activates during scrolling, not on initial load
        // So we simulate a tiny scroll to trigger the snap
        setTimeout(() => {
          // Scroll down 1px (imperceptible) to trigger snap detection
          window.scrollBy({ top: 1, behavior: 'auto' })
          // Immediately snap back to top
          requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          })
        }, 50)
      })
    })

    // Add wheel listener to control scrolling
    window.addEventListener('wheel', handleWheel, { passive: false })
    // Add scroll listener to catch any other scroll events and snap
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    if (!isMobile()) {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      document.documentElement.classList.remove('snap-scroll')
      // Restore scroll restoration
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto'
      }
    }
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    if (wheelTimeout) {
      clearTimeout(wheelTimeout)
    }
  })
}
