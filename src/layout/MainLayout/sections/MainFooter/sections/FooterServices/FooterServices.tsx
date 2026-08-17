import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { NAV_SERVICES } from "@/layout/MainLayout/navItems";

export function FooterServices({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");

  return (
    <nav aria-labelledby="footer-services-title" className={className}>
      <h2
        id="footer-services-title"
        className="font-mono text-micro tracking-widest text-sand/45 uppercase"
      >
        {tFooter("servicesTitle")}
      </h2>

      <ul className="mt-5 flex flex-col gap-y-3">
        {NAV_SERVICES.children.map(({ href, key }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-label text-sand/75 transition-colors duration-300 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
