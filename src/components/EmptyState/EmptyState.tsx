import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  eyebrow,
  title,
  description,
  action,
  className = "",
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-3xl border-2 border-dashed border-line bg-surface px-6 py-block text-center",
        className,
      )}
    >
      <p className="font-mono text-label font-bold tracking-[0.18em] text-brand uppercase">
        [{eyebrow}]
      </p>

      <div className="relative isolate mt-stack w-[clamp(9rem,24vw,15rem)] animate-lamp motion-reduce:animate-none">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 m-auto aspect-square rounded-full bg-brand/15 blur-2xl"
        />

        <span
          aria-hidden
          className="block aspect-3/2 w-full bg-brand [mask-image:url(/images/shared/sectionError.webp)] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]"
        />
      </div>

      <h2 className="mt-stack max-w-2xl font-logo text-h2 font-bold text-balance text-ink">
        {title}
      </h2>

      <p className="mt-stack max-w-lg text-lead text-pretty text-ink-muted">
        {description}
      </p>

      {action ? (
        <div className="mt-block flex flex-col items-center gap-4 sm:flex-row">
          {action}
        </div>
      ) : null}
    </div>
  );
}
