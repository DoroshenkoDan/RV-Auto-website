import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";

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

      <div className="relative page-shell flex h-full flex-col justify-center py-section lg:px-12 xl:px-20">
        <div className="grid gap-y-stack transition-transform duration-700 ease-out group-data-[active=false]:translate-y-2 motion-reduce:transition-none lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-16">
          <div className="flex max-w-152 flex-col items-start gap-y-stack">
            <Title className="font-logo text-hero font-bold text-sand">
              {slide.titleLead}
              <br />
              <span className="text-brand underline decoration-[0.05em] underline-offset-[0.14em]">
                {slide.titleAccent}
              </span>
            </Title>

            <p className="max-w-[24.375rem] text-lead text-sand/75">
              {slide.description}
            </p>

            <Link
              href={slide.href}
              className={buttonVariants({
                size: "lg",
                className: "focus-visible:outline-offset-4",
              })}
            >
              {slide.cta}
            </Link>

            <p className="font-mono text-caption tracking-[0.08em] text-brand/70 uppercase">
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
