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

    const viewportCenterY = window.innerHeight / 2

    // Find the section that contains the viewport center (so we correctly identify the last section when it's taller than the viewport)
    for (let i = 0; i < snapSections.length; i++) {
      const section = snapSections[i]
      if (!section) continue
      const rect = section.getBoundingClientRect()
      if (rect.top <= viewportCenterY && rect.bottom >= viewportCenterY) {
        return i
      }
    }

    // Fallback: section whose top is closest to top of viewport
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

    const targetSection = snapSections[index]
    if (!targetSection || !document.body.contains(targetSection)) return

    isScrolling = true
    // Last section: align to end so the footer isn't cut off when it's taller than the viewport
    const isLastSection = index === snapSections.length - 1
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: isLastSection ? 'end' : 'start',
    })

    setTimeout(() => {
      isScrolling = false
    }, 600)
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
    if (isMobile()) return
    if (isScrolling) return

    // Skip snap correction during init so we don't snap to wrong section when navigating to home
    if (Date.now() < initScrollGuardUntil) return

    const snapSections = getSnapSections()
    if (snapSections.length === 0) return

    const currentIndex = getCurrentSectionIndex()
    const currentSection = snapSections[currentIndex]
    if (!currentSection || !document.body.contains(currentSection)) return

    const rect = currentSection.getBoundingClientRect()
    const isLastSection = currentIndex === snapSections.length - 1
    const viewportCenterY = window.innerHeight / 2
    // Last section: aligned if viewport center is inside it (don't force bottom-aligned or we block scrolling up)
    // Other sections: aligned when top is at viewport top
    const isAligned = isLastSection
      ? rect.top <= viewportCenterY && rect.bottom >= viewportCenterY
      : Math.abs(rect.top) <= 10
    if (!isAligned) {
      snapToSection(currentIndex)
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

  let initScrollGuardUntil = 0
  let postTransitionScrollTimeout: ReturnType<typeof setTimeout> | null = null

  onMounted(async () => {
    if (isMobile()) return

    // Guard long enough that we don't snap to wrong section after delayed scroll (page transition is 500ms)
    initScrollGuardUntil = Date.now() + 900

    await nextTick()
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' })
      })
    })

    // When navigating from another page, the old page leaves the DOM after the transition;
    // scroll to top again once the DOM is stable so we don't end up on the tour section
    postTransitionScrollTimeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
      postTransitionScrollTimeout = null
    }, 700)

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
    if (postTransitionScrollTimeout) {
      clearTimeout(postTransitionScrollTimeout)
      postTransitionScrollTimeout = null
    }
  })
}
