"use client"

import type { MouseEvent } from "react"
import Image from "next/image"

import { Link, usePathname } from "@/i18n/navigation"

export function Logo({ className }: { className?: string }) {
  const pathname = usePathname()
  const isHome = pathname === "/"

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!isHome) return

    event.preventDefault()

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={`inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:gap-3 ${className ?? ""}`}
    >
      <span className="relative block size-10 shrink-0 overflow-hidden rounded-full  sm:size-12 lg:size-14">
        <Image
          src="/images/shared/logo.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 56px, (min-width: 640px) 48px, 40px"
          priority
          className="object-cover"
        />
      </span>

      <span className="hidden md:inline-flex flex-col font-logo text-brand [text-shadow:0_0_10px_currentColor]">
        <span className="text-base font-bold uppercase leading-none sm:text-lg lg:text-xl">
          Revolution
        </span>

        <span className="mt-1.5 flex items-center">
          <span className="h-px flex-1 bg-current shadow-[0_0_6px_currentColor]" />
          <span className="me-[-0.55em] text-[8px] font-bold uppercase leading-none tracking-[0.45em] px-1 sm:text-[9px] lg:text-[10px]">
            Auto
          </span>
          <span className="h-px flex-1 bg-current shadow-[0_0_6px_currentColor]" />
        </span>
      </span>
    </Link>
  )
}
