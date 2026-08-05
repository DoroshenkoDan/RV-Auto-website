import { useCallback, useEffect, useState } from "react"

import { HERO_SLIDE_DURATION } from "./slides"

export function useHeroSlideshow(count: number) {
  const [active, setActive] = useState(0)
  const [cycle, setCycle] = useState(0)

  const goTo = useCallback((index: number) => {
    setActive(index)
    setCycle((current) => current + 1)
  }, [])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const timeout = window.setTimeout(() => {
      setActive((current) => (current + 1) % count)
      setCycle((current) => current + 1)
    }, HERO_SLIDE_DURATION)

    return () => window.clearTimeout(timeout)
  }, [active, cycle, count])

  return { active, cycle, goTo }
}
