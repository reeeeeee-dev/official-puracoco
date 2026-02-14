import { onMounted, onUnmounted, onBeforeMount, nextTick } from 'vue'

export function useSnapScroll() {
  let isScrolling = false
  const scrollTimeout: number | null = null
  let wheelTimeout: number | null = null
  let accumulatedWheelDelta = 0
  const WHEEL_THRESHOLD = 50 // Minimum wheel delta to trigger section change
  const SCROLL_DURATION_MS = 1200 // Duration of snap scroll animation

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

  // Ease-in-out for smooth deceleration at start and end
  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

  const snapToSection = (index: number) => {
    if (isScrolling) return

    const snapSections = getSnapSections()
    if (index < 0 || index >= snapSections.length) return

    const targetSection = snapSections[index]
    // Check if element is still in the DOM before manipulating
    if (!targetSection || !document.body.contains(targetSection)) return

    isScrolling = true
    const startTop = window.scrollY
    const targetTop = targetSection.offsetTop
    const distance = targetTop - startTop
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1)
      const eased = easeInOutCubic(progress)
      window.scrollTo(0, startTop + distance * eased)

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        isScrolling = false
      }
    }

    requestAnimationFrame(tick)
  }

  const handleWheel = (e: WheelEvent) => {
    // Prevent default scrolling
    e.preventDefault()

    if (isScrolling) return

    const snapSections = getSnapSections()
    // If no sections available, don't process wheel events
    if (snapSections.length === 0) return

    // Accumulate wheel delta
    accumulatedWheelDelta += e.deltaY

    // Clear existing timeout
    if (wheelTimeout) {
      clearTimeout(wheelTimeout)
    }

    // If accumulated delta exceeds threshold, change section
    if (Math.abs(accumulatedWheelDelta) >= WHEEL_THRESHOLD) {
      const currentIndex = getCurrentSectionIndex()

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
    const snapSections = getSnapSections()
    if (snapSections.length === 0) return

    const currentIndex = getCurrentSectionIndex()

    // Check if we're not aligned with the current section
    const currentSection = snapSections[currentIndex]
    // Verify element is still in the DOM before accessing its properties
    if (currentSection && document.body.contains(currentSection)) {
      const rect = currentSection.getBoundingClientRect()
      // If not aligned (more than 10px off), snap to it
      if (Math.abs(rect.top) > 10) {
        snapToSection(currentIndex)
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    // Only handle arrow keys
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return

    // Prevent default scrolling behavior
    e.preventDefault()

    if (isScrolling) return

    const snapSections = getSnapSections()
    if (snapSections.length === 0) return

    const currentIndex = getCurrentSectionIndex()

    let targetIndex = currentIndex
    if (e.key === 'ArrowDown' && currentIndex < snapSections.length - 1) {
      // Arrow down - go to next section
      targetIndex = currentIndex + 1
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      // Arrow up - go to previous section
      targetIndex = currentIndex - 1
    }

    // Only scroll if target index changed
    if (targetIndex !== currentIndex) {
      snapToSection(targetIndex)
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
    // Add keyboard listener for arrow keys
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    if (!isMobile()) {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
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
