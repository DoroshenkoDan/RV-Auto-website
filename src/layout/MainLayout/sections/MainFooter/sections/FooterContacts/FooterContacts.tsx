import { useTranslations } from "next-intl";

import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contacts";

export function FooterContacts({ className }: { className?: string }) {
  const t = useTranslations("footer");

  return (
    <section aria-labelledby="footer-contacts-title" className={className}>
      <h2
        id="footer-contacts-title"
        className="font-mono text-micro tracking-widest text-sand/45 uppercase"
      >
        {t("contactsTitle")}
      </h2>

      <a
        href={PHONE_HREF}
        className="mt-5 inline-block font-mono text-body whitespace-nowrap text-sand transition-colors duration-300 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        {PHONE_DISPLAY}
      </a>

      <p className="mt-3 text-label text-sand/75">{t("address")}</p>

      <p className="mt-3 font-mono text-label text-sand/60">{t("workHours")}</p>
    </section>
  );
}
