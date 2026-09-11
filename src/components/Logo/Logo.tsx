"use client";

import type { MouseEvent } from "react";
import Image from "next/image";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!isHome) return;

    event.preventDefault();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:gap-3",
        className,
      )}
    >
      <span className="relative block aspect-2172/724 h-13 shrink-0 sm:h-14 lg:h-19">
        <Image
          src="/images/shared/RVLogoBrand.webp"
          alt="Revolution Auto"
          fill
          sizes="(min-width: 1024px) 228px, (min-width: 640px) 168px, 156px"
          priority
          className="object-contain"
        />
      </span>
    </Link>
  );
}
