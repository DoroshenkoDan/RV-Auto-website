import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";

import { PRIVACY_EMAIL } from "./privacyConfig";

const LINK_CLASS =
  "font-semibold text-ink transition-colors duration-200 hover:text-brand";

export const privacyRichTags = {
  email: PRIVACY_EMAIL,
  p: (chunks: ReactNode) => <p className="mt-3 first:mt-0">{chunks}</p>,
  ul: (chunks: ReactNode) => (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-brand">
      {chunks}
    </ul>
  ),
  li: (chunks: ReactNode) => <li>{chunks}</li>,
  b: (chunks: ReactNode) => (
    <strong className="font-semibold text-ink">{chunks}</strong>
  ),
  code: (chunks: ReactNode) => (
    <code className="rounded bg-line/60 px-1.5 py-0.5 font-mono text-[0.9em] text-ink">
      {chunks}
    </code>
  ),
  contacts: (chunks: ReactNode) => (
    <Link href="/contacts" className={LINK_CLASS}>
      {chunks}
    </Link>
  ),
  mail: (chunks: ReactNode) => (
    <a href={`mailto:${PRIVACY_EMAIL}`} className={LINK_CLASS}>
      {chunks}
    </a>
  ),
};
