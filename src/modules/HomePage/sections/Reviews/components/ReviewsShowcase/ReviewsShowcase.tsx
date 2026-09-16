"use client";

import { useState, type ReactNode } from "react";

import type { Review } from "@/payload-types";

import { ReviewFeature } from "../ReviewFeature";
import { ReviewList } from "../ReviewList";

interface Props {
  reviews: Review[];
  footer: ReactNode;
}

export function ReviewsShowcase({ reviews, footer }: Props) {
  const [activeId, setActiveId] = useState(reviews[0].id);
  const active = reviews.find((review) => review.id === activeId) ?? reviews[0];

  if (reviews.length === 1) {
    return (
      <div className="flex flex-col gap-y-section-title">
        <ReviewFeature review={active} />
        {footer}
      </div>
    );
  }

  return (
    <div className="grid gap-stack lg:grid-cols-[1.35fr_1fr]">
      <ReviewFeature review={active} />

      <div className="flex min-w-0 flex-col gap-y-stack">
        <ReviewList
          reviews={reviews}
          activeId={active.id}
          onSelect={setActiveId}
        />
        <div className="lg:mt-auto">{footer}</div>
      </div>
    </div>
  );
}
