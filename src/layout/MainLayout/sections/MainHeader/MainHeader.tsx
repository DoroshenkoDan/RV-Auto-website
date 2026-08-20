"use client";

import { useEffect, useRef, useState } from "react";

import { ContactCta } from "@/components/ContactCta";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

import { LocaleSwitcher } from "./sections/LocaleSwitcher";
import { MainNav } from "./sections/MainNav";
import { MobileMenu } from "./sections/MobileMenu";

export function MainHeader() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries.at(-1);
      if (entry) setAtTop(entry.isIntersecting);
    });

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  const layer =
    "absolute inset-0 -z-10 transition-opacity duration-300 ease-out motion-reduce:transition-none";

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="absolute top-0 h-24 w-px" />

      <header
        data-at-top={atTop || undefined}
        className="group/header fixed top-0 z-50 w-full"
      >
        <div
          aria-hidden
          className={cn(
            layer,
            "bg-night/90 backdrop-blur-md page-hero:group-data-at-top/header:opacity-0",
          )}
        />

        <div
          aria-hidden
          className={cn(
            layer,
            "bg-linear-to-b from-night/70 to-transparent opacity-0 page-hero:group-data-at-top/header:opacity-100",
          )}
        />

        <div className="page-shell flex items-center justify-between py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-x-6 xl:gap-x-8">
          <Logo className="justify-self-start" />

          <MainNav className="hidden justify-self-center lg:block" />

          <div className="flex items-center gap-x-4 justify-self-end xl:gap-x-6">
            <LocaleSwitcher />
            <ContactCta className="hidden lg:inline-flex" />
            <MobileMenu className="lg:hidden" />
          </div>
        </div>
      </header>

      <div aria-hidden className="h-(--header-h) shrink-0 page-hero:hidden" />
    </>
  );
}
