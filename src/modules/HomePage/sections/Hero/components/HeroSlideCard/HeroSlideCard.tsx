import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import type { HeroSlide } from "../../types";

export function HeroSlideCard({
  slide,
  isActive,
  priority,
}: {
  slide: HeroSlide;
  isActive: boolean;
  priority?: boolean;
}) {
  const Title = isActive ? "h1" : "p";

  return (
    <article
      data-active={isActive}
      aria-hidden={!isActive}
      inert={!isActive}
      className="group absolute inset-0 transition-opacity duration-700 ease-out data-[active=false]:opacity-0"
    >
      <div
        className={cn(
          "absolute inset-0",
          isActive && "animate-hero-zoom motion-reduce:animate-none",
        )}
      >
        <Image
          src={slide.image}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-night/95 via-night/65 to-night/35" />
      <div className="absolute inset-0 bg-linear-to-r from-night/85 via-night/35 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-tr from-brand/15 via-brand/5 to-transparent" />

      <div className="relative page-shell flex h-full flex-col justify-center py-24 lg:px-12 lg:py-28 xl:px-20">
        <div className="grid gap-y-6 transition-transform duration-700 ease-out group-data-[active=false]:translate-y-2 motion-reduce:transition-none lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-16 lg:gap-y-8">
          <div className="flex max-w-152 flex-col items-start gap-y-5 lg:gap-y-6">
            <Title className="font-logo text-[clamp(1.75rem,2.7vw+2.7vh,4rem)] leading-[1.05] font-bold tracking-[-0.02em] text-sand">
              {slide.titleLead}
              <br />
              <span className="text-brand underline decoration-[0.05em] underline-offset-[0.14em]">
                {slide.titleAccent}
              </span>
            </Title>

            <p className="max-w-[24.375rem] text-[15px] leading-[1.58] text-sand/75 xl:text-[17px]">
              {slide.description}
            </p>

            <Link
              href={slide.href}
              className="inline-flex items-center justify-center rounded-[0.25rem] bg-brand px-8 py-4 text-[15px] leading-normal font-semibold text-night transition-colors duration-300 hover:bg-neon focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand xl:px-10 xl:py-4.5 xl:text-base"
            >
              {slide.cta}
            </Link>

            <p className="font-mono text-xs leading-[1.5] tracking-[0.08em] text-brand/70 uppercase">
              {slide.meta}
            </p>
          </div>

          <div className="relative hidden aspect-3/2 w-[clamp(24rem,20vw+10vh,34rem)] justify-self-end lg:block">
            <div
              aria-hidden
              className="absolute -inset-10 bg-[radial-gradient(closest-side,--alpha(var(--color-night)/75%),transparent)]"
            />

            <Image
              src="/images/shared/logo.webp"
              alt=""
              fill
              sizes="(min-width: 1280px) 416px, 320px"
              className="object-contain mix-blend-screen"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
