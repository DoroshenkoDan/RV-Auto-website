import { useCallback, useEffect, useState } from "react";

import type { CarouselApi } from "@/ui/carousel";

export function useHeroSlideshow(api: CarouselApi) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActive(api.selectedScrollSnap());
      setPrevious(api.previousScrollSnap());
    };
    const onTimerSet = () => {
      setPlaying(true);
      setCycle((current) => current + 1);
    };
    const onTimerStopped = () => setPlaying(false);

    onSelect();
    if (api.plugins().autoplay?.isPlaying()) onTimerSet();

    api.on("select", onSelect);
    api.on("autoplay:timerset", onTimerSet);
    api.on("autoplay:timerstopped", onTimerStopped);

    return () => {
      api.off("select", onSelect);
      api.off("autoplay:timerset", onTimerSet);
      api.off("autoplay:timerstopped", onTimerStopped);
    };
  }, [api]);

  const goTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
      api?.plugins().autoplay?.reset();
    },
    [api],
  );

  return { active, previous, cycle, playing, goTo };
}
