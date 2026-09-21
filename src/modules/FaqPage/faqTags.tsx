import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";

import { FAQ_LINKS, type FaqLinkTag } from "./faqConfig";

const LINK_CLASS =
  "font-semibold text-ink transition-colors duration-200 hover:text-brand";

export const faqRichTags = {
  b: (chunks: ReactNode) => <strong className="text-ink">{chunks}</strong>,
  ...(Object.fromEntries(
    Object.entries(FAQ_LINKS).map(([tag, href]) => [
      tag,
      (chunks: ReactNode) =>
        href.startsWith("#") ? (
          <a href={href} className={LINK_CLASS}>
            {chunks}
          </a>
        ) : (
          <Link href={href} className={LINK_CLASS}>
            {chunks}
          </Link>
        ),
    ]),
  ) as Record<FaqLinkTag, (chunks: ReactNode) => ReactNode>),
};

export const faqPlainTags = Object.fromEntries(
  ["b", ...Object.keys(FAQ_LINKS)].map((tag) => [
    tag,
    (chunks: string) => chunks,
  ]),
) as Record<"b" | FaqLinkTag, (chunks: string) => string>;
