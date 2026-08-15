"use client";

import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/Logo";
import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { HeaderActions } from "./sections/HeaderActions";
import { LocaleSwitcher } from "./sections/LocaleSwitcher";
import { MainNav } from "./sections/MainNav";
import { MobileMenu } from "./sections/MobileMenu";

export function MainHeader() {
  const pathname = usePathname();
  const hasHero = pathname === "/";

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) =>
      setAtTop(entry.isIntersecting),
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  const transparent = hasHero && atTop;

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="absolute top-0 h-24 w-px" />

      <header className="fixed top-0 z-50 w-full">
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 bg-night/90 transition-opacity duration-300 ease-out motion-reduce:transition-none",
            transparent ? "opacity-0" : "backdrop-blur-md",
          )}
        />

        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 bg-linear-to-b from-night/70 to-transparent transition-opacity duration-300 ease-out motion-reduce:transition-none",
            !transparent && "opacity-0",
          )}
        />

        <div className="page-shell flex items-center justify-between py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-x-8">
          <Logo className="justify-self-start" />

          <MainNav className="hidden justify-self-center lg:block" />

          <div className="flex items-center gap-x-6 justify-self-end">
            <LocaleSwitcher />
            <HeaderActions className="hidden lg:flex" />
            <MobileMenu className="lg:hidden" />
          </div>
        </div>
      </header>
    </>
  );
}
